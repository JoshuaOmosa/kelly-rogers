"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmitReview(){
  const router = useRouter();
  const [rating,setRating]=useState(5);
  const [form,setForm]=useState({name:"",email:"",tag:"Divorce Coaching",text:""});

  const submit=()=>{
    if(!form.name ||!form.text) return alert("Please fill name and review");
    const pending = JSON.parse(localStorage.getItem("kr_pending_reviews")||"[]");
    pending.push({...form, rating, date:new Date().toLocaleDateString(), avatar:form.name.slice(0,2).toUpperCase(), bg:"#4A7C7E", verified:false});
    localStorage.setItem("kr_pending_reviews", JSON.stringify(pending));
    alert("Thank you! Your review is pending approval.");
    router.push("/reviews");
  };

  return(
    <main style={{background:"#F7F3EF", minHeight:"100vh", display:"flex", justifyContent:"center", padding:"30px 16px"}}>
      <div style={{background:"white", borderRadius:16, padding:22, maxWidth:480, width:"100%", border:"1px solid #E8DDD0", boxShadow:"0 10px 30px rgba(0,0,0,0.07)"}}>
        <h1 style={{fontFamily:"Canela, serif", fontSize:26, margin:"0 0 6px", color:"#2B222B"}}>Leave a Review</h1>
        <p style={{fontSize:13, opacity:0.7, margin:"0 0 18px"}}>Only your initials will be shown. No sensitive details needed. 🛡 HIPAA-aware</p>

        <div style={{display:"flex", gap:6, marginBottom:14}}>
          {[1,2,3,4,5].map(n=>(
            <button key={n} onClick={()=>setRating(n)} style={{fontSize:28, background:"none", border:"none", cursor:"pointer", color: n<=rating? "#FFB400":"#E8DDD0"}}>★</button>
          ))}
        </div>

        <input placeholder="Full Name (private)" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={inp} />
        <input placeholder="Email (private, not published)" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={inp} />
        <select value={form.tag} onChange={e=>setForm({...form,tag:e.target.value})} style={inp}>
          <option>Divorce Coaching</option><option>Life Transition</option><option>Coaching</option><option>Coaching vs Therapy</option>
        </select>
        <textarea placeholder="Your experience with Kelly..." value={form.text} onChange={e=>setForm({...form,text:e.target.value})} style={{...inp, height:110}} />

        <button onClick={submit} style={{width:"100%", background:"#4A7C7E", color:"white", border:"none", borderRadius:100, padding:"12px", fontWeight:900, fontSize:14, cursor:"pointer", marginTop:8}}>Submit for Approval →</button>
        <div style={{fontSize:11, opacity:0.5, textAlign:"center", marginTop:10}}>Reviews are published only after approval in dashboard</div>
      </div>
    </main>
  )
}
const inp={width:"100%", border:"1.5px solid #E8DDD0", borderRadius:10, padding:"10px 12px", fontSize:13, marginBottom:10, boxSizing:"border-box"} as const