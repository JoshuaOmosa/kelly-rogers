"use client";
import { useEffect, useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!form.name || !form.email || !form.message) {
      alert("Please fill name, email and message");
      return;
    }
    setLoading(true);
    try {
      // FIXED: correct endpoint
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || "Failed to send");

      setSent(true);
      setForm({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSent(false), 8000);
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
            We're here to help. Have a question or want to connect? Send us a message below or book a free 15-minute consultation to see if we're a good fit.<br/>
            <b style={{ color: "#4A7C7E" }}> Doctoral Candidate - Regent University - May 2028 • Virginia Beach, VA</b>
          </p>
        </div>

        <div className="contact-grid">
          <div style={card}>
            <h2 style={h2}>Send us a message</h2>
            
            {sent ? (
              <div style={{ background: "#E8F5E9", border: "1px solid #A5D6A7", borderRadius: 12, padding: "32px 20px", textAlign: "center" }}>
                <div style={{ fontSize: 42, marginBottom: 8 }}>✓</div>
                <h3 style={{ fontFamily: "Canela, serif", fontSize: 26, color: "#2E7D32", margin: "0 0 8px" }}>Thank you!</h3>
                <p style={{ fontFamily: "Inter", fontSize: 15, color: "#2B222B", lineHeight: 1.6 }}>
                  Your message has been received. Our team will review it and get back to you within <b>24 hours</b>.
                </p>
                <p style={{ fontFamily: "Inter", fontSize: 13, color: "#666", marginTop: 10 }}>We appreciate you reaching out.</p>
                <button onClick={() => setSent(false)} style={{ marginTop: 16, background: "white", border: "1px solid #A5D6A7", borderRadius: 100, padding: "8px 18px", cursor: "pointer", fontFamily: "Inter", fontWeight: 700, color: "#2E7D32" }}>Send another message</button>
              </div>
            ) : (
            <form onSubmit={handleSubmit}>
              <label style={label}>Full Name</label>
              <input style={input} placeholder="Joshua Stephen" required
                value={form.name} onChange={e => setForm({...form, name: e.target.value})} />

              <label style={label}>Email</label>
              <input style={input} type="email" placeholder="joshua@email.com" required
                value={form.email} onChange={e => setForm({...form, email: e.target.value})} />

              <label style={label}>Phone</label>
              <input style={input} placeholder="(555) 123-4567"
                value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />

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
              
              <p style={{ fontFamily: "Inter", fontSize: 13, textAlign: "center", marginTop: 12, color: "#2B222B" }}>We typically respond within 1-2 business days.</p>
            </form>
            )}
          </div>

          <div style={card}>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 4 }}>
              <span style={{ fontSize: 26 }}>📅</span>
              <h2 style={{ ...h2, margin: 0 }}>Book a Free 15-min Consultation</h2>
            </div>
            <p style={{ fontFamily: "Inter", fontSize: 13, color: "#2B222B", margin: "0 0 12px 36px" }}>Select a time that works for you — powered by Calendly</p>

            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/joshua_stephen1/30min?hide_gdpr_banner=1&background_color=FDFD&text_color=2B222B&primary_color=4A7C7E"
              style={{ minWidth: "100%", height: 560, borderRadius: 12, overflow: "hidden" }}
            />

            <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid #E8DDD0" }}>
              <div style={infoTitle}>📍 Contact Information</div>
              <div style={infoLine}>✉️ kelly@kellyrogerspsychology.com • Virginia Beach, VA</div>
              <div style={infoLine}>🕐 Office Hours: Mon-Fri • 9:00am – 5:00pm ET</div>
              <div style={infoLine}>💻 Virginia Beach, VA • Virtual & In-Person Sessions</div>
              <div style={{ marginTop: 10 }}>
                <a href="https://calendly.com/joshua_stephen1/30min" target="_blank" style={{ fontFamily: "Inter", fontSize: 13, color: "#4A7C7E", fontWeight: 700 }}>Or book directly: calendly.com/joshua_stephen1/30min</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: "#D9E4D0", marginTop: 32, padding: "18px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "flex", gap: 14, width: "100%" }}>
          <div style={{ minWidth: 36, height: 36, background: "#4A7C7E", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18 }}>i</div>
          <div>
            <div style={{ fontFamily: "Inter", fontWeight: 800, fontSize: 16, color: "#111" }}>If you are in crisis or need immediate support, please contact your local crisis line.</div>
            <div style={{ fontFamily: "Inter", fontSize: 13, color: "#111", lineHeight: 1.6, marginTop: 4 }}>
              For Canada: Suicide Crisis Helpline — call or text 988 (24/7) • Crisis Text Line — text HOME to 741741 • Emergency: 911.<br/>
              For US: Call or text 988 • Suicide & Crisis Lifeline 24/7 • This site is not for emergencies. If you are in immediate danger, call 911 or go to your nearest emergency department.
            </div>
          </div>
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
const h2 = { fontFamily: "Canela, Georgia, serif", fontSize: 28, color: "#2B222B", margin: "0 0 16px" } as const
const label = { fontFamily: "Inter", fontSize: 13, fontWeight: 700, color: "#2B222B", display: "block", margin: "12px 0 6px" } as const
const input = { width: "100%", background: "#F7F3EF", border: "1px solid #E0D5C3", borderRadius: 8, padding: "11px 14px", fontFamily: "Inter", fontSize: 15, color: "#111", outline: "none" } as const
const small = { fontFamily: "Inter", fontSize: 12.5, color: "#2B222B", lineHeight: 1.5 } as const
const btn = { width: "100%", marginTop: 18, background: "#4A7C7E", color: "white", border: "none", borderRadius: 100, padding: "14px", fontFamily: "Inter", fontSize: 16, fontWeight: 800, cursor: "pointer" } as const
const infoTitle = { fontFamily: "Inter", fontSize: 14, fontWeight: 800, color: "#2B222B", marginBottom: 8 } as const
const infoLine = { fontFamily: "Inter", fontSize: 13, color: "#2B222B", lineHeight: 1.8, fontWeight: 500 } as const