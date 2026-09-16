export default function FeesHoursPage() {
  return (
    <main style={{ background: "#F7F3EF", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "48px 20px 0" }}>
        
        {/* Header */}
        <div style={{ textAlign: "left", marginBottom: 32 }}>
          <h1 style={{ 
            fontFamily: "Canela, Georgia, serif", 
            fontSize: "clamp(38px, 6vw, 64px)", 
            fontWeight: 400, 
            color: "#4A7C7E", 
            margin: 0, 
            lineHeight: 1.1,
            letterSpacing: "-0.02em"
          }}>
            Fees & Hours
          </h1>
          <p style={{ 
            fontFamily: "Inter, Arial, sans-serif", 
            fontSize: 16, 
            color: "#2B222B", 
            opacity: 0.7, 
            marginTop: 12,
            lineHeight: 1.6,
            maxWidth: 560
          }}>
            Transparent pricing and clear policies — no surprises, just clear information to help you plan your care.
          </p>
        </div>

        {/* 2 Column Layout */}
        <div className="fees-grid">
          
          {/* LEFT - Pricing */}
          <div>
            <h3 style={h3}>Pricing</h3>
            
            <div style={card}>
              <span style={sageBadge}>Initial Consultation</span>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                <div>
                  <div style={price}>Free • 15 min</div>
                  <p style={pSmall}>A brief introductory call to discuss your needs and determine if we're a good fit.</p>
                  <div style={{ marginTop: 14 }}>
                    <div style={checkRow}>✓ Discuss goals and concerns</div>
                    <div style={checkRow}>✓ Answer questions about my approach</div>
                    <div style={checkRow}>✓ Next steps & recommendations</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={card}>
              <span style={sageBadge}>Individual Session</span>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={price}>$220 • 50 min</div>
                  <p style={pSmall}>One-on-one therapy session tailored to your goals and needs.</p>
                  <div style={{ marginTop: 14 }}>
                    <div style={checkRow}>✓ Evidence-based therapeutic support</div>
                    <div style={checkRow}>✓ Goal setting & progress review</div>
                    <div style={checkRow}>✓ Confidential, supportive space</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={card}>
              <span style={sageBadge}>Divorce Coaching Session</span>
              <div style={price}>$220 • 60 min</div>
              <p style={pSmall}>Focused coaching to navigate separation, co-parenting, and transition.</p>
            </div>
          </div>

          {/* RIGHT - Details */}
          <div>
            <div style={sideCard}>
              <div style={iconRow}>📅 <b>Office Hours</b></div>
              <div style={sideText}><b>Monday – Friday: 9:00am – 5:00pm</b><br/><span style={{opacity:0.6}}>Eastern Time • Appointments available by booking</span></div>
            </div>

            <div style={sideCard}>
              <div style={iconRow}>🛡️ <b>Insurance</b></div>
              <div style={sideText}><b>I am a private-pay provider and do not bill insurance directly.</b> You may be eligible for out-of-network reimbursement. A superbill can be provided upon request to submit to your insurer.</div>
            </div>

            <div style={sideCard}>
              <div style={iconRow}>⏰ <b>Cancellation Policy</b></div>
              <div style={sideText}><b>48 hours notice required to cancel or reschedule without a fee.</b> Late cancellations or no-shows may be charged the full session fee.</div>
            </div>

            <div style={sideCard}>
              <div style={iconRow}>💳 <b>Payment Methods</b></div>
              <div style={sideText}>Secure payments accepted via Stripe: <b>Credit/Debit Card, Digital Wallet</b></div>
              <div style={{ marginTop: 8, background: "#635BFF", color: "white", display: "inline-block", padding: "4px 10px", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>Stripe</div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: 48 }}>
          <h3 style={h3}>Frequently Asked Questions</h3>
          <div className="faq-grid">
            <div style={faqCard}><b>Do you accept insurance?</b><p>I am an out-of-network provider. I can provide a detailed superbill for you to submit to your insurer for potential out-of-network reimbursement...</p><span style={arrow}>›</span></div>
            <div style={faqCard}><b>Do you offer online sessions?</b><span style={arrow}>›</span></div>
            <div style={faqCard}><b>What payment methods are accepted?</b><span style={arrow}>›</span></div>
            <div style={faqCard}><b>Is there a sliding scale or financial assistance?</b><span style={arrow}>›</span></div>
          </div>
        </div>
      </div>

      {/* Bottom CTA - Teal */}
      <div style={{ background: "#4A7C7E", marginTop: 48, padding: "28px 20px" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ color: "#FDF3FF", fontFamily: "Inter", fontWeight: 700, fontSize: 16 }}>Have questions about fees? Book a free consult</div>
            <div style={{ color: "#F7F3EF", fontFamily: "Inter", fontSize: 13, opacity: 0.8, marginTop: 4 }}>A brief 15-minute call to discuss your needs — no commitment required.</div>
          </div>
          <a href="/contact" style={{ background: "#FDF3FF", color: "#2B222B", padding: "12px 22px", borderRadius: 100, fontFamily: "Inter", fontWeight: 700, fontSize: 14, textDecoration: "none", whiteSpace: "nowrap" }}>Book a Free Consult →</a>
        </div>
      </div>

      <style>{`
        .fees-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 20px; }
        .faq-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        @media(max-width: 900px){
          .fees-grid { grid-template-columns: 1fr; gap: 24px; }
          .faq-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  )
}

const h3 = { fontFamily: "Canela, Georgia, serif", fontSize: 20, color: "#2B222B", margin: "0 0 14px" } as const
const card = { background: "#FDF3FF", borderRadius: 14, padding: "20px 22px", marginBottom: 14, border: "1px solid #E8DDD0", boxShadow: "0 4px 18px rgba(0,0,0,0.04)" } as const
const sideCard = { background: "#FDF3FF", borderRadius: 14, padding: "18px 20px", marginBottom: 12, border: "1px solid #E8DDD0" } as const
const sageBadge = { background: "#A8B5A0", color: "#2B222B", fontSize: 11, fontWeight: 700, padding: "5px 10px", borderRadius: 100, display: "inline-block", marginBottom: 10, letterSpacing: "0.02em" } as const
const price = { fontFamily: "Inter", fontWeight: 800, fontSize: 15, color: "#2B222B", marginBottom: 6 } as const
const pSmall = { fontFamily: "Inter", fontSize: 13.5, lineHeight: "1.75", color: "#2B222B", opacity: 0.75, margin: "6px 0 0" } as const
const checkRow = { fontFamily: "Inter", fontSize: 12.5, lineHeight: "1.8", color: "#2B222B", opacity: 0.8 } as const
const iconRow = { fontFamily: "Inter", fontSize: 14, color: "#2B222B", display: "flex", gap: 8, marginBottom: 8 } as const
const sideText = { fontFamily: "Inter", fontSize: 12.5, lineHeight: "1.7", color: "#2B222B", opacity: 0.8 } as const
const faqCard = { background: "#FDF3FF", borderRadius: 12, padding: "16px 18px", border: "1px solid #E8DDD0", fontFamily: "Inter", fontSize: 13, lineHeight: "1.6", color: "#2B222B", position: "relative" } as const
const arrow = { position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 20, opacity: 0.4 } as const