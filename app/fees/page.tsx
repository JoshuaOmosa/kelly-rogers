export default function FeesPage(){
 return(
 <main style={{background:"#F7F3EF", padding:"48px 20px 0"}}>
  <div style={{maxWidth:1140, margin:"0 auto"}}>
   <h1 style={{fontFamily:"Canela, Georgia, serif", fontSize:"clamp(48px,7vw,72px)", color:"#4A7C7E", margin:0, lineHeight:1}}>Fees & Hours</h1>
   <p style={{fontFamily:"Inter", fontSize:18, color:"#2B222B", fontWeight:600, marginTop:12}}>Transparent pricing and clear details for your wellness journey.</p>

   <div className="grid">
    <div>
     <div style={card}><span style={badge}>Initial Consultation • Free • 15 min</span><div style={price}>$220</div><div style={check}>✓ Brief intro call to discuss needs</div><div style={check}>✓ Determine if we're a good fit</div><div style={check}>✓ Next steps & recommendations</div></div>
     <div style={card}><span style={badge}>Individual Session • $220 • 50 min</span><div style={price}>$220</div><div style={check}>✓ Evidence-based therapeutic support</div><div style={check}>✓ Goal setting & progress review</div></div>
     <div style={card}><span style={badge}>Divorce Coaching • $220 • 60 min</span><div style={price}>$220</div><div style={check}>✓ Focused coaching for transition</div></div>
    </div>
    <div>
     <div style={card}><h2 style={h2}>Office Hours</h2><div style={check}>✓ Monday — Friday: 9:00am — 5:00pm</div><div style={check}>✓ Saturday: 10:00am — 2:00pm</div><div style={check}>✓ Sunday: Closed</div></div>
     <div style={card}><h2 style={h2}>Booking & Policies</h2><div style={check}>✓ 48-hour cancellation policy</div><div style={check}>✓ Secure online booking & payment</div><div style={check}>✓ Insurance reimbursement available</div><div style={{marginTop:16, background:"#DDE7DC", padding:"14px 18px", borderRadius:12, fontFamily:"Inter", fontSize:16, fontWeight:600, color:"#2B222B"}}>Questions? hello@kellyrogers.com</div></div>
    </div>
   </div>
  </div>

  <div style={{background:"#4A7C7E", marginTop:50, padding:"30px 20px"}}>
   <div style={{maxWidth:1140, margin:"0 auto", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:16, alignItems:"center"}}>
    <div style={{color:"white", fontFamily:"Inter", fontSize:20, fontWeight:700}}>Have questions about fees? Book a free consult</div>
    <a href="/contact" style={{background:"white", color:"#2B222B", padding:"14px 26px", borderRadius:100, fontWeight:800, textDecoration:"none", fontSize:16}}>Book a Free Consult →</a>
   </div>
  </div>

  <style>{`
   .grid{display:grid; grid-template-columns:1.2fr 0.8fr; gap:24px; margin-top:32px;}
   @media(max-width:900px){.grid{grid-template-columns:1fr}}
  `}</style>
 </main>
 )
}

const card={background:"white", borderRadius:18, padding:"28px 26px", marginBottom:18, borderLeft:"7px solid #4A7C7E", boxShadow:"0 10px 30px rgba(0,0,0,0.08)"} as const
const badge={background:"#A8B5A0", color:"#1a1a1a", fontSize:13, fontWeight:800, padding:"7px 14px", borderRadius:100, display:"inline-block", marginBottom:14, letterSpacing:"0.02em"} as const
const price={fontFamily:"Inter", fontWeight:900, fontSize:32, color:"#111", marginBottom:12} as const
const h2={fontFamily:"Canela, Georgia, serif", fontSize:28, color:"#111", margin:"0 0 14px"} as const
const check={fontFamily:"Inter", fontSize:16, fontWeight:500, lineHeight:1.9, color:"#2B222B"} as const