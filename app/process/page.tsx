export default function ProcessPage(){
  return (
    <main className="process-page">
      <div className="header-wrap">
        <h1>Your Journey to Wellbeing</h1>
        <p>A clear, compassionate process designed to support you at every step — from first hello to lasting growth.</p>
      </div>

      <div className="timeline">
        <div className="line"></div>
        <div className="steps">
          {/* STEP 1 */}
          <div className="step">
            <div className="icon-circle">📅</div>
            <div className="card">
              <span>Step 01</span>
              <h3>Book a Free Consultation</h3>
              <p>Schedule a complimentary 15-min call to discuss your current challenges, goals, and see if we're a good fit. No pressure — just a warm conversation.</p>
            </div>
          </div>

          {/* STEP 2 */}
          <div className="step">
            <div className="icon-circle">📋</div>
            <div className="card">
              <span>Step 02</span>
              <h3>Initial Assessment</h3>
              <p>A thoughtful 50-min session where we explore your history, stressors, support systems, and desired outcomes in a safe, confidential space.</p>
            </div>
          </div>

          {/* STEP 3 */}
          <div className="step">
            <div className="icon-circle">🤍</div>
            <div className="card">
              <span>Step 03</span>
              <h3>Personalized Support Plan</h3>
              <p>Together we create a tailored plan — evidence-based tools like CBT, mindfulness, and coaching exercises designed around your needs and pace.</p>
            </div>
          </div>

          {/* STEP 4 */}
          <div className="step">
            <div className="icon-circle">🌱</div>
            <div className="card">
              <span>Step 04</span>
              <h3>Ongoing Growth & Healing</h3>
              <p>Regular 50-min sessions weekly or bi-weekly via Telehealth or in-person in Virginia Beach, VA. We track progress and adjust to support long-term resilience.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-wrap">
        <a href="/contact" className="cta-btn">Start Your Journey — Book Consultation</a>
        <p className="small">Kelly Rogers, Ph.D (C), LCMHC, LCAS • Licensed Psychologist • Private & Confidential • Telehealth Available</p>
      </div>

      <style>{`
        .process-page{ background:#FFFCF7; padding:60px 20px 80px; max-width:1200px; margin:0 auto; }
        .header-wrap{ text-align:center; max-width:700px; margin:0 auto 60px; }
        .header-wrap h1{ font-family:Georgia, serif; font-size:56px; font-weight:400; color:#1a3a3d; margin:0; line-height:1.1; }
        .header-wrap p{ font-family:Arial; font-size:15px; line-height:1.7; color:#555; margin:18px 0 0; }

        .timeline{ position:relative; padding-top:20px; }
        .line{ position:absolute; top:42px; left:10%; right:10%; height:2px; background:#4A7C80; opacity:0.3; }
        .steps{ display:flex; gap:24px; justify-content:space-between; position:relative; }

        .step{ flex:1; display:flex; flex-direction:column; align-items:center; text-align:center; }
        .icon-circle{ width:86px; height:86px; background:#4A7C80; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:34px; color:white; box-shadow:0 8px 20px rgba(74,124,128,0.25); margin-bottom:-22px; z-index:2; }
        .card{ background:white; border-radius:20px; padding:44px 22px 28px; box-shadow:0 10px 30px rgba(0,0,0,0.07); min-height:240px; width:100%; }
        .card span{ font-family:Arial; font-size:12px; color:#4A7C80; font-weight:700; letter-spacing:0.5px; }
        .card h3{ font-family:Georgia, serif; font-size:20px; font-weight:600; margin:10px 0 12px; color:#111; line-height:1.3; }
        .card p{ font-family:Arial; font-size:13.5px; line-height:1.75; color:#333; margin:0; }

        .cta-wrap{ text-align:center; margin-top:70px; }
        .cta-btn{ display:inline-block; background:#3D6E72; color:white; padding:16px 38px; border-radius:100px; text-decoration:none; font-family:Arial; font-size:15px; font-weight:600; box-shadow:0 8px 20px rgba(61,110,114,0.3); }
        .cta-btn:hover{ background:#2f5a5e; }
        .small{ font-family:Arial; font-size:12px; color:#777; margin-top:18px; }

        @media(max-width:768px){
          .process-page{ padding:30px 14px 60px; }
          .header-wrap h1{ font-size:34px; }
          .header-wrap{ margin-bottom:30px; }
          .line{ left:36px; right:auto; top:0; bottom:0; width:2px; height:auto; }
          .steps{ flex-direction:column; gap:0; }
          .step{ flex-direction:row; align-items:flex-start; text-align:left; gap:16px; margin-bottom:28px; }
          .icon-circle{ width:64px; height:64px; min-width:64px; font-size:26px; margin:0; }
          .card{ padding:20px 18px; min-height:auto; border-radius:16px; }
          .card h3{ font-size:18px; }
          .card p{ font-size:13px; }
        }
      `}</style>
    </main>
  )
}