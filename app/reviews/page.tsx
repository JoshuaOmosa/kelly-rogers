"use client";
import { useState, useEffect } from "react";

const defaultReviews = [
  { name:"Sarah M.", avatar:"SM", bg:"#4A7C7E", rating:5, date:"Oct 2, 2024", text:"Kelly helped me navigate my divorce with clarity and compassion. I finally feel like myself again.", tag:"Divorce Coaching", verified:true },
  { name:"James C.", avatar:"JC", bg:"#A8B5A0", rating:5, date:"Sep 28, 2024", text:"Professional, warm, and incredibly insightful. Booking was easy and I felt heard from the first session.", tag:"Life Transition", verified:true },
  { name:"Emma R.", avatar:"ER", bg:"#C9A6A0", rating:5, date:"Sep 15, 2024", text:"The best decision I made this year. Kelly's approach is practical, not just talk.", tag:"Coaching vs Therapy", verified:true },
  { name:"Olivia T.", avatar:"OT", bg:"#2B222B", rating:5, date:"Aug 30, 2024", text:"I was hesitant about coaching, but Kelly made it feel empowering.", tag:"Divorce Coaching", verified:true },
];

const filters = ["All Reviews", "Divorce Coaching", "Life Transition", "Coaching"];

export default function ReviewsPage(){
  const [active,setActive]=useState("All Reviews");
  const [allReviews,setAllReviews]=useState(defaultReviews);

  useEffect(()=>{
    const stored = JSON.parse(localStorage.getItem("kr_approved_reviews")||"[]");
    // stored reviews come first (newest)
    if(stored.length>0){
      const formatted = stored.map((r:any)=>({
        name: r.name.split(" ")[0]+" "+(r.name.split(" ")[1]?.[0]||"")+".",
        avatar: r.avatar,
        bg: r.bg,
        rating: r.rating,
        date: r.date,
        text: r.text,
        tag: r.tag,
        verified: true
      }));
      setAllReviews([...formatted,...defaultReviews]);
    }
  },[]);

  const filtered = active==="All Reviews"? allReviews : allReviews.filter(r=>r.tag===active);

  return(
    <main style={{ background:"#F7F3EF", minHeight:"100vh" }}>
      <div style={{ background:"#4A7C7E", padding:"50px 20px 30px", textAlign:"center" }}>
        <div style={{ display:"inline-block", background:"#F7F3EF", color:"#4A7C7E", borderRadius:100, padding:"6px 14px", fontSize:11, fontWeight:900, letterSpacing:"0.08em", marginBottom:14 }}>★★★★★ 4.9 / 5.0 • {allReviews.length} CLIENTS</div>
        <h1 style={{ fontFamily:"Canela, Georgia, serif", fontSize:42, color:"white", margin:"0 0 10px", lineHeight:1.1 }}>Real stories.<br/>Real healing.</h1>
        <p style={{ color:"#F7F3EF", opacity:0.9, fontSize:15, maxWidth:520, margin:"0 auto" }}>Verified reviews — Published only with permission.</p>
        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", marginTop:18 }}>
          {filters.map(f=>(
            <button key={f} onClick={()=>setActive(f)} style={{
              border:"1.5px solid #F7F3EF", borderRadius:100, padding:"8px 16px", fontSize:12, fontWeight:800, cursor:"pointer",
              background: active===f? "#F7F3EF" : "transparent", color: active===f? "#4A7C7E" : "#F7F3EF"
            }}>{f}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"22px 16px 40px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }} className="grid">
          {filtered.map((r,i)=>(
            <div key={i} style={{ background:"white", borderRadius:16, padding:18, border:"1px solid #E8DDD0", borderLeft:`6px solid ${r.bg}`, boxShadow:"0 6px 20px rgba(0,0,0,0.06)" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:r.bg, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:12 }}>{r.avatar}</div>
                  <div><div style={{ fontWeight:900, fontSize:14, color:"#2B222B" }}>{r.name}</div><div style={{ fontSize:11, opacity:0.6 }}>{r.date} • {r.tag}</div></div>
                </div>
                {r.verified && <span style={{ background:"#E8F5E8", color:"#2E7D32", fontSize:10, fontWeight:900, padding:"4px 8px", borderRadius:100 }}>✓ VERIFIED</span>}
              </div>
              <div style={{ color:"#FFB400", fontSize:16, marginBottom:10 }}>{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div>
              <p style={{ fontSize:15, lineHeight:1.5, color:"#2B222B", margin:"0 0 14px", fontWeight:500 }}>"{r.text}"</p>
              <div style={{ display:"flex", gap:8 }}>
                <button style={actionBtn}>👍 Helpful</button>
                <button style={actionBtn}>↗ Share</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background:"white", borderRadius:16, padding:22, textAlign:"center", marginTop:22, border:"1px solid #E8DDD0" }}>
          <h3 style={{ fontFamily:"Canela, serif", fontSize:22, margin:"0 0 6px", color:"#2B222B" }}>Worked with Kelly?</h3>
          <p style={{ fontSize:13, opacity:0.7, margin:"0 0 14px" }}>Your story helps others. Reviews published only after approval.</p>
          <a href="/reviews/submit" style={{ background:"#4A7C7E", color:"white", textDecoration:"none", borderRadius:100, padding:"12px 22px", fontWeight:900, fontSize:14, display:"inline-block" }}>Leave a Review →</a>
        </div>
      </div>
      <style>{`@media(max-width:900px){.grid{ grid-template-columns:repeat(2,1fr)!important; } } @media(max-width:600px){.grid{ grid-template-columns:1fr!important; } }`}</style>
    </main>
  )
}
const actionBtn={ border:"1px solid #E8DDD0", background:"#F7F3EF", borderRadius:100, padding:"6px 12px", fontSize:11, fontWeight:800, cursor:"pointer" } as const