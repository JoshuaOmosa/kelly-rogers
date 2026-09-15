export default function Home() {
  return (
    <main style={{background:'#F8F4EE', minHeight:'100vh', fontFamily:'Georgia, serif', color:'#2B2B2B'}}>
      {/* NAV - NO PhD */}
      <nav style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'18px 60px', background:'#F8F4EE'}}>
        <div>
          <div style={{fontSize:22, color:'#4A6B6E', fontWeight:600}}>Kelly Rogers</div>
          <div style={{fontSize:12, letterSpacing:0.5}}>Clinical & Counselling • Doctoral Candidate</div>
        </div>
        <div style={{display:'flex', gap:22, alignItems:'center', fontFamily:'Arial', fontSize:14}}>
          <a style={{borderBottom:'2px solid #4A6B6E', paddingBottom:2}}>Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/process">The Process</a>
          <a href="/fees">Fees & Hours</a>
          <a href="/reviews">Reviews</a>
          <a href="/contact">Contact</a>
          <a href="/contact" style={{background:'#4A7C80', color:'white', padding:'8px 18px', borderRadius:8, textDecoration:'none'}}>Book Now</a>
        </div>
      </nav>

      {/* HERO - UPDATED BIO */}
      <section style={{display:'flex', padding:'60px 60px', gap:50, alignItems:'center'}}>
        <div style={{flex:1}}>
          <h1 style={{fontSize:52, lineHeight:1.1, fontWeight:400, maxWidth:420}}>Support Through Life's Transitions</h1>
          <p style={{fontFamily:'Arial', fontSize:14, lineHeight:1.6, marginTop:20, maxWidth:560}}>
            I'm pursuing my PhD at Regent University to deepen my expertise and contribute to the field through advanced research and scholarship that bridges clinical practice with deep theoretical insights.
            <br/><br/>
            Compassionate, evidence-based counselling and coaching for individuals navigating divorce, stress and life transitions. A safe, professional space to restore clarity, resilience, and wellbeing.
          </p>
          <div style={{display:'flex', gap:14, marginTop:28}}>
            <a href="/contact" style={{background:'#4A7C80', color:'white', padding:'12px 22px', borderRadius:8, fontFamily:'Arial', fontSize:14, textDecoration:'none'}}>Book a Free Consultation</a>
            <a href="/process" style={{border:'1px solid #4A7C80', color:'#4A7C80', padding:'12px 22px', borderRadius:8, fontFamily:'Arial', fontSize:14, textDecoration:'none'}}>Learn More About The Process</a>
          </div>
          <div style={{display:'flex', gap:16, marginTop:28, fontFamily:'Arial', fontSize:11, flexWrap:'wrap'}}>
            <span>✅ Doctoral Candidate • Counseling Studies - Regent University</span>
            <span>✅ Telehealth & In-Person Sessions</span>
            <span>✅ Virginia Beach, VA • Expected 2028</span>
          </div>
        </div>
        <div style={{flex:0.8}}>
          <img src="/kelly.jpg" alt="Kelly Rogers" style={{width:'100%', borderRadius:16, objectFit:'cover', maxHeight:460}} />
        </div>
      </section>

      {/* HOW I CAN SUPPORT - SAME */}
      <section style={{background:'linear-gradient(to bottom, #FFFCF7 0%, #EDE8E1 100%)', padding:'40px 60px 60px', textAlign:'center'}}>
        <h2 style={{fontSize:30, fontWeight:400}}>How I Can Support You</h2>
        <p style={{fontFamily:'Arial', fontSize:14, marginTop:6}}>Three core areas of care designed to support you during times of change</p>
        <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:20, marginTop:30}}>
          {[
              {t:'Services', d:'Comprehensive coaching, counselling and clinical support tailored to your life transitions.', h:'/services'},
              {t:'Counselling & Stress Management', d:'Evidence-based support for anxiety, stress and overwhelm using CBT and mindfulness.', h:'/services'},
              {t:'Clinical Support & Wellbeing', d:'Individual support for life transitions, self-esteem, and emotional regulation.', h:'/services'},
            ].map((card)=> (
            <div key={card.t} style={{background:'white', borderRadius:14, padding:'24px 18px', boxShadow:'0 8px 30px rgba(0,0,0,0.08)'}}>
              <div style={{width:48, height:48, borderRadius:'50%', background:'#DDE6DC', margin:'0 auto 14px'}}></div>
              <h3 style={{fontSize:20, fontWeight:400}}>{card.t}</h3>
              <p style={{fontFamily:'Arial', fontSize:12, lineHeight:1.5, marginTop:10}}>{card.d}</p>
              <a href={card.h} style={{marginTop:12, fontFamily:'Arial', fontSize:12, color:'#4A7C80', textDecoration:'none', display:'block'}}>Learn more →</a>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}