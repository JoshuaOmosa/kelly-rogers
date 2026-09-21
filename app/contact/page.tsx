"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    service: "Initial Consultation - 60min", 
    message: "" 
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!form.name || !form.email || !form.message) {
      alert("Please fill name, email and message");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || "Failed to send");

      setForm({ name: "", email: "", phone: "", service: "Initial Consultation - 60min", message: "" });
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ background: "#F7F3EF", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "40px 18px 0" }}>
        
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <h1 style={{ fontFamily: "Canela, Georgia, serif", fontSize: "clamp(42px,6vw,64px)", color: "#4A7C7E", margin: 0, lineHeight: 1 }}>Contact</h1>
          <p style={{ fontFamily: "Inter", fontSize: 17, color: "#2B222B", fontWeight: 500, maxWidth: 700, margin: "14px auto 0", lineHeight: 1.6 }}>
            Ready to start? Send us a message below. We will reply with your consultation fee and next steps.<br/>
            <b style={{ color: "#4A7C7E" }}> Doctoral Candidate - Regent University - May 2028 • Virginia Beach, VA</b>
          </p>
        </div>

        <div className="contact-grid">
          {/* LEFT - FORM */}
          <div style={card}>
            <h2 style={h2}>Send us a message</h2>
            
            <form onSubmit={handleSubmit}>
              <label style={label}>Full Name</label>
              <input style={input} placeholder="Kelly Rogers" required
                value={form.name} onChange={e => setForm({...form, name: e.target.value})} />

              <label style={label}>Email</label>
              <input style={input} type="email" placeholder="you@email.com" required
                value={form.email} onChange={e => setForm({...form, email: e.target.value})} />

              <label style={label}>Phone</label>
              <input style={input} placeholder="(555) 123-4567" required
                value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />

              <label style={label}>Service Interested In</label>
              <select style={input} value={form.service} onChange={e => setForm({...form, service: e.target.value})}>
                <option>Initial Consultation - 60min</option>
                <option>Divorce Coaching</option>
                <option>Counselling & Stress Management</option>
                <option>Clinical Support & Wellbeing</option>
                <option>Ph.D Private Psychotherapy Assessment</option>
              </select>

              <label style={label}>How can we support you?</label>
              <textarea style={{ ...input, height: 110, resize: "none" }} required
                placeholder="Tell us a bit about what you're looking for support with..."
                value={form.message} onChange={e => setForm({...form, message: e.target.value})} />

              <div style={{ marginTop: 16, display: "flex", gap: 10, alignItems: "flex-start" }}>
                <input type="checkbox" defaultChecked style={{ width: 18, height: 18, accentColor: "#4A7C7E" }} />
                <span style={small}>I consent to being contacted regarding my inquiry via the information provided above.</span>
              </div>
              <div style={{ marginTop: 10, display: "flex", gap: 10, alignItems: "flex-start" }}>
                <input type="checkbox" required style={{ width: 18, height: 18, accentColor: "#4A7C7E" }} />
                <span style={small}>I have read and agree to the Privacy Policy.</span>
              </div>

              <button type="submit" disabled={loading} style={{...btn, opacity: loading ? 0.6 : 1}}>
                {loading ? "Sending..." : "✈ Send Message"}
              </button>
              
              <p style={{ fontFamily: "Inter", fontSize: 13, textAlign: "center", marginTop: 12, color: "#2B222B" }}>We typically respond within 24 hours.</p>
            </form>
          </div>

          {/* RIGHT - OFFICE HOURS + HOW IT WORKS */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            
            <div style={card}>
              <h2 style={h2}>How Booking Works</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={step}><span style={stepNum}>1</span><div><b>Send Message</b><br/><span style={stepText}>Fill the form.</span></div></div>
                <div style={step}><span style={stepNum}>2</span><div><b>Receive Fee Link</b><br/><span style={stepText}>We reply with consultation fee & payment link via email.</span></div></div>
                <div style={step}><span style={stepNum}>3</span><div><b>Pay to Secure</b><br/><span style={stepText}>After payment, you get a private link to pick time.</span></div></div>
                <div style={step}><span style={stepNum}>4</span><div><b>Pick Your Time</b><br/><span style={stepText}>Choose only from the available slots - no double-booking.</span></div></div>
              </div>
            </div>

            <div style={{ ...card, borderLeft: "5px solid #4A7C7E" }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 24 }}>🕐</span>
                <h2 style={{ ...h2, margin: 0 }}>Office Hours</h2>
              </div>
              <div style={{ fontFamily: "Inter", fontSize: 14, lineHeight: 2.2, color: "#111" }}>
                <div>✓ <b>Mon, Wed:</b> 9am - 5pm</div>
                <div>✓ <b>Tue, Thu:</b> 9am - 3pm</div>
                <div>✓ <b>Fri:</b> 9am - 1pm</div>
                <div>✓ <b>Tue-Thu Evening:</b> 6pm - 7:30pm</div>
              </div>
              <div style={{ marginTop: 12, background: "#F7F3EF", padding: 10, borderRadius: 8, fontFamily: "Inter", fontSize: 12.5, lineHeight: 1.5 }}>
                Our scheduling system automatically blocks times outside these hours and prevents double-booking. You will only see open, valid slots after payment.
              </div>
              <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid #E8DDD0" }}>
                <div style={infoTitle}>📍 Contact Information</div>
                <div style={infoLine}>✉️ destini46@outlook.com</div>
                <div style={infoLine}>📍 Virginia Beach, VA • Virtual & In-Person</div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {sent && (
        <div style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          background: "#2B222B",
          color: "white",
          padding: "14px 28px",
          borderRadius: 100,
          fontFamily: "Inter",
          fontWeight: 700,
          fontSize: 14,
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          zIndex: 9999,
          textAlign: "center"
        }}>
          ✓ Message sent! We will reply with your fee & payment link within 24h.
        </div>
      )}

     {/* EMERGENCY FOOTER - NEW CLEAN DESIGN */}
<div style={{ background: "#E9EFE6", marginTop: 40, borderTop: "1px solid #C5D6C0" }}>
  <div style={{ maxWidth: 1180, margin: "0 auto", padding: "22px 18px", display: "flex", gap: 16, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
    
    <div style={{ minWidth: 32, height: 32, background: "#4A7C7E", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 15, fontFamily: "Georgia" }}>i</div>
    
    <div style={{ fontFamily: "Inter", fontSize: 14, color: "#1e3a3a", lineHeight: 1.6, textAlign: "center" }}>
      <span style={{ fontWeight: 800 }}>In case of emergency: </span>
      <span style={{ fontWeight: 600 }}>Mobile Crisis Contact: 988</span>
      <span style={{ margin: "0 10px", color: "#8AA89D" }}>•</span>
      <span style={{ fontWeight: 600 }}>Local Police: 911</span>
      <span style={{ margin: "0 10px", color: "#8AA89D" }}>•</span>
      <span style={{ fontWeight: 600 }}>Emergency Services including Emergency Departments</span>
    </div>

  </div>
  <div style={{ textAlign: "center", paddingBottom: 14, fontFamily: "Inter", fontSize: 11.5, color: "#6B7F76" }}>
    This site is not for emergencies. If you are in immediate danger, call 911 or go to your nearest emergency department.
  </div>
</div>

      <style>{`
        .contact-grid{ display:grid; grid-template-columns:1fr 1fr; gap:20px; }
        @media(max-width:900px){
          .contact-grid{ grid-template-columns:1fr; }
        }
      `}</style>
    </main>
  )
}

const card = { background: "white", border: "1.5px solid #4A7C7E", borderRadius: 16, padding: "22px 20px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" } as const
const h2 = { fontFamily: "Canela, Georgia, serif", fontSize: 26, color: "#2B222B", margin: "0 0 16px" } as const
const label = { fontFamily: "Inter", fontSize: 13, fontWeight: 700, color: "#2B222B", display: "block", margin: "12px 0 6px" } as const
const input = { width: "100%", background: "#F7F3EF", border: "1px solid #E0D5C3", borderRadius: 8, padding: "11px 14px", fontFamily: "Inter", fontSize: 15, color: "#111", outline: "none" } as const
const small = { fontFamily: "Inter", fontSize: 12.5, color: "#2B222B", lineHeight: 1.5 } as const
const btn = { width: "100%", marginTop: 18, background: "#4A7C7E", color: "white", border: "none", borderRadius: 100, padding: "14px", fontFamily: "Inter", fontSize: 16, fontWeight: 800, cursor: "pointer" } as const
const infoTitle = { fontFamily: "Inter", fontSize: 14, fontWeight: 800, color: "#2B222B", marginBottom: 8 } as const
const infoLine = { fontFamily: "Inter", fontSize: 13, color: "#2B222B", lineHeight: 1.8, fontWeight: 500 } as const
const step = { display: "flex", gap: 12, alignItems: "flex-start", fontFamily: "Inter", fontSize: 13.5 } as const
const stepNum = { minWidth: 28, height: 28, background: "#4A7C7E", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13 } as const
const stepText = { fontSize: 12.5, color: "#444" } as const