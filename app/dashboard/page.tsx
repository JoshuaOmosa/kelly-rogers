"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const leadsDataInit = [
  { date: "Oct 5, 2024", name: "Sarah Mitchell", email: "s.mitchell@email.com", phone: "(555) 234-1189", source: "Website", tag: "Follow-Up Sent", status: "Voicemail left • 4h ago", next: "Oct 8, 2024 • in 2 days", avatar: "SM", bg: "#4A7C7E" },
  { date: "Oct 5, 2024", name: "James Chen", email: "j.chen@email.com", phone: "(555) 802-4491", source: "Website Form", tag: "Form submitted", status: "Form submitted • 6h ago", next: "Oct 7, 2024 • today", avatar: "JC", bg: "#A8B5A0" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [tab,setTab]=useState("Leads");
  const [pending,setPending]=useState<any[]>([]);
  const [approved,setApproved]=useState<any[]>([]);

  useEffect(()=>{
    if(!localStorage.getItem("kr_auth")) router.push("/dashboard/login");
    setPending(JSON.parse(localStorage.getItem("kr_pending_reviews")||"[]"));
    setApproved(JSON.parse(localStorage.getItem("kr_approved_reviews")||"[]"));
  },[router]);

  const approve=(i:number)=>{
    const item = pending[i];
    const newPending = pending.filter((_,idx)=>idx!==i);
    const newApproved = [...approved, {...item, verified:true}];
    setPending(newPending); setApproved(newApproved);
    localStorage.setItem("kr_pending_reviews", JSON.stringify(newPending));
    localStorage.setItem("kr_approved_reviews", JSON.stringify(newApproved));
    localStorage.setItem("kr_public_reviews", JSON.stringify(newApproved)); // reviews page reads this
  };

  const requestReview=(lead:any)=>{
    const link = `${window.location.origin}/reviews/submit`;
    alert(`Review request link copied for ${lead.name}:\n${link}\n\n(In production this emails automatically)`);
    navigator.clipboard.writeText(link);
  };

  return(
    <main style={{background:"#FDF6EB", minHeight:"100vh", display:"flex"}}>
      <aside style={{width:210, background:"#4A6B6D", padding:16, display:"flex", flexDirection:"column", gap:10}}>
        <b style={{color:"white"}}>Kelly Rogers</b>
        <button onClick={()=>setTab("Leads")} style={sideBtn(tab==="Leads")}>Leads</button>
        <button onClick={()=>setTab("Reviews")} style={sideBtn(tab==="Reviews")}>Reviews {pending.length>0?`(${pending.length})`:""}</button>
        <button onClick={()=>{localStorage.removeItem("kr_auth"); router.push("/dashboard/login")}} style={{...sideBtn(false), marginTop:"auto"}}>Logout</button>
      </aside>

      <div style={{flex:1, padding:18}}>
        {tab==="Leads" && (
          <>
            <h1 style={{fontFamily:"Canela, serif", fontSize:28, color:"#2B222B"}}>Leads ({leadsDataInit.length})</h1>
            <div style={{background:"white", borderRadius:12, border:"1px solid #E8DDD0", padding:12}}>
              {leadsDataInit.map((l,i)=>(
                <div key={i} style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid #F0E8DC", flexWrap:"wrap", gap:8}}>
                  <div style={{display:"flex", gap:8, alignItems:"center"}}><div style={{width:28, height:28, borderRadius:"50%", background:l.bg, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11}}>{l.avatar}</div><b>{l.name}</b> <span style={{fontSize:11, opacity:0.6}}>{l.email}</span></div>
                  <button onClick={()=>requestReview(l)} style={{background:"#4A7C7E", color:"white", border:"none", borderRadius:8, padding:"6px 12px", fontWeight:800, fontSize:12, cursor:"pointer"}}>☆ Request Review</button>
                </div>
              ))}
            </div>
          </>
        )}

        {tab==="Reviews" && (
          <>
            <h1 style={{fontFamily:"Canela, serif", fontSize:28, color:"#2B222B"}}>Review Requests</h1>
            <p style={{fontSize:13, opacity:0.7}}>Pending = submitted from /reviews/submit. Approve to publish live to /reviews</p>

            <h3 style={{marginTop:18}}>⏳ Pending ({pending.length})</h3>
            <div style={{display:"grid", gap:10}}>
              {pending.length===0 && <div style={{background:"white", padding:14, borderRadius:10, fontSize:13, opacity:0.6}}>No pending reviews. Share /reviews/submit link with clients.</div>}
              {pending.map((r,i)=>(
                <div key={i} style={{background:"white", borderRadius:12, padding:14, border:"1px solid #E8DDD0", borderLeft:"5px solid #E8A44A"}}>
                  <b>{r.name}</b> - {"★".repeat(r.rating)} - {r.tag} <div style={{fontSize:13, margin:"8px 0"}}>"{r.text}"</div>
                  <div style={{display:"flex", gap:8}}><button onClick={()=>approve(i)} style={{background:"#2E7D32", color:"white", border:"none", borderRadius:8, padding:"6px 12px", fontWeight:800, cursor:"pointer"}}>Approve → Publish</button><button onClick={()=>{ const np=pending.filter((_,idx)=>idx!==i); setPending(np); localStorage.setItem("kr_pending_reviews", JSON.stringify(np))}} style={{background:"#FFD0D0", border:"none", borderRadius:8, padding:"6px 12px", fontWeight:800, cursor:"pointer"}}>Reject</button></div>
                </div>
              ))}
            </div>

            <h3 style={{marginTop:22}}>✅ Approved & Live ({approved.length})</h3>
            <div style={{display:"grid", gap:10}}>
              {approved.map((r,i)=>(
                <div key={i} style={{background:"white", borderRadius:12, padding:14, border:"1px solid #E8DDD0", borderLeft:"5px solid #4A7C7E"}}>
                  <b>{r.name}</b> - {"★".repeat(r.rating)} <div style={{fontSize:12, opacity:0.6}}>Live on /reviews</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}
const sideBtn=(active:boolean)=>({ textAlign:"left" as const, padding:"10px 12px", borderRadius:10, border:"none", cursor:"pointer", background: active?"#F7F3EF":"transparent", color: active?"#2B222B":"#FDF3FF", fontWeight:800, fontSize:13 })