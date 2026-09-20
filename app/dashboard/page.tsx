"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Lead = {
  id:string, date:string, name:string, email:string, phone:string,
  status:"New"|"Quote Sent"|"Complete"|"Lost",
  lastAction:string, nextFollowUp:string, avatar:string, bg:string, rawMessage:string, created_at:string,
  quote_amount?: string, payment_link?: string, payment_status?: string
};

export default function DashboardPage(){
  const router=useRouter();
  const [leads,setLeads]=useState<Lead[]>([]);
  const [tab,setTab]=useState("Leads");
  const [log,setLog]=useState<string[]>(["System ready — Auto flow: New → Quote Sent → Complete/Lost"]);
  const [pending,setPending]=useState<any[]>([]);
  const [approved,setApproved]=useState<any[]>([]);
  const [search,setSearch]=useState("");
  const [statusFilter,setStatusFilter]=useState("All");
  // Quote modal
  const [showQuote, setShowQuote] = useState<Lead|null>(null);
  const [qAmount, setQAmount] = useState("");
  const [qNote, setQNote] = useState("Hi! Here's your custom quote for your interior project. Pay to confirm your booking.");
  const [sending, setSending] = useState(false);

  useEffect(()=>{
    if(!localStorage.getItem("kr_auth")) router.push("/dashboard/login");
    fetchLeads();
    setPending(JSON.parse(localStorage.getItem("kr_pending_reviews")||"[]"));
    setApproved(JSON.parse(localStorage.getItem("kr_approved_reviews")||"[]"));
  },[router]);

  const fetchLeads = async () => {
    const res = await fetch("/api/leads")
    const data = await res.json()
    if(!data ||!Array.isArray(data)) { addLog("❌ No data"); return; }
    const mapped: Lead[] = data.map((l:any)=>({
      id: l.id,
      created_at: l.created_at,
      date: new Date(l.created_at).toLocaleDateString(),
      name: l.name || l.full_name || "Unknown",
      email: l.email,
      phone: l.phone || "",
      status: l.status || "New",
      rawMessage: l.message || "",
      quote_amount: l.quote_amount,
      payment_link: l.payment_link,
      payment_status: l.payment_status,
      lastAction: l.status==="Quote Sent" && l.quote_amount? `Quote $${l.quote_amount} sent • ${l.payment_status} • ${l.message?.slice(0,60)}...` : l.message? `${l.message.slice(0,80)}... • ${new Date(l.created_at).toLocaleString()}` : `Form submitted • ${new Date(l.created_at).toLocaleString()}`,
      nextFollowUp: l.status==="New"? "Action: Send Quote" : l.status==="Quote Sent"? l.payment_status==="paid"? "Paid → Complete" : "Waiting payment (auto Lost after 7d)" : l.status==="Complete"? "Auto Review 24h later" : "Closed",
      avatar: (l.name||"NA").split(" ").map((n:string)=>n[0]).join("").slice(0,2).toUpperCase(),
      bg: l.status==="New"? "#4A7C7E" : l.status==="Complete"? "#2E7D32" : l.status==="Lost"? "#A33A3A" : "#7A8E8E"
    }));
    setLeads(mapped);
    addLog(`✅ Loaded ${mapped.length} leads`);
  };

  const addLog=(msg:string)=>setLog(prev=>[`${new Date().toLocaleTimeString()} — ${msg}`,...prev].slice(0,10));

  const openQuote = (lead:Lead) => {
    setShowQuote(lead);
    setQAmount(lead.quote_amount || "500");
  }

  const sendQuote = async () => {
    if(!showQuote) return;
    setSending(true);
    addLog(`💰 Sending quote $${qAmount} to ${showQuote.name}...`);
    const res = await fetch("/api/quote/send", {
      method: "POST", headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ leadId: showQuote.id, amount: qAmount, note: qNote })
    });
    const data = await res.json();
    if(data.ok){
      addLog(`✅ Quote Sent + Payment link: ${data.url || data.paymentLink}`);
      setShowQuote(null);
      fetchLeads();
    } else {
      addLog(`❌ Failed: ${data.error || 'unknown'}. Using dummy link mode`);
      // fallback to test-pay if no Stripe keys yet
      await fetch("/api/webhook/test-pay", {method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({leadId: showQuote.id, amount: qAmount})});
      // manual update for now
      await supabase.from("leads").update({ status:"Quote Sent", quote_amount: qAmount, payment_link: `${window.location.origin}/pay/${showQuote.id}`, payment_status:"unpaid", quote_sent_at: new Date().toISOString() }).eq("id", showQuote.id);
      setShowQuote(null);
      fetchLeads();
    }
    setSending(false);
  }

  const deleteLead = async (id:string, name:string) => {
    if(!confirm(`Delete lead "${name}"?`)) return;
    addLog(`🗑️ Deleting ${name}...`);
    const res = await fetch("/api/leads", { method: "DELETE", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ id }) });
    if(res.ok){ addLog(`✅ Deleted ${name}`); setLeads(prev=>prev.filter(l=>l.id!==id)); }
  };

  const requestReview=(lead:Lead)=>{ const link=`${window.location.origin}/reviews/submit?lead=${lead.id}`; navigator.clipboard.writeText(link); addLog(`☆ Link copied for ${lead.name}`); alert(`Review link copied:\n${link}`); };
  const exportCSV = () => {
    const headers = ["Name","Email","Phone","Message","Status","Quote","Payment","Date"];
    const rows = filtered.map(l => [`"${l.name.replace(/"/g,'""')}"`,`"${l.email}"`,`"${l.phone}"`,`"${l.rawMessage.replace(/"/g,'""').replace(/\n/g,' ')}"`,l.status, l.quote_amount||"", l.payment_status||"", new Date(l.created_at).toLocaleString()]);
    const csv = [headers.join(","),...rows.map(r=>r.join(","))].join("\n");
    const blob = new Blob([csv], {type:"text/csv"}); const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `leads-${new Date().toISOString().slice(0,10)}.csv`; a.click();
  };

  const filtered = leads.filter(l => {
    const q = search.toLowerCase();
    return (search==="" || l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q)) && (statusFilter==="All" || l.status===statusFilter);
  });

  return(
    <main style={{background:"#F7F3EF", minHeight:"100vh", display:"flex", fontFamily:"Inter, sans-serif"}}>
      <aside style={{width:260, background:"#3E5A5C", padding:"22px 16px", display:"flex", flexDirection:"column", gap:12, position:"sticky", top:0, height:"100vh"}}>
        <div style={{color:"white", fontFamily:"Canela, serif", fontSize:22, fontWeight:800}}>Kelly Rogers</div>
        <div style={{fontSize:11, color:"#D9E4D0", fontWeight:800}}>AUTO FLOW ACTIVE</div>
        <button onClick={()=>setTab("Leads")} style={sideBtn(tab==="Leads")}>Leads ({leads.length})</button>
        <div style={{background:"#2B3E40", borderRadius:12, padding:12, marginTop:10, maxHeight:320, overflowY:"auto"}}>
          <div style={{fontSize:11, color:"#D9E4D0", fontWeight:900, marginBottom:8}}>AUTOMATION LOG</div>
          {log.map((l,i)=><div key={i} style={{fontSize:12, color:"#F7F3EF", marginTop:6}}>{l}</div>)}
        </div>
        <button onClick={()=>{localStorage.removeItem("kr_auth"); router.push("/dashboard/login")}} style={{...sideBtn(false), marginTop:"auto", border:"1px solid rgba(255,255,255,0.2)"}}>Logout</button>
      </aside>

      <div style={{flex:1, padding:"28px 24px"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12}}>
              <h1 style={{fontFamily:"Canela, Georgia, serif", fontSize:30, color:"#2B222B", margin:0}}>Leads — Auto System</h1>
              <button onClick={exportCSV} style={{background:"#2B222B", color:"white", border:"none", borderRadius:10, padding:"10px 18px", fontWeight:800, fontSize:13, cursor:"pointer"}}>📥 Export CSV</button>
            </div>
            <div style={{display:"flex", gap:8, marginTop:12, flexWrap:"wrap"}}><span style={pill("#D6E8FF","#1E3A5F")}>Flow: New → Quote Sent → Complete / Lost</span><span style={pill("#E0F0E6","#1E5A35")}>Auto Review 24h after Complete</span></div>
            <div style={{background:"white", borderRadius:12, border:"1.5px solid #E8DDD0", padding:12, marginTop:18, display:"flex", gap:10, flexWrap:"wrap"}}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search..." style={{flex:1, minWidth:220, background:"#F7F3EF", border:"1px solid #E8DDD0", borderRadius:10, padding:"12px 14px", fontSize:14, outline:"none"}}/>
              <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} style={{border:"1.5px solid #E8DDD0", borderRadius:10, padding:"12px 14px", fontSize:14, fontWeight:700, background:"white", minWidth:140}}>
                <option value="All">All Status</option><option>New</option><option>Quote Sent</option><option>Complete</option><option>Lost</option>
              </select>
              <div style={{display:"flex", alignItems:"center", fontSize:13, color:"#666", fontWeight:700}}>{filtered.length} of {leads.length}</div>
            </div>

            <div style={{background:"white", borderRadius:16, border:"1.5px solid #E8DDD0", marginTop:12, overflow:"hidden", boxShadow:"0 10px 30px rgba(0,0,0,0.06)"}}>
              {filtered.map((l)=>(
                <div key={l.id} style={{padding:"18px 20px", borderBottom:"1px solid #F0E8DC"}}>
                  <div style={{display:"flex", justifyContent:"space-between", gap:16, alignItems:"flex-start"}}>
                    <div style={{display:"flex", gap:14, alignItems:"flex-start", flex:1}}>
                      <div style={{width:44, height:44, minWidth:44, borderRadius:"50%", background:l.bg, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:14}}>{l.avatar}</div>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:800, color:"#111", fontSize:16}}>{l.name} <span style={{fontWeight:500, fontSize:13, color:"#555", marginLeft:6}}>{l.email}</span></div>
                        <div style={{fontSize:14, color:"#333", marginTop:6, lineHeight:1.5, background:"#F9F6F1", borderRadius:8, padding:"6px 10px", maxWidth:680, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis"}}>{l.lastAction}</div>
                        <div style={{display:"flex", gap:12, marginTop:6, flexWrap:"wrap"}}><span style={{fontSize:12, color:"#666"}}>📞 {l.phone} • {l.date} {l.quote_amount && `• $${l.quote_amount}`}</span><span style={{fontSize:12, fontWeight:800, color:l.status==="New"?"#B77900":"#4A7C7E"}}>Next: {l.nextFollowUp}</span></div>
                        {l.payment_link && <div style={{marginTop:8}}><a href={l.payment_link} target="_blank" style={{fontSize:12, fontWeight:800, color:"#2E7D32", textDecoration:"underline"}}>Payment Link: {l.payment_link.slice(0,50)}... ({l.payment_status})</a></div>}
                      </div>
                    </div>
                    <div style={{display:"flex", gap:8, alignItems:"center", flexWrap:"wrap"}}>
                      <span style={{border:"1.5px solid #E8DDD0", borderRadius:10, padding:"10px 14px", fontSize:13, fontWeight:800, background: statusColor(l.status)}}>{l.status}</span>
                      {l.status==="New" && <button onClick={()=>openQuote(l)} style={btn("#111")}>💰 Send Quote</button>}
                      {l.status==="Quote Sent" && <button onClick={()=>window.open(l.payment_link, '_blank')} style={btn("#4A7C7E")}>View Pay Link</button>}
                      {l.status==="Complete" && <button onClick={()=>requestReview(l)} style={btn("#2E7D32")}>☆ Review</button>}
                      <button onClick={()=>deleteLead(l.id, l.name)} style={{background:"#FFF1F1", color:"#B42318", border:"1px solid #FFD0D0", borderRadius:10, padding:"10px 12px", fontWeight:800, fontSize:13, cursor:"pointer"}}>🗑️</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
      </div>

      {showQuote && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:50, padding:20}}>
          <div style={{background:"white", borderRadius:16, padding:24, width:"100%", maxWidth:480}}>
            <h3 style={{margin:0, fontSize:20, fontWeight:900}}>Send Quote to {showQuote.name}</h3>
            <p style={{fontSize:13, color:"#666", marginTop:4}}>{showQuote.email}</p>
            <label style={{display:"block", marginTop:16, fontSize:13, fontWeight:800}}>Amount (USD)</label>
            <input value={qAmount} onChange={e=>setQAmount(e.target.value)} type="number" placeholder="500" style={{width:"100%", marginTop:6, border:"1.5px solid #E8DDD0", borderRadius:10, padding:"12px", fontSize:16, fontWeight:700}}/>
            <label style={{display:"block", marginTop:12, fontSize:13, fontWeight:800}}>Message to client</label>
            <textarea value={qNote} onChange={e=>setQNote(e.target.value)} rows={4} style={{width:"100%", marginTop:6, border:"1.5px solid #E8DDD0", borderRadius:10, padding:"12px", fontSize:14}}/>
            <div style={{display:"flex", gap:10, marginTop:16}}>
              <button onClick={()=>setShowQuote(null)} style={{flex:1, background:"#F7F3EF", border:"1.5px solid #E8DDD0", borderRadius:10, padding:"12px", fontWeight:800, cursor:"pointer"}}>Cancel</button>
              <button disabled={sending} onClick={sendQuote} style={{flex:2, background:"#111", color:"white", border:"none", borderRadius:10, padding:"12px", fontWeight:800, cursor:"pointer", opacity: sending?0.6:1}}>{sending? "Sending..." : `Send Quote $${qAmount}`}</button>
            </div>
            <div style={{marginTop:10, fontSize:11, color:"#888"}}>Will auto: change to Quote Sent + email client with Pay link + if no pay in 7d → Lost. If pay → Complete → Review 24h later.</div>
          </div>
        </div>
      )}
    </main>
  )
}

const sideBtn=(a:boolean)=>({textAlign:"left" as const, padding:"12px 14px", borderRadius:10, border:"none", cursor:"pointer", background:a?"#F7F3EF":"rgba(255,255,255,0.08)", color:a?"#2B222B":"#F7F3EF", fontWeight:800, fontSize:14} as const)
const btn=(bg:string)=>({background:bg, color:"white", border:"none", borderRadius:10, padding:"10px 16px", fontWeight:800, fontSize:13, cursor:"pointer"} as const)
const pill=(bg:string,color:string)=>({background:bg, color, fontSize:12, fontWeight:800, padding:"6px 12px", borderRadius:100} as const)
const statusColor=(s:string)=> s==="New"? "#FFF3CD" : s==="Quote Sent"? "#D6E8FF" : s==="Complete"? "#D6F0D6" : "#FFD6D6"