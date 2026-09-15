export default function Home(){
  return (
    <main>
      <section className="hero-card">
        <h1>Support Through Life's Transitions</h1>
        <p>Compassionate, evidence-based counselling to help you navigate change, stress, and personal growth — with warmth and understanding.</p>
        <div className="hero-img-wrap">
          <img src="/kelly.jpg" alt="Kelly Rogers" />
        </div>
        <a href="/contact" className="btn-primary">Book a Free Consultation</a>
        <a href="/process" className="btn-outline">Learn More</a>
      </section>

      <div className="badges">
        <span>🛡️ Licensed Psychologist</span>
        <span>📹 Telehealth</span>
        <span>📍 In-Person</span>
      </div>

      <section className="support-wrap">
        <h2>Areas of Support</h2>
        <div className="support-card">
          <div className="s-icon">👥</div>
          <div><b>Divorce Coaching</b><p>Guidance through separation, communication & co-parenting challenges</p></div>
        </div>
        <div className="support-card">
          <div className="s-icon">🧠</div>
          <div><b>Counselling & Stress Management</b><p>Managing anxiety, burnout, and everyday stress with care</p></div>
        </div>
        <div className="support-card">
          <div className="s-icon">🛡️</div>
          <div><b>Clinical Support</b><p>Evidence-based therapy for adjustment, grief & life transitions</p></div>
        </div>
      </section>

      <style>{`
        .hero-card{ background:#F3EBE2; margin:20px; border-radius:20px; padding:28px 20px; text-align:center; }
        .hero-card h1{ font-size:38px; font-family:serif; line-height:1.1; font-weight:400; max-width:320px; margin:0 auto; }
        .hero-card p{ font-family:Arial; font-size:14px; line-height:1.5; margin:14px auto; max-width:320px; color:#444; }
        .hero-img-wrap{ width:160px; height:160px; border-radius:50%; overflow:hidden; margin:20px auto; }
        .hero-img-wrap img{ width:100%; height:100%; object-fit:cover; }
        .btn-primary{ display:block; background:#4A7C80; color:white; padding:14px; border-radius:10px; text-decoration:none; font-family:Arial; font-weight:600; margin-top:16px; }
        .btn-outline{ display:block; border:1.5px solid #4A7C80; color:#4A7C80; padding:12px; border-radius:10px; text-decoration:none; font-family:Arial; margin-top:10px; }
        .badges{ display:flex; gap:10px; padding:10px 20px; overflow-x:auto; }
        .badges span{ background:#EAF1ED; padding:8px 12px; border-radius:20px; font-size:11px; font-family:Arial; white-space:nowrap; }
        .support-wrap{ padding:20px; }
        .support-wrap h2{ font-family:serif; font-weight:400; font-size:22px; }
        .support-card{ background:white; border-radius:14px; padding:14px; display:flex; gap:12px; align-items:flex-start; margin-top:12px; box-shadow:0 2px 10px rgba(0,0,0,0.05); text-align:left; }
        .s-icon{ width:44px; height:44px; background:#E2ECEA; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .support-card b{ font-family:Arial; font-size:14px; }
        .support-card p{ font-family:Arial; font-size:12px; color:#666; margin:4px 0 0; line-height:1.4; }

        /* TABLET + DESKTOP */
        @media(min-width:769px){
          .hero-card{ margin:40px 60px; padding:60px; display:flex; flex-direction:column; align-items:center; }
          .hero-card h1{ font-size:52px; max-width:500px; }
          .hero-card p{ max-width:500px; font-size:16px; }
          .hero-img-wrap{ width:220px; height:220px; }
          .btn-primary, .btn-outline{ width:320px; }
          .badges{ justify-content:center; padding:20px; }
          .support-wrap{ padding:40px 60px; max-width:900px; margin:0 auto; }
        }
      `}</style>
    </main>
  )
}