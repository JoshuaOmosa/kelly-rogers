"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// EXACT FEES - SERVER TRUTH
const PRICE_MAP: Record<string, number> = {
  "Initial Consultation": 150,
  "Divorce Coaching": 200,
  "Counselling & Stress Management": 200,
  "Clinical Support & Wellbeing": 200,
  "Ph.D Private Psychotherapy Assessment": 300,
  
};

function getPriceForLead(lead: any): number {
  const service = (lead.service || lead.rawService || "").trim();
  if (PRICE_MAP[service]) return PRICE_MAP[service];
  // try to detect from message
  const msg = (lead.rawMessage || "").toLowerCase();
  if (msg.includes("divorce")) return 200;
  if (msg.includes("ph.d") || msg.includes("assessment")) return 300;
  if (msg.includes("initial") || msg.includes("consultation")) return 150;
  if (msg.includes("counselling") || msg.includes("stress") || msg.includes("clinical")) return 200;
  return 150; // default
}

type Lead = {
  id:string, date:string, name:string, email:string, phone:string,
  status:"New"|"Quote Sent"|"Complete"|"Lost",
  lastAction:string, nextFollowUp:string, avatar:string, bg:string,
  rawMessage:string, created_at:string, service?:string,
  quote_amount?: string, payment_link?: string, payment_status?: string
};

export default function DashboardPage(){
  const router=useRouter();
  const [leads,setLeads]=useState<Lead[]>([]);
  const [log,setLog]=useState<string[]>(["System ready — Exact fees: $150/$200/$300"]);
  const [search,setSearch]=useState("");
  const [statusFilter,setStatusFilter]=useState("All");

  // Quote modal - NEW WITH INSURANCE
  const [showQuote, setShowQuote] = useState<Lead|null>(null);
  const [qAmount, setQAmount] = useState("");
  const [qNote, setQNote] = useState("");
  const [qUseInsurance, setQUseInsurance] = useState(false);
  const [qProvider, setQProvider] = useState("");
  const [qMemberId, setQMemberId] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(()=>{
    if(!localStorage.getItem("kr_auth")) router.push("/dashboard/login");
    fetchLeads();
  },[router]);

  const fetchLeads = async () => {
    const res = await fetch("/api/leads")
    const data = await res.json()
    if(!data ||!Array.isArray(data)) return;
    const mapped: Lead[] = data.map((l:any)=>({
      id: l.id,
      created_at: l.created_at,
      date: new Date(l.created_at).toLocaleDateString(),
      name: l.name || "Unknown",
      email: l.email,
      phone: l.phone || "",
      status: l.status || "New",
      service: l.service || "Initial Consultation - 60min",
      rawMessage: l.message || "",
      quote_amount: l.quote_amount,
      payment_link: l.payment_link,
      payment_status: l.payment_status,
      lastAction: `${l.service? `Service: ${l.service} • ` : ''}${l.message?.slice(0,80)}...`,
      nextFollowUp: l.status==="New"? `Send $${getPriceForLead(l)} fee` : l.status==="Quote Sent"? "Waiting payment" : "Closed",
      avatar: (l.name||"NA").split(" ").map((n:string)=>n[0]).join("").slice(0,2).toUpperCase(),
      bg: l.status==="New"? "#4A7C7E" : l.status==="Complete"? "#2E7D32" : "#A33A3A"
    }));
    setLeads(mapped);
  };

  const addLog=(msg:string)=>setLog(prev=>[`${new Date().toLocaleTimeString()} — ${msg}`,...prev].slice(0,10));

  const openQuote = (lead:Lead) => {
    const exact = getPriceForLead(lead as any);
    setShowQuote(lead);
    setQAmount(String(exact));
    setQProvider("");
    setQMemberId("");
    setQUseInsurance(false);
    setQNote(`Hi ${lead.name}!\n\nYour selected service: ${lead.service}\nExact fee: $${exact}\n\nHere's your payment link to secure your slot. After payment you'll get a private link to pick time.\n\n- Kelly Rogers`);
  }

  const sendQuote = async () => {
    if(!showQuote) return;
    setSending(true);
    addLog(`💰 Sending exact fee $${qAmount} to ${showQuote.name}...`);

    // Build note with insurance if needed
    let finalNote = qNote;
    if(qUseInsurance){
      finalNote += `\n\nInsurance Option B: You pay $${qAmount} upfront. We will issue a Superbill for ${qProvider} (Member: ${qMemberId}) for reimbursement.`;
    }

    const res = await fetch("/api/quote/send", {
      method: "POST", headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        leadId: showQuote.id,
        amount: qAmount,
        note: finalNote,
        service: showQuote.service,
        exact_price: qAmount,
        use_insurance: qUseInsurance,
        insurance_provider: qProvider,
        member_id: qMemberId
      })
    });
    const data = await res.json();
    if(data.ok){
      addLog(`✅ Fee $${qAmount} Sent ${qUseInsurance? `+ Superbill ${qProvider}` : ''}`);
      setShowQuote(null);
      fetchLeads();
    } else {
      addLog(`❌ Failed, using fallback`);
      await supabase.from("leads").update({
        status:"Quote Sent",
        quote_amount: qAmount,
        exact_price: parseInt(qAmount),
        use_insurance: qUseInsurance,
        insurance_provider: qProvider,
        payment_link: `${window.location.origin}/pay/${showQuote.id}`,
        payment_status:"unpaid"
      }).eq("id", showQuote.id);
      setShowQuote(null);
      fetchLeads();
    }
    setSending(false);
  }

  const filtered = leads.filter(l => {
    const q = search.toLowerCase();
    return (search==="" || l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q)) && (statusFilter==="All" || l.status===statusFilter);
  });

  return(
    <main style={{background:"#F7F3EF", minHeight:"100vh", display:"flex", fontFamily:"Inter, sans-serif"}}>
      <aside style={{width:260, background:"#3E5A5C", padding:"22px 16px", display:"flex", flexDirection:"column", gap:12, position:"sticky", top:0, height:"100vh"}}>
        <div style={{color:"white", fontFamily:"Canela, serif", fontSize:22, fontWeight:800}}>Kelly Rogers</div>
        <div style={{fontSize:11, color:"#D9E4D0", fontWeight:800}}>EXACT FEES: 150/200/300</div>
        <div style={{background:"#2B3E40", borderRadius:12, padding:12, marginTop:10, maxHeight:320, overflowY:"auto"}}>
          <div style={{fontSize:11, color:"#D9E4D0", fontWeight:900, marginBottom:8}}>LOG</div>
          {log.map((l,i)=><div key={i} style={{fontSize:12, color:"#F7F3EF", marginTop:6}}>{l}</div>)}
        </div>
        <button onClick={()=>{localStorage.removeItem("kr_auth"); router.push("/dashboard/login")}} style={{...sideBtn(false), marginTop:"auto"}}>Logout</button>
      </aside>

      <div style={{flex:1, padding:"28px 24px"}}>
        <h1 style={{fontFamily:"Canela, serif", fontSize:30, margin:0}}>Leads — Exact Fee System</h1>
        <div style={{background:"white", borderRadius:12, border:"1.5px solid #E8DDD0", padding:12, marginTop:18, display:"flex", gap:10}}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search..." style={{flex:1, background:"#F7F3EF", border:"1px solid #E8DDD0", borderRadius:10, padding:"12px 14px"}}/>
          <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} style={{border:"1.5px solid #E8DDD0", borderRadius:10, padding:"12px 14px", fontWeight:700}}>
            <option value="All">All Status</option><option>New</option><option>Quote Sent</option><option>Complete</option><option>Lost</option>
          </select>
        </div>

        <div style={{background:"white", borderRadius:16, border:"1.5px solid #E8DDD0", marginTop:12, overflow:"hidden"}}>
          {filtered.map((l)=>(
            <div key={l.id} style={{padding:"18px 20px", borderBottom:"1px solid #F0E8DC", display:"flex", justifyContent:"space-between", gap:16}}>
              <div style={{display:"flex", gap:14, flex:1}}>
                <div style={{width:44, height:44, borderRadius:"50%", background:l.bg, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900}}>{l.avatar}</div>
                <div>
                  <div style={{fontWeight:800}}>{l.name} <span style={{fontWeight:500, fontSize:13, color:"#555"}}>{l.email}</span> <span style={{background:"#E9EFE6", padding:"2px 8px", borderRadius:100, fontSize:11, marginLeft:8}}>{l.service} → ${getPriceForLead(l as any)}</span></div>
                  <div style={{fontSize:13, color:"#333", marginTop:4, background:"#F9F6F1", borderRadius:8, padding:"6px 10px", maxWidth:600}}>{l.lastAction}</div>
                </div>
              </div>
              <div style={{display:"flex", gap:8, alignItems:"center"}}>
                <span style={{border:"1.5px solid #E8DDD0", borderRadius:10, padding:"10px 14px", fontSize:13, fontWeight:800}}>{l.status}</span>
                {l.status==="New" && <button onClick={()=>openQuote(l)} style={btn("#111")}>💰 Send ${getPriceForLead(l as any)}</button>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showQuote && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50, padding:20}}>
          <div style={{background:"white", borderRadius:16, padding:24, width:"100%", maxWidth:500, maxHeight:"90vh", overflowY:"auto"}}>
            <h3 style={{margin:0, fontSize:20, fontWeight:900}}>Send Exact Fee to {showQuote.name}</h3>
            <p style={{fontSize:13, color:"#4A7C7E", fontWeight:700, marginTop:4}}>Service: {showQuote.service} → Suggested: ${getPriceForLead(showQuote as any)}</p>

            <label style={{display:"block", marginTop:16, fontSize:13, fontWeight:800}}>Exact Amount (USD) - NO RANGE</label>
            <input value={qAmount} onChange={e=>setQAmount(e.target.value)} type="number" style={{width:"100%", marginTop:6, border:"2px solid #4A7C7E", borderRadius:10, padding:"12px", fontSize:18, fontWeight:800}}/>

            {/* INSURANCE OPTION B - IN DASHBOARD */}
            <div style={{marginTop:14, padding:12, border:"1.5px dashed #4A7C7E", borderRadius:10}}>
              <label style={{display:"flex", gap:8, alignItems:"center", fontWeight:800, fontSize:13, cursor:"pointer"}}>
                <input type="checkbox" checked={qUseInsurance} onChange={e=>setQUseInsurance(e.target.checked)} style={{width:18, height:18, accentColor:"#4A7C7E"}}/>
                Client wants Insurance? (Option B - Superbill)
              </label>
              {qUseInsurance && (
                <div style={{marginTop:10, display:"flex", flexDirection:"column", gap:8}}>
                  <select value={qProvider} onChange={e=>setQProvider(e.target.value)} style={{border:"1px solid #E8DDD0", borderRadius:8, padding:"10px"}}>
                    <option value="">Select Provider</option><option>Aetna</option><option>Cigna</option><option>BlueCross BlueShield</option><option>United Healthcare</option><option>Other</option>
                  </select>
                  <input value={qMemberId} onChange={e=>setQMemberId(e.target.value)} placeholder="Member ID / Policy #" style={{border:"1px solid #E8DDD0", borderRadius:8, padding:"10px"}}/>
                  <div style={{fontSize:11, color:"#4A7C7E", fontWeight:700, background:"#E9EFE6", padding:8, borderRadius:6}}>
                    Client pays ${qAmount} upfront → You issue Superbill for {qProvider || "insurer"} → They claim reimbursement.
                  </div>
                </div>
              )}
            </div>

            <label style={{display:"block", marginTop:12, fontSize:13, fontWeight:800}}>Email to client</label>
            <textarea value={qNote} onChange={e=>setQNote(e.target.value)} rows={6} style={{width:"100%", marginTop:6, border:"1.5px solid #E8DDD0", borderRadius:10, padding:"12px", fontSize:13}}/>

            <div style={{display:"flex", gap:10, marginTop:16}}>
              <button onClick={()=>setShowQuote(null)} style={{flex:1, background:"#F7F3EF", border:"1.5px solid #E8DDD0", borderRadius:10, padding:"12px", fontWeight:800, cursor:"pointer"}}>Cancel</button>
              <button disabled={sending} onClick={sendQuote} style={{flex:2, background:"#4A7C7E", color:"white", border:"none", borderRadius:10, padding:"12px", fontWeight:800, cursor:"pointer", opacity: sending?0.6:1}}>
                {sending? "Sending..." : qUseInsurance? `Send $${qAmount} + Superbill` : `Send Fee $${qAmount}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
const sideBtn=(a:boolean)=>({textAlign:"left" as const, padding:"12px 14px", borderRadius:10, border:"none", cursor:"pointer", background:a?"#F7F3EF":"rgba(255,255,255,0.08)", color:a?"#2B222B":"#F7F3EF", fontWeight:800, fontSize:14} as const)
const btn=(bg:string)=>({background:bg, color:"white", border:"none", borderRadius:10, padding:"10px 16px", fontWeight:800, fontSize:13, cursor:"pointer"} as const)