export default function FeesPage(){
 return(
 <main style={{background:"#F7F3EF", padding:"48px 20px 0"}}>
  <div style={{maxWidth:1140, margin:"0 auto"}}>
   <h1 style={{fontFamily:"Canela, Georgia, serif", fontSize:"clamp(48px,7vw,72px)", color:"#4A7C7E", margin:0, lineHeight:1}}>Fees & Hours</h1>
   <p style={{fontFamily:"Inter", fontSize:18, color:"#2B222B", fontWeight:600, marginTop:12}}>Transparent pricing and clear details for your wellness journey.</p>

   <div className="grid">
    <div>
     <div style={card}>
       <span style={badge}>Consultation • $60-$150</span>
       <div style={price}>$60 - $150</div>
       <div style={check}>✓ Initial consultation to discuss needs</div>
       <div style={check}>✓ Determine if we're a good fit</div>
       <div style={check}>✓ Next steps & recommendations</div>
     </div>
     
     <div style={card}>
       <span style={badge}>Initial Session • Without Insurance • 60 min</span>
       <div style={price}>$150 - $250</div>
       <div style={sub}>per hour</div>
       <div style={check}>✓ Evidence-based therapeutic support</div>
       <div style={check}>✓ Goal setting & progress review</div>
       <div style={check}>✓ Personalized treatment plan</div>
     </div>

     <div style={card}>
       <span style={badge}>Insurance • Co-Pay</span>
       <div style={price}>$20 - $50</div>
       <div style={sub}>most insurance plans</div>
       <div style={check}>✓ We accept most insurance plans</div>
       <div style={check}>✓ Co-pay varies by plan</div>
     </div>

     <div style={card}>
       <span style={badge}>Ph.D Private Psychotherapy Assessment • 60 min</span>
       <div style={price}>$300</div>
       <div style={sub}>per hour</div>
       <div style={check}>✓ Comprehensive psychological assessment</div>
       <div style={check}>✓ Private psychotherapy evaluation</div>
     </div>
    </div>

    <div>
     <div style={card}>
       <h2 style={h2}>Office Hours</h2>
       <div style={check}>✓ <b>Mon, Wed:</b> 9am - 5pm</div>
       <div style={check}>✓ <b>Tue, Thu:</b> 9am - 3pm</div>
       <div style={check}>✓ <b>Fri:</b> 9am - 1pm</div>
       <div style={check}>✓ <b>Tue-Thu Evening:</b> 6pm - 7:30pm</div>
     </div>
     
     <div style={{...card, borderLeft:"7px solid #C45A5A"}}>
       <h2 style={{...h2, color:"#A33A3A"}}>In Case of Emergency</h2>
       <div style={{...check, fontSize:14, lineHeight:1.5, marginBottom:12, color:"#555"}}>If you are experiencing a mental health emergency, please contact immediately:</div>
       <div style={{...check, fontWeight:800}}>• Mobile Crisis: <a href="tel:988" style={{color:"#A33A3A"}}>988</a></div>
       <div style={{...check, fontWeight:800}}>• Local Police: <a href="tel:911" style={{color:"#A33A3A"}}>911</a></div>
       <div style={check}>• Emergency Departments - go to nearest ER</div>
       <div style={{marginTop:14, background:"#FFF0F0", padding:"12px 14px", borderRadius:10, fontFamily:"Inter", fontSize:12, color:"#777"}}>This practice does not provide 24/7 emergency coverage.</div>
     </div>

     <div style={card}>
       <h2 style={h2}>Booking & Policies</h2>
       <div style={check}>✓ 48-hour cancellation policy</div>
       <div style={check}>✓ Secure online booking & payment</div>
       <div style={check}>✓ Insurance reimbursement available</div>
       <div style={{marginTop:16, background:"#DDE7DC", padding:"14px 18px", borderRadius:12, fontFamily:"Inter", fontSize:16, fontWeight:600, color:"#2B222B"}}>Questions? hello@kellyrogers.com</div>
     </div>
    </div>
   </div>
  </div>

  <div style={{background:"#4A7C7E", marginTop:50, padding:"30px 20px"}}>
   <div style={{maxWidth:1140, margin:"0 auto", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:16, alignItems:"center"}}>
    <div style={{color:"white", fontFamily:"Inter", fontSize:20, fontWeight:700}}>Have questions about fees? Book a consult</div>
    <a href="/contact" style={{background:"white", color:"#2B222B", padding:"14px 26px", borderRadius:100, fontWeight:800, textDecoration:"none", fontSize:16}}>Book a Consult →</a>
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
const price={fontFamily:"Inter", fontWeight:900, fontSize:32, color:"#111", marginBottom:4} as const
const sub={fontFamily:"Inter", fontSize:13, fontWeight:700, color:"#4A7C7E", marginBottom:12, textTransform:"uppercase" as const, letterSpacing:"0.05em"} as const
const h2={fontFamily:"Canela, Georgia, serif", fontSize:28, color:"#111", margin:"0 0 14px"} as const
const check={fontFamily:"Inter", fontSize:16, fontWeight:500, lineHeight:1.9, color:"#2B222B"} as const