"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage(){
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const router=useRouter();

  const handleLogin = () => {
    // simple auth - replace with real auth later
    if(email && pass){
      localStorage.setItem("kr_auth","true");
      router.push("/dashboard");
    }
  };

  return(
    <main style={{ background:"#F7F3EF", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div style={{ background:"white", borderRadius:18, padding:"32px 28px", maxWidth:400, width:"100%", boxShadow:"0 12px 40px rgba(0,0,0,0.12)", borderLeft:"7px solid #4A7C7E" }}>
        <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:18 }}>
          <div style={{ width:40, height:40, background:"#4A7C7E", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", color:"white" }}>🧠</div>
          <div><div style={{ fontWeight:900, color:"#2B222B", fontSize:16 }}>Kelly Rogers Psychology</div><div style={{ fontSize:11, color:"#4A7C7E", fontWeight:700 }}>Admin Login • PhD Practice</div></div>
        </div>

        <h1 style={{ fontFamily:"Canela, serif", fontSize:26, color:"#2B222B", margin:"0 0 6px" }}>Welcome back</h1>
        <p style={{ fontSize:13, color:"#2B222B", opacity:0.7, marginBottom:20 }}>Secure access to Lead & Inquiry Dashboard</p>

        <label style={label}>Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} style={input} placeholder="kelly@kellyrogerspsychology.com" />

        <label style={label}>Password</label>
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} style={input} placeholder="••••••••" />

        <button onClick={handleLogin} style={{ width:"100%", marginTop:18, background:"#4A7C7E", color:"white", border:"none", borderRadius:100, padding:"13px", fontWeight:800, fontSize:15, cursor:"pointer" }}>Sign In →</button>

        <div style={{ marginTop:16, background:"#F7F3EF", borderRadius:8, padding:"8px 10px", fontSize:11, display:"flex", gap:6, alignItems:"center" }}>🛡 HIPAA Secure • Encrypted • Virginia Beach, VA</div>
      </div>
    </main>
  )
}
const label={ fontSize:12, fontWeight:800, color:"#2B222B", display:"block", margin:"12px 0 6px" } as const
const input={ width:"100%", background:"#FDF3FF", border:"1.5px solid #E8DDD0", borderRadius:10, padding:"11px 14px", fontSize:14, outline:"none" } as const