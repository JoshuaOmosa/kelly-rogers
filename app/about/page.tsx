export default function AboutPage(){
  return (
    <main className="about">
      {/* HERO */}
      <section className="about-hero">
        <div className="about-img">
          <img src="/kelly-white.jpg" alt="Kelly Rogers, Ph.D (C), LCMHC, LCAS" />
        </div>
        <div className="about-text">
          <h1>About Kelly Rogers</h1>
          <div className="cred">Ph.D (C), LCMHC, LCAS, Clinical & Counseling Psychologist • Doctoral Candidate • Regent University</div>
          <p className="intro">
            I'm Kelly — a warm and grounded psychologist dedicated to supporting adults through life's 
            challenges with compassion, curiosity, and care. I offer a safe space to explore what's important 
            to you and work together to create meaningful, lasting change.
          </p>

          <h3>My Approach</h3>
          <p>
            I draw on evidence-based therapies tailored to your individual needs, integrating CBT, ACT, and 
            mindfulness-based approaches. My style is collaborative, respectful, and focused on helping you 
            build practical strategies you can use in everyday life.
          </p>

          <h3>Qualifications & Experience</h3>
          <ul>
            <li>PhD Candidate in Counseling Studies, Regent University — research on wellbeing & life transitions.</li>
            <li>10+ years clinical experience in private practice and coaching settings.</li>
            <li>Trained in CBT, ACT, and Compassion-Focused Therapy.</li>
            <li>Virginia Licensed • Expected 2028 • Supervised Clinical Practice.</li>
          </ul>

          <h3>Who I Work With</h3>
          <p>
            Adults navigating anxiety, stress, low mood, relationship challenges, life transitions, divorce, 
            and self-esteem. I also work with professionals managing burnout and those seeking personal growth.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="values">
        <h2>My Approach is Grounded In</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="v-icon">🛡️</div>
            <h4>Evidence-Based</h4>
            <p>Grounded in current research and proven therapeutic practices.</p>
          </div>
          <div className="value-card">
            <div className="v-icon">🤍</div>
            <h4>Compassionate</h4>
            <p>A warm, non-judgemental space where you feel heard and valued.</p>
          </div>
          <div className="value-card">
            <div className="v-icon">🤝</div>
            <h4>Collaborative</h4>
            <p>We work together as a team, honouring your goals and lived experience.</p>
          </div>
          <div className="value-card">
            <div className="v-icon">🔒</div>
            <h4>Confidential</h4>
            <p>Your privacy is paramount. All sessions are confidential and secure.</p>
          </div>
        </div>
        <a href="/contact" className="cta">Book a Consultation</a>
      </section>

      <style>{`
        .about{ background:#FFFCF7; padding-bottom:40px; }
        .about-hero{ display:flex; gap:50px; padding:60px 60px 30px; align-items:flex-start; max-width:1200px; margin:0 auto; }
        .about-img{ flex:0.8; }
        .about-img img{ 
          width:100%; 
          aspect-ratio:3/4; 
          object-fit:cover; 
          object-position:top center; 
          border-radius:24px; 
          max-width:380px; 
          box-shadow:0 8px 30px rgba(0,0,0,0.08);
        }
        .about-text{ flex:1.2; }
        .about-text h1{ font-family:Georgia, serif; font-size:54px; font-weight:400; margin:0; color:#1e3a3a; line-height:1.05; }
        .cred{ color:#4A7C80; font-family:Arial; font-size:13px; margin:12px 0 18px; }
        .intro{ font-family:Arial; font-size:14px; line-height:1.6; color:#222; }
        .about-text h3{ font-family:Georgia, serif; font-size:22px; font-weight:500; margin:26px 0 8px; color:#1e3a3a; }
        .about-text p{ font-family:Arial; font-size:13.5px; line-height:1.6; color:#333; margin:0; }
        .about-text ul{ margin:10px 0 0 18px; padding:0; font-family:Arial; font-size:13.5px; line-height:1.7; color:#333; }
        .about-text li::marker{ color:#4A7C80; }

        .values{ background:#EAEFE6; margin:40px 24px 0; border-radius:20px; padding:40px; text-align:center; max-width:1200px; margin-left:auto; margin-right:auto; }
        .values h2{ font-family:Georgia, serif; font-size:28px; font-weight:400; margin:0 0 24px; }
        .values-grid{ display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:18px; }
        .value-card{ background:white; border-radius:14px; padding:22px 16px; box-shadow:0 4px 20px rgba(0,0,0,0.06); }
        .v-icon{ width:44px; height:44px; background:#E6EDE8; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 12px; font-size:20px; }
        .value-card h4{ font-family:Georgia, serif; font-size:18px; font-weight:500; margin:0; }
        .value-card p{ font-family:Arial; font-size:12px; line-height:1.5; color:#555; margin-top:8px; }
        .cta{ display:inline-block; margin-top:28px; background:#4A7C80; color:white; padding:12px 28px; border-radius:8px; text-decoration:none; font-family:Arial; font-size:14px; }

        /* MOBILE - waist still visible */
        @media(max-width:768px){
          .about-hero{ flex-direction:column; padding:24px 20px 10px; align-items:center; text-align:center; gap:20px; }
          .about-img img{ max-width:320px; aspect-ratio:3/4; border-radius:20px; }
          .about-text h1{ font-size:36px; }
          .cred{ font-size:12px; max-width:300px; margin:10px auto 14px; }
          .about-text{ text-align:left; width:100%; }
          .about-text h3{ font-size:20px; margin-top:22px; }
          .values{ margin:20px 12px 0; padding:24px 14px; border-radius:16px; }
          .values h2{ font-size:22px; }
          .values-grid{ grid-template-columns:1fr; }
        }
      `}</style>
    </main>
  )
}