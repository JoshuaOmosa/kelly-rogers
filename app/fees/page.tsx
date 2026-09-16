export default function FeesPage(){
  return (
    <main className="fees-page">
      <div className="top">
        <h2>Fees & Hours</h2>
        <h1>Care That Should Be Accessible To All</h1>
        <p className="sub">donation-based • Regent University • Evidence-informed supervised care</p>
        <p className="desc">
          We operate on a donation-based model as part of Regent University's clinical training program, 
          committed to providing accessible mental health care. All services are offered at no set cost 
          to support our community while maintaining professional standards of care.
        </p>
      </div>

      <div className="grid">
        {/* LEFT */}
        <div className="left">
          <div className="fee-card">
            <div className="ic">💬</div>
            <div className="txt">
              <h3>20 min consultation</h3>
              <p>Introductory call • Goals & fit</p>
            </div>
            <div className="badge">$0</div>
          </div>

          <div className="fee-card">
            <div className="ic">📅</div>
            <div className="txt">
              <h3>50 min session</h3>
              <p>Individual therapy • Supervised</p>
            </div>
            <div className="badge">$0</div>
          </div>

          <div className="fee-card">
            <div className="ic">📍</div>
            <div className="txt">
              <h3>Telehealth & In-Person</h3>
              <p>Virginia Beach • Secure video</p>
            </div>
            <div className="badge">$0</div>
          </div>

          <div className="crisis">
            <strong>In crisis? Call or text 988</strong>
            <span>Suicide & Crisis Lifeline • 24/7 • Free & Confidential</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="right">
          <div className="hours-card">
            <h3>Hours</h3>
            <div className="row"><span>Monday — Friday</span><b>9am — 5pm</b></div>
            <div className="row muted"><span>Saturday</span><span>Closed</span></div>
            <div className="row muted"><span>Sunday</span><span>Closed</span></div>

            <div className="divider"></div>

            <h3>Office Location</h3>
            <div className="loc"><span>◎</span> Virginia Beach, VA</div>
            <div className="loc"><span>◧</span> Telehealth available to VA residents</div>

            <a href="https://calm.regent.edu" target="_blank" className="book-btn">Book on calm.regent.edu</a>
            <p className="note">Licensed professional supervision • Regent University Clinical Training Program</p>
          </div>
        </div>
      </div>

      <style>{`
        .fees-page{ background:#FFFCF7; padding:60px 20px 80px; max-width:1200px; margin:0 auto; }
        .top{ text-align:center; max-width:780px; margin:0 auto 50px; }
        .top h2{ font-family:Georgia, serif; font-style:italic; font-weight:400; font-size:32px; color:#1a3a3d; margin:0; }
        .top h1{ font-family:Georgia, serif; font-size:54px; font-weight:400; color:#111; line-height:1.1; margin:18px 0 10px; }
        .top .sub{ font-family:Arial; font-size:13px; color:#4A7C80; letter-spacing:0.3px; margin:0; }
        .top .desc{ font-family:Arial; font-size:14px; line-height:1.8; color:#444; margin:20px auto 0; max-width:700px; }

        .grid{ display:grid; grid-template-columns:1.4fr 0.9fr; gap:40px; align-items:start; }
        .left{ display:flex; flex-direction:column; gap:18px; }
        .fee-card{ background:white; border-radius:18px; padding:22px 20px; display:flex; align-items:center; gap:16px; box-shadow:0 10px 30px rgba(0,0,0,0.06); }
        .ic{ width:56px; height:56px; min-width:56px; background:#2B7D84; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:22px; color:white; }
        .txt{ flex:1; }
        .txt h3{ font-family:Arial; font-size:17px; font-weight:700; margin:0 0 4px; color:#111; }
        .txt p{ font-family:Arial; font-size:13px; color:#666; margin:0; }
        .badge{ background:#C9E4E6; color:#1f5e64; font-weight:700; padding:8px 16px; border-radius:100px; font-size:14px; }

        .crisis{ background:#F5EDE2; border-radius:14px; padding:16px 20px; display:flex; flex-direction:column; gap:2px; margin-top:6px; }
        .crisis strong{ font-family:Arial; font-size:14px; color:#111; }
        .crisis span{ font-family:Arial; font-size:12px; color:#666; }

        .hours-card{ background:white; border-radius:20px; padding:30px 26px; box-shadow:0 10px 30px rgba(0,0,0,0.06); border-top:4px solid #4A7C80; position:sticky; top:20px; }
        .hours-card h3{ font-family:Georgia, serif; font-size:24px; font-weight:400; margin:0 0 16px; color:#111; }
        .row{ display:flex; justify-content:space-between; font-family:Arial; font-size:14px; padding:8px 0; border-bottom:1px solid #f2f2f2; }
        .row b{ color:#1a3a3d; }
        .muted{ color:#999; }
        .divider{ height:1px; background:#eee; margin:22px 0; }
        .loc{ font-family:Arial; font-size:14px; color:#333; display:flex; gap:10px; margin:10px 0; }
        .book-btn{ display:block; text-align:center; background:#C9E4E6; color:#1f5e64; text-decoration:none; font-family:Arial; font-weight:700; padding:14px; border-radius:100px; margin-top:22px; }
        .note{ font-family:Arial; font-size:11px; color:#888; line-height:1.5; margin-top:14px; }

        @media(max-width:900px){
          .fees-page{ padding:30px 14px 50px; }
          .top h1{ font-size:32px; line-height:1.15; }
          .top .desc{ font-size:13.5px; line-height:1.7; }
          .grid{ grid-template-columns:1fr; gap:22px; }
          .fee-card{ padding:18px 16px; gap:12px; }
          .ic{ width:48px; height:48px; min-width:48px; font-size:20px; }
          .hours-card{ position:static; padding:22px 18px; }
        }
      `}</style>
    </main>
  )
}