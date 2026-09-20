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
  status:"New"|"Quote Sent"|"Follow-Up Sent"|"Won"|"Lost",
  lastAction:string, nextFollowUp:string, avatar:string, bg:string, rawMessage:string
};

export default function DashboardPage(){
  const router=useRouter();
  const [leads,setLeads]=useState<Lead[]>([]);
  const [tab,setTab]=useState("Leads");
  const [log,setLog]=useState<string[]>(["System ready — Phase 2 automation active"]);
  const [pending,setPending]=useState<any[]>([]);
  const [approved,setApproved]=useState<any[]>([]);
  const [search,setSearch]=useState("");
  const [statusFilter,setStatusFilter]=useState("All");

  useEffect(()=>{
    if(!localStorage.getItem("kr_auth")) router.push("/dashboard/login");
    fetchLeads();
    setPending(JSON.parse(localStorage.getItem("kr_pending_reviews")||"[]"));
    setApproved(JSON.parse(localStorage.getItem("kr_approved_reviews")||"[]"));
  },[router]);

    const fetchLeads = async () => {
    const res = await fetch("/api/leads")
    const data = await res.json()
    if(!data ||!Array.isArray(data)) { addLog("❌ No data from /api/leads"); return; }
    const mapped: Lead[] = data.map((l:any)=>({
      id: l.id,
      date: new Date(l.created_at).toLocaleDateString(),
      name: l.name || l.full_name || "Unknown",
      email: l.email,
      phone: l.phone || "",
      status: l.status || "New",
      rawMessage: l.message || "",
      lastAction: l.message? `${l.message.slice(0,80)}... • ${new Date(l.created_at).toLocaleString()}` : `Form submitted • ${new Date(l.created_at).toLocaleString()}`,
      nextFollowUp: l.status==="New"? "24h reminder to YOU" : l.status==="Quote Sent"? "3-day check-in to CLIENT" : "No follow-up needed",
      avatar: (l.name||"NA").split(" ").map((n:string)=>n[0]).join("").slice(0,2).toUpperCase(),
      bg: l.status==="New"? "#4A7C7E" : l.status==="Won"? "#2E7D32" : l.status==="Lost"? "#A33A3A" : "#7A8E8E"
    }));
    setLeads(mapped);
    addLog(`✅ Loaded ${mapped.length} leads from Supabase`);
  };

  const addLog=(msg:string)=>setLog(prev=>[`${new Date().toLocaleTimeString()} — ${msg}`,...prev].slice(0,10));

    const updateStatus= async (id:string, newStatus:Lead["status"])=>{
    const res = await fetch("/api/leads", {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ id, status: newStatus })
    });
    if(!res.ok) { addLog("❌ Failed to update"); return; }
    addLog(`🔄 ${id.slice(0,6)} → ${newStatus}`);
    fetchLeads();
  };

  const sendFollowUpNow = async (lead: Lead) => {
    addLog(`📧 Sending 3-day follow-up to ${lead.email}...`);
    const res = await fetch("/api/email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: lead.email, name: lead.name, type: "3-day" })
    });
    const data = await res.json();
    if(data.success) {
      addLog(`✅ 3-day email sent to ${lead.name}`);
      await supabase.from("leads").update({ status: "Follow-Up Sent" }).eq("id", lead.id);
      fetchLeads();
    } else {
      addLog(`❌ Email failed: ${data.error}`);
    }
  };

  const requestReview=(lead:Lead)=>{ const link=`${window.location.origin}/reviews/submit`; navigator.clipboard.writeText(link); addLog(`☆ Review link copied for ${lead.name}`); alert(`Review link copied:\n${link}`); };
  const approve=(i:number)=>{ const item=pending[i]; const np=pending.filter((_,idx)=>idx!==i); const na=[...approved,{...item, verified:true}]; setPending(np); setApproved(na); localStorage.setItem("kr_pending_reviews", JSON.stringify(np)); localStorage.setItem("kr_approved_reviews", JSON.stringify(na)); localStorage.setItem("kr_public_reviews", JSON.stringify(na)); addLog(`✅ Review approved: ${item.name}`); };

  // FILTERED LEADS
  const filtered = leads.filter(l => {
    const matchesSearch = search === "" ||
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search) ||
      l.rawMessage.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return(
    <main style={{background:"#F7F3EF", minHeight:"100vh", display:"flex", fontFamily:"Inter, sans-serif"}}>
      <aside style={{width:260, background:"#3E5A5C", padding:"22px 16px", display:"flex", flexDirection:"column", gap:12, position:"sticky", top:0, height:"100vh"}}>
        <div style={{color:"white", fontFamily:"Canela, serif", fontSize:22, fontWeight:800}}>Kelly Rogers</div>
        <div style={{fontSize:11, color:"#D9E4D0", fontWeight:800, letterSpacing:1, opacity:0.9}}>PHASE 2 ACTIVE - LIVE SUPABASE</div>
        <button onClick={()=>setTab("Leads")} style={sideBtn(tab==="Leads")}>Leads ({leads.length})</button>
        <button onClick={()=>setTab("Reviews")} style={sideBtn(tab==="Reviews")}>Reviews {pending.length>0?`(${pending.length})`:""}</button>
        <div style={{background:"#2B3E40", borderRadius:12, padding:12, marginTop:10, maxHeight:320, overflowY:"auto"}}>
          <div style={{fontSize:11, color:"#D9E4D0", fontWeight:900, marginBottom:8}}>AUTOMATION LOG</div>
          {log.map((l,i)=><div key={i} style={{fontSize:12, color:"#F7F3EF", marginTop:6, lineHeight:1.4, opacity:i===0?1:0.85}}>{l}</div>)}
        </div>
        <button onClick={()=>{localStorage.removeItem("kr_auth"); router.push("/dashboard/login")}} style={{...sideBtn(false), marginTop:"auto", border:"1px solid rgba(255,255,255,0.2)"}}>Logout</button>
      </aside>

      <div style={{flex:1, padding:"28px 24px"}}>
        {tab==="Leads" && (
          <>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12}}>
              <h1 style={{fontFamily:"Canela, Georgia, serif", fontSize:30, color:"#2B222B", margin:0}}>Leads — Phase 2 Automation</h1>
              <div style={{display:"flex", gap:8}}><span style={pill("#FFF8D6","#6B5900")}>⏰ 24h reminder</span><span style={pill("#E0F0E6","#1E5A35")}>📧 3d & 7d follow-up</span></div>
            </div>

            {/* SEARCH BAR */}
            <div style={{background:"white", borderRadius:12, border:"1.5px solid #E8DDD0", padding:12, marginTop:18, display:"flex", gap:10, flexWrap:"wrap"}}>
              <input
                value={search}
                onChange={e=>setSearch(e.target.value)}
                placeholder="🔍 Search by name, email, phone, message..."
                style={{flex:1, minWidth:220, background:"#F7F3EF", border:"1px solid #E8DDD0", borderRadius:10, padding:"12px 14px", fontSize:14, outline:"none"}}
              />
              <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} style={{border:"1.5px solid #E8DDD0", borderRadius:10, padding:"12px 14px", fontSize:14, fontWeight:700, background:"white", minWidth:140}}>
                <option value="All">All Status</option>
                <option value="New">New</option>
                <option value="Quote Sent">Quote Sent</option>
                <option value="Follow-Up Sent">Follow-Up Sent</option>
                <option value="Won">Won</option>
                <option value="Lost">Lost</option>
              </select>
              <div style={{display:"flex", alignItems:"center", fontSize:13, color:"#666", fontWeight:700, padding:"0 8px"}}>
                Showing {filtered.length} of {leads.length}
              </div>
            </div>

            <div style={{background:"white", borderRadius:16, border:"1.5px solid #E8DDD0", marginTop:12, overflow:"hidden", boxShadow:"0 10px 30px rgba(0,0,0,0.06)"}}>
              {filtered.length===0 && <div style={{padding:40, textAlign:"center", color:"#666", fontSize:15}}>No results for "{search}"</div>}
              {filtered.map((l)=>(
                <div key={l.id} style={{padding:"18px 20px", borderBottom:"1px solid #F0E8DC"}}>
                  <div style={{display:"flex", justifyContent:"space-between", gap:16, alignItems:"flex-start"}}>
                    <div style={{display:"flex", gap:14, alignItems:"flex-start", flex:1, minWidth:0}}>
                      <div style={{width:44, height:44, minWidth:44, borderRadius:"50%", background:l.bg, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:14}}>{l.avatar}</div>
                      <div style={{flex:1, minWidth:0}}>
                        <div style={{fontWeight:800, color:"#111", fontSize:16}}>{l.name} <span style={{fontWeight:500, fontSize:13, color:"#555", marginLeft:6}}>{l.email}</span></div>
                        <div style={{fontSize:14, color:"#333", marginTop:6, lineHeight:1.5, background:"#F9F6F1", borderRadius:8, padding:"6px 10px", maxWidth:680, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>{l.lastAction}</div>
                        <div style={{display:"flex", gap:12, marginTop:6, flexWrap:"wrap"}}>
                          <span style={{fontSize:12, color:"#666"}}>📞 {l.phone || "No phone"} • 📅 {l.date}</span>
                          <span style={{fontSize:12, fontWeight:800, color:l.status==="New"?"#B77900":"#4A7C7E"}}>Next: {l.nextFollowUp}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{display:"flex", gap:8, alignItems:"center", flexWrap:"wrap"}}>
                      <select value={l.status} onChange={(e)=>updateStatus(l.id, e.target.value as any)} style={{border:"1.5px solid #E8DDD0", borderRadius:10, padding:"10px 14px", fontSize:13, fontWeight:800, background: statusColor(l.status), cursor:"pointer", outline:"none", minWidth:140}}>
                        <option>New</option><option>Quote Sent</option><option>Follow-Up Sent</option><option>Won</option><option>Lost</option>
                      </select>
                      {l.status==="Quote Sent" && <button onClick={()=>sendFollowUpNow(l)} style={btn("#4A7C7E")}>Send 3-day Follow-up now</button>}
                      {l.status==="Won" && <button onClick={()=>requestReview(l)} style={btn("#2E7D32")}>☆ Request Review</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        {tab==="Reviews" && (
          <>
            <h1 style={{fontFamily:"Canela, serif", fontSize:28}}>Review Requests</h1>
            <div style={{display:"grid", gap:12, marginTop:14}}>
              {pending.map((r,i)=><div key={i} style={{background:"white", padding:16, borderRadius:12, borderLeft:"5px solid #E8A44A"}}><b style={{fontSize:15}}>{r.name}</b> - {"★".repeat(r.rating)}<div style={{marginTop:6, fontSize:14, color:"#333"}}>"{r.text}"</div><button onClick={()=>approve(i)} style={{...btn("#2E7D32"), marginTop:10}}>Approve → Publish</button></div>)}
              {pending.length===0 && <div style={{background:"white", padding:20, borderRadius:12, color:"#666", fontSize:14}}>No pending reviews</div>}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

const sideBtn=(a:boolean)=>({textAlign:"left" as const, padding:"12px 14px", borderRadius:10, border:"none", cursor:"pointer", background:a?"#F7F3EF":"rgba(255,255,255,0.08)", color:a?"#2B222B":"#F7F3EF", fontWeight:800, fontSize:14} as const)
const btn=(bg:string)=>({background:bg, color:"white", border:"none", borderRadius:10, padding:"10px 16px", fontWeight:800, fontSize:13, cursor:"pointer"} as const)
const pill=(bg:string,color:string)=>({background:bg, color, fontSize:12, fontWeight:800, padding:"6px 12px", borderRadius:100, border:`1px solid ${color}20`} as const)
const statusColor=(s:string)=> s==="New"? "#FFF3CD" : s==="Quote Sent"? "#D6E8FF" : s==="Follow-Up Sent"? "#E8D6FF" : s==="Won"? "#D6F0D6" : "#FFD6D6"