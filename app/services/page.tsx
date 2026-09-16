export default function ServicesPage(){
  return (
    <main className="services">
      <h1 className="main-title">How I Can Support You</h1>
      <p className="main-sub">Compassionate, evidence-based support tailored to your unique situation — grounded in care, clarity, and respect.</p>

      {/* DIVORCE COACHING */}
      <section id="divorce" className="service-section">
        <div className="service-img">
          <img src="https://images.unsplash.com/photo-1573497491765-dccce02b29df?q=80&w=600" alt="Divorce Coaching" />
        </div>
        <div className="service-box">
          <span className="num">01 • Divorce Coaching</span>
          <h2>Divorce Coaching</h2>
          <p>Support to navigate separation and divorce with compassion, clarity, and emotional strength during a difficult life transition.</p>
          <div className="detail-block">
            <h4>What's Included</h4>
            <ul>
              <li>1:1 coaching sessions (60 minutes)</li>
              <li>Communication & co-parenting strategies</li>
              <li>Emotional support & resilience building</li>
              <li>Decision-making and boundary-setting tools</li>
            </ul>
          </div>
          <div className="detail-block">
            <h4>Who it's for</h4>
            <ul>
              <li>Individuals navigating separation or divorce</li>
              <li>Those feeling overwhelmed or stuck</li>
              <li>Anyone seeking clarity for next chapter</li>
            </ul>
          </div>
          <a href="/contact" className="book-btn">Book Divorce Coaching</a>
        </div>
      </section>

      {/* COUNSELLING */}
      <section id="counselling" className="service-section reverse">
        <div className="service-img">
          <img src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=600" alt="Counselling" />
        </div>
        <div className="service-box">
          <span className="num">02 • Counselling & Stress Management</span>
          <h2>Counselling & Stress Management</h2>
          <p>Therapeutic support to manage stress, anxiety, and overwhelm, helping you build calm, balance, and practical coping tools for everyday life.</p>
          <div className="detail-block">
            <h4>What's Included</h4>
            <ul>
              <li>Mindfulness & CBT-based techniques</li>
              <li>Personalised stress management plan</li>
              <li>Relaxation & grounding exercises</li>
            </ul>
          </div>
          <div className="detail-block">
            <h4>Who it's for</h4>
            <ul>
              <li>Adults experiencing stress, burnout, or anxiety</li>
              <li>Those seeking practical coping tools</li>
            </ul>
          </div>
          <a href="/contact" className="book-btn">Book Counselling</a>
        </div>
      </section>

      {/* CLINICAL */}
      <section id="clinical" className="service-section">
        <div className="service-img">
          <img src="https://images.unsplash.com/photo-1573497620056-bd5dd1e7dd5b?q=80&w=600" alt="Clinical Support" />
        </div>
        <div className="service-box">
          <span className="num">03 • Clinical Support & Wellbeing</span>
          <h2>Clinical Support & Wellbeing</h2>
          <p>Clinical psychological support focused on mental health, wellbeing, and recovery in a safe, supportive, professional care environment.</p>
          <div className="detail-block">
            <h4>What's Included</h4>
            <ul>
              <li>Evidence-based structured clinical support & care</li>
              <li>Wellbeing & mental health support plan</li>
              <li>Ongoing support & progress reviews</li>
            </ul>
          </div>
          <div className="detail-block">
            <h4>Who it's for</h4>
            <ul>
              <li>Clients needing structured clinical support</li>
              <li>Those managing anxiety, stress, or low mood</li>
              <li>Anyone seeking personal growth & healing</li>
            </ul>
          </div>
          <a href="/contact" className="book-btn">Book This Service</a>
        </div>
      </section>

      <div className="bottom-cta">
        <p>Have questions? I offer a free 15-minute consultation to see if we're a good fit.</p>
        <a href="/contact">Contact Me</a>
      </div>

      <style>{`
        .services{ background:#FFFCF7; padding:40px 20px; max-width:1200px; margin:0 auto; }
        .main-title{ font-family:Georgia, serif; font-size:48px; text-align:center; font-weight:400; margin:0; }
        .main-sub{ text-align:center; font-family:Arial; font-size:14px; max-width:600px; margin:12px auto 40px; line-height:1.6; color:#444; }
        .service-section{ display:flex; gap:30px; margin-bottom:50px; align-items:center; scroll-margin-top:80px; }
        .service-section.reverse{ flex-direction:row-reverse; }
        .service-img{ flex:0.9; }
        .service-img img{ width:100%; border-radius:18px; height:420px; object-fit:cover; }
        .service-box{ flex:1.1; background:white; border-radius:18px; padding:32px; box-shadow:0 8px 30px rgba(0,0,0,0.07); }
        .num{ background:#4A7C80; color:white; font-size:11px; font-family:Arial; padding:5px 12px; border-radius:20px; }
        .service-box h2{ font-family:Georgia, serif; font-size:28px; font-weight:400; margin:14px 0 10px; }
        .service-box p{ font-family:Arial; font-size:13.5px; line-height:1.7; color:#333; margin-bottom:18px; }
        .detail-block{ margin-top:18px; text-align:left; }
        .detail-block h4{ font-family:Arial; font-size:12px; color:#4A7C80; text-transform:uppercase; margin:0 0 8px; letter-spacing:0.5px; }
        .detail-block ul{ margin:0 0 0 16px; padding:0; font-family:Arial; font-size:13px; line-height:2; color:#222; }
        .detail-block li{ margin-bottom:4px; }
        .book-btn{ display:inline-block; margin-top:22px; background:#4A7C80; color:white; padding:10px 22px; border-radius:8px; text-decoration:none; font-family:Arial; font-size:13px; }
        .bottom-cta{ text-align:center; margin-top:30px; font-family:Arial; }
        .bottom-cta p{ font-size:14px; margin-bottom:14px; }
        .bottom-cta a{ border:1.5px solid #4A7C80; color:#4A7C80; padding:8px 20px; border-radius:8px; text-decoration:none; }

        @media(max-width:768px){
          .services{ padding:24px 12px; }
          .main-title{ font-size:32px; }
          .service-section, .service-section.reverse{ flex-direction:column; }
          .service-img img{ height:220px; }
          .service-box{ padding:22px 18px; }
          .service-box h2{ font-size:24px; }
        }
      `}</style>
    </main>
  )
}