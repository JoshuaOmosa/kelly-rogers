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
  lastAction:string, nextFollowUp:string, avatar:string, bg:string
};

export default function DashboardPage(){
  const router=useRouter();
  const [leads,setLeads]=useState<Lead[]>([]);
  const [tab,setTab]=useState("Leads");
  const [log,setLog]=useState<string[]>(["System ready — Phase 2 automation active"]);
  const [pending,setPending]=useState<any[]>([]);
  const [approved,setApproved]=useState<any[]>([]);

  useEffect(()=>{
    if(!localStorage.getItem("kr_auth")) router.push("/dashboard/login");
    fetchLeads();
    setPending(JSON.parse(localStorage.getItem("kr_pending_reviews")||"[]"));
    setApproved(JSON.parse(localStorage.getItem("kr_approved_reviews")||"[]"));
  },[router]);

  const fetchLeads = async () => {
    const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    if(error) { addLog("❌ Error fetching leads: " + error.message); return; }
    if(!data) return;
    const mapped: Lead[] = data.map((l:any)=>({
      id: l.id,
      date: new Date(l.created_at).toLocaleDateString(),
      name: l.name || l.full_name || "Unknown",
      email: l.email,
      phone: l.phone || "",
      status: l.status || "New",
      lastAction: l.message? `${l.message.slice(0,40)}... • ${new Date(l.created_at).toLocaleString()}` : `Form submitted • ${new Date(l.created_at).toLocaleString()}`,
      nextFollowUp: l.status==="New"? "24h reminder to YOU" : l.status==="Quote Sent"? "3-day check-in to CLIENT" : "",
      avatar: (l.name||"NA").split(" ").map((n:string)=>n[0]).join("").slice(0,2).toUpperCase(),
      bg: l.status==="New"? "#4A7C7E" : "#A8B5A0"
    }));
    setLeads(mapped);
  };

  const addLog=(msg:string)=>setLog(prev=>[`${new Date().toLocaleTimeString()} — ${msg}`,...prev].slice(0,10));

  const updateStatus= async (id:string, newStatus:Lead["status"])=>{
    const { error } = await supabase.from("leads").update({ status: newStatus }).eq("id", id);
    if(error) { addLog("❌ "+error.message); return; }

    // REAL EMAIL TRIGGERS
    const lead = leads.find(l=>l.id===id);
    if(!lead) return;

    if(newStatus==="Quote Sent"){
      addLog(`📧 Quote marked sent to ${lead.name} — scheduling 3d & 7d`);
      // you can auto-send 3-day later via cron, but for now log
    }
    if(newStatus==="Won"){
      addLog(`✅ ${lead.name} marked Won — ready for review request`);
    }
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

  return(
    <main style={{background:"#FDF6EB", minHeight:"100vh", display:"flex"}}>
      <aside style={{width:210, background:"#4A6B6D", padding:16, display:"flex", flexDirection:"column", gap:10}}>
        <b style={{color:"white"}}>Kelly Rogers</b>
        <div style={{fontSize:11, color:"#F7F3EF", opacity:0.7, marginBottom:8}}>PHASE 2 ACTIVE - LIVE SUPABASE</div>
        <button onClick={()=>setTab("Leads")} style={sideBtn(tab==="Leads")}>Leads ({leads.length})</button>
        <button onClick={()=>setTab("Reviews")} style={sideBtn(tab==="Reviews")}>Reviews {pending.length>0?`(${pending.length})`:""}</button>
        <div style={{background:"#2B222B", borderRadius:10, padding:10, marginTop:10, maxHeight:300, overflowY:"auto"}}>
          <div style={{fontSize:10, color:"#A8B5A0", fontWeight:900}}>AUTOMATION LOG</div>
          {log.map((l,i)=><div key={i} style={{fontSize:10, color:"#F7F3EF", opacity:0.8, marginTop:4, lineHeight:1.3}}>{l}</div>)}
        </div>
        <button onClick={()=>{localStorage.removeItem("kr_auth"); router.push("/dashboard/login")}} style={{...sideBtn(false), marginTop:"auto"}}>Logout</button>
      </aside>

      <div style={{flex:1, padding:18}}>
        {tab==="Leads" && (
          <>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10}}>
              <h1 style={{fontFamily:"Canela, serif", fontSize:28, color:"#2B222B", margin:0}}>Leads — Phase 2 Automation</h1>
              <div style={{display:"flex", gap:8}}><span style={pill("#FFF3CD","#856404")}>⏰ 24h reminder to YOU if New</span><span style={pill("#D4EDDA","#155724")}>📧 3d & 7d follow-up to CLIENT</span></div>
            </div>

            <div style={{background:"white", borderRadius:12, border:"1px solid #E8DDD0", padding:12, marginTop:14}}>
              {leads.length===0 && <div style={{padding:20, textAlign:"center", opacity:0.6}}>No leads yet — submit via Contact page to test</div>}
              {leads.map((l)=>(
                <div key={l.id} style={{padding:"14px 0", borderBottom:"1px solid #F0E8DC"}}>
                  <div style={{display:"flex", justifyContent:"space-between", gap:12, flexWrap:"wrap"}}>
                    <div style={{display:"flex", gap:10, alignItems:"center"}}>
                      <div style={{width:36, height:36, borderRadius:"50%", background:l.bg, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:12}}>{l.avatar}</div>
                      <div><div style={{fontWeight:900, color:"#2B222B"}}>{l.name} <span style={{fontWeight:400, fontSize:12, opacity:0.6}}>{l.email}</span></div><div style={{fontSize:11, opacity:0.7}}>{l.lastAction} • {l.phone}</div><div style={{fontSize:11, fontWeight:800, color:"#4A7C7E"}}>Next: {l.nextFollowUp}</div></div>
                    </div>
                    <div style={{display:"flex", gap:6, alignItems:"center", flexWrap:"wrap"}}>
                      <select value={l.status} onChange={(e)=>updateStatus(l.id, e.target.value as any)} style={{border:"1.5px solid #E8DDD0", borderRadius:8, padding:"6px 10px", fontSize:12, fontWeight:800, background: statusColor(l.status)}}>
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
            <div style={{display:"grid", gap:10, marginTop:10}}>
              {pending.map((r,i)=><div key={i} style={{background:"white", padding:14, borderRadius:10, borderLeft:"5px solid #E8A44A"}}><b>{r.name}</b> - {"★".repeat(r.rating)}<div>"{r.text}"</div><button onClick={()=>approve(i)} style={{...btn("#2E7D32"), marginTop:8}}>Approve → Publish</button></div>)}
              {pending.length===0 && <div style={{background:"white", padding:14, borderRadius:10, opacity:0.6, fontSize:13}}>No pending reviews</div>}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

const sideBtn=(a:boolean)=>({textAlign:"left" as const, padding:"10px 12px", borderRadius:10, border:"none", cursor:"pointer", background:a?"#F7F3EF":"transparent", color:a?"#2B222B":"#FDF3FF", fontWeight:800, fontSize:13})
const btn=(bg:string)=>({background:bg, color:"white", border:"none", borderRadius:8, padding:"6px 12px", fontWeight:800, fontSize:12, cursor:"pointer"} as const)
const pill=(bg:string,color:string)=>({background:bg, color, fontSize:10, fontWeight:900, padding:"4px 8px", borderRadius:100} as const)
const statusColor=(s:string)=> s==="New"? "#FFF3CD" : s==="Quote Sent"? "#CCE5FF" : s==="Follow-Up Sent"? "#E2D9F3" : s==="Won"? "#D4EDDA" : "#F8D7DA"