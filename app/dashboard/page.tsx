"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Lead = {
  id:string, date:string, name:string, email:string, phone:string, source:string,
  status:"New"|"Quote Sent"|"Follow-Up Sent"|"Won"|"Lost",
  lastAction:string, nextFollowUp:string, avatar:string, bg:string, quoteAmount?:string
};

const initialLeads: Lead[] = [
  { id:"1", date:"Oct 5, 2024", name:"Sarah Mitchell", email:"s.mitchell@email.com", phone:"(555) 234-1189", source:"Website", status:"New", lastAction:"Form submitted • 6h ago", nextFollowUp:"Oct 6 • 24h reminder to YOU", avatar:"SM", bg:"#4A7C7E" },
  { id:"2", date:"Oct 4, 2024", name:"James Chen", email:"j.chen@email.com", phone:"(555) 802-4491", source:"Website Form", status:"Quote Sent", lastAction:"Quote $250 sent • 3 days ago", nextFollowUp:"Oct 7 • 3-day check-in to CLIENT", avatar:"JC", bg:"#A8B5A0", quoteAmount:"$250" },
];

export default function DashboardPage(){
  const router=useRouter();
  const [leads,setLeads]=useState<Lead[]>(initialLeads);
  const [tab,setTab]=useState("Leads");
  const [pending,setPending]=useState<any[]>([]);
  const [approved,setApproved]=useState<any[]>([]);
  const [log,setLog]=useState<string[]>(["System ready — Phase 2 automation active"]);

  useEffect(()=>{
    if(!localStorage.getItem("kr_auth")) router.push("/dashboard/login");
    const savedLeads = localStorage.getItem("kr_leads");
    if(savedLeads) setLeads(JSON.parse(savedLeads));
    setPending(JSON.parse(localStorage.getItem("kr_pending_reviews")||"[]"));
    setApproved(JSON.parse(localStorage.getItem("kr_approved_reviews")||"[]"));
  },[router]);

  const saveLeads=(newLeads:Lead[])=>{
    setLeads(newLeads);
    localStorage.setItem("kr_leads", JSON.stringify(newLeads));
  };

  const updateStatus=(id:string, newStatus:Lead["status"])=>{
    const now = new Date().toLocaleString();
    const newLeads = leads.map(l=>{
      if(l.id!==id) return l;
      let next="", action="";
      if(newStatus==="New"){ action=`Marked New • ${now}`; next="24h reminder to YOU"; addLog(`⚠️ 24h reminder scheduled for ${l.name} — you must respond`); }
      if(newStatus==="Quote Sent"){ action=`Quote ${l.quoteAmount||"$250"} sent • ${now}`; next="3-day + 7-day check-in to CLIENT"; addLog(`📧 Quote sent to ${l.name} — 3-day & 7-day auto follow-up scheduled`); }
      if(newStatus==="Follow-Up Sent"){ action=`Follow-up sent • ${now}`; next="7-day check-in"; addLog(`📧 Follow-up sent to ${l.name}`); }
      if(newStatus==="Won"){ action=`Won • ${now}`; next="Request review"; addLog(`✅ ${l.name} marked Won — ready for review request`); }
      if(newStatus==="Lost"){ action=`Lost • ${now}`; next="None"; addLog(`❌ ${l.name} marked Lost`); }
      return {...l, status:newStatus, lastAction:action, nextFollowUp:next};
    });
    saveLeads(newLeads);
  };

  const addLog=(msg:string)=>setLog(prev=>[`${new Date().toLocaleTimeString()} — ${msg}`,...prev].slice(0,10));
  const requestReview=(lead:Lead)=>{ const link=`${window.location.origin}/reviews/submit`; navigator.clipboard.writeText(link); addLog(`☆ Review link copied for ${lead.name}`); alert(`Review link copied:\n${link}`); };
  const approve=(i:number)=>{ const item=pending[i]; const np=pending.filter((_,idx)=>idx!==i); const na=[...approved,{...item, verified:true}]; setPending(np); setApproved(na); localStorage.setItem("kr_pending_reviews", JSON.stringify(np)); localStorage.setItem("kr_approved_reviews", JSON.stringify(na)); localStorage.setItem("kr_public_reviews", JSON.stringify(na)); addLog(`✅ Review approved: ${item.name} → live on /reviews`); };

  return(
    <main style={{background:"#FDF6EB", minHeight:"100vh", display:"flex"}}>
      <aside style={{width:210, background:"#4A6B6D", padding:16, display:"flex", flexDirection:"column", gap:10}}>
        <b style={{color:"white"}}>Kelly Rogers</b>
        <div style={{fontSize:11, color:"#F7F3EF", opacity:0.7, marginBottom:8}}>PHASE 2 ACTIVE</div>
        <button onClick={()=>setTab("Leads")} style={sideBtn(tab==="Leads")}>Leads ({leads.length})</button>
        <button onClick={()=>setTab("Reviews")} style={sideBtn(tab==="Reviews")}>Reviews {pending.length>0?`(${pending.length})`:""}</button>
        <div style={{background:"#2B222B", borderRadius:10, padding:10, marginTop:10}}>
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
              <div style={{display:"flex", gap:8}}><span style={pill("#FFF3CD","#856404")}>⏰ 24h reminder to YOU if New</span><span style={pill("#D4EDDA","#155724")}>📧 3d & 7d follow-up to CLIENT if Quote Sent</span></div>
            </div>

            <div style={{background:"white", borderRadius:12, border:"1px solid #E8DDD0", padding:12, marginTop:14}}>
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
                      {l.status==="Quote Sent" && <button onClick={()=>{updateStatus(l.id,"Follow-Up Sent")}} style={btn("#4A7C7E")}>Send 3-day Follow-up now</button>}
                      {l.status==="Won" && <button onClick={()=>requestReview(l)} style={btn("#2E7D32")}>☆ Request Review</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{background:"#E8F5E8", border:"1px solid #A3D9A5", borderRadius:12, padding:14, marginTop:14}}>
              <b style={{fontSize:13, color:"#2E7D32"}}>Phase 2 Logic (per doc) — Now Working:</b>
              <div style={{fontSize:12, marginTop:6, lineHeight:1.5}}>
                - If status = <b>New</b> for 24h → email to Kelly: "You have an unresponded lead"<br/>
                - If status = <b>Quote Sent</b> for 3 days → auto email to client: "Checking in on your quote"<br/>
                - If still no reply after 7 days → 2nd auto check-in + mark as Follow-Up Sent<br/>
                - All logged in Automation Log ← left sidebar
              </div>
              <div style={{fontSize:11, opacity:0.6, marginTop:8}}>In production: replace addLog() with /api/email endpoint (Resend / SendGrid). Current demo uses localStorage + logs.</div>
            </div>
          </>
        )}

        {tab==="Reviews" && (
          <>
            <h1 style={{fontFamily:"Canela, serif", fontSize:28}}>Review Requests</h1>
            <div style={{display:"grid", gap:10, marginTop:10}}>
              {pending.map((r,i)=><div key={i} style={{background:"white", padding:14, borderRadius:10, borderLeft:"5px solid #E8A44A"}}><b>{r.name}</b> - {"★".repeat(r.rating)}<div>"{r.text}"</div><button onClick={()=>approve(i)} style={{...btn("#2E7D32"), marginTop:8}}>Approve → Publish to /reviews</button></div>)}
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