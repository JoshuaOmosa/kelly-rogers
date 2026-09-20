export default function Home(){
  return (
    <main className="home">
      <div className="hero-box">
        <h1>Support Through Life's Transitions</h1>
        <p>Compassionate, evidence-based counseling to help you navigate change, stress, and personal growth — with warmth and understanding.</p>
        <div className="circle-img"><img src="/kelly.jpg" alt="Kelly"/></div>
        <a href="/contact" className="primary">Book a Free Consultation</a>
        <a href="/process" className="outline">Learn More</a>
      </div>

      <div className="pills">
        <span>🛡️ Licensed Psychologist</span>
        <span>💻 Telehealth</span>
        <span>📍 In-Person</span>
      </div>

      <h2 className="section-title">Areas of Support</h2>
      <div className="cards">
        <a href="/services#divorce" className="card">
            <div className="ic">👥</div>
           <div><b>Divorce Coaching</b><p>Guidance through separation, communication & co-parenting challenges</p></div>
          <span className="learn">Learn more →</span>
      </a>

      <a href="/services#counseling" className="card">
          <div className="ic">🧠</div>
          <div><b>Counseling & Stress Management</b><p>Managing anxiety, burnout, and everyday stress with care</p></div>
          <span className="learn">Learn more →</span>
      </a>

      <a href="/services#clinical" className="card">
         <div className="ic">🛡️</div>
          <div><b>Clinical Support</b><p>Evidence-based therapy for adjustment, grief & life transitions</p></div>
          <span className="learn">Learn more →</span>
      </a>
      </div>

      <style>{`
        .card{ display:flex; gap:12px; text-decoration:none; color:inherit; cursor:pointer; }
        .card:hover{ background:#f5efe6; }
        .learn{ font-family:Arial; font-size:11px; color:#4A7C80; font-weight:600; margin-top:6px; display:block; } 
        
        .home{max-width:500px;margin:0 auto;padding-bottom:40px}
        .hero-box{background:#EDE6DB;margin:12px;border-radius:18px;padding:26px 18px;text-align:center}
        .hero-box h1{font-family:Georgia,serif;font-size:36px;line-height:1.1;font-weight:400;margin:0 auto;max-width:300px}
        .hero-box p{font-family:Arial;font-size:13px;line-height:1.5;color:#444;margin:12px auto;max-width:300px}
        .circle-img{width:150px;height:150px;border-radius:50%;overflow:hidden;margin:18px auto}
        .circle-img img{width:100%;height:100%;object-fit:cover}
        .primary{display:block;background:#4A7C80;color:white;padding:14px;border-radius:10px;text-decoration:none;font-family:Arial;font-weight:600;margin-top:10px}
        .outline{display:block;border:1.5px solid #4A7C80;color:#4A7C80;padding:12px;border-radius:10px;text-decoration:none;font-family:Arial;margin-top:10px;background:white}
        .pills{display:flex;gap:8px;padding:12px;overflow-x:auto}
        .pills span{background:#E6EDE8;padding:8px 12px;border-radius:20px;font-size:11px;font-family:Arial;white-space:nowrap;display:flex;gap:6px;align-items:center}
        .section-title{font-family:Georgia,serif;font-weight:400;font-size:20px;padding:0 14px;margin-top:18px}
        .cards{padding:0 12px;display:flex;flex-direction:column;gap:12px;margin-top:10px}
        .card{background:white;border-radius:14px;padding:14px;display:flex;gap:12px;box-shadow:0 2px 12px rgba(0,0,0,0.06);text-align:left}
        .ic{width:42px;height:42px;background:#DDE9E6;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
        .card b{font-family:Arial;font-size:13px}
        .card p{font-family:Arial;font-size:11px;color:#666;margin:4px 0 0;line-height:1.4}

        @media(min-width:769px){
          .home{max-width:900px}
          .hero-box{margin:30px auto;padding:50px 60px;max-width:600px}
          .hero-box h1{font-size:48px;max-width:420px}
          .hero-box p{font-size:15px;max-width:420px}
          .circle-img{width:200px;height:200px}
          .pills{justify-content:center}
          .cards{max-width:600px;margin:10px auto 0}
        }
      `}</style>
    </main>
  )
}