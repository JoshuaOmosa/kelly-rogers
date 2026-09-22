"use client";
import { useState, useMemo } from "react";

const PRICE_MAP: Record<string, number> = {
  "Initial Consultation - 60min": 150,
  "Divorce Coaching": 200,
  "Counselling & Stress Management": 200,
  "Clinical Support & Wellbeing": 200,
  "Ph.D Private Psychotherapy Assessment": 300,
};

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Initial Consultation - 60min",
    message: "",
    useInsurance: false,
    insuranceProvider: "",
    memberId: ""
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const exactPrice = useMemo(() => PRICE_MAP[form.service] || 0, [form.service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!form.name ||!form.email ||!form.message) {
      alert("Please fill name, email and message");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
         ...form,
          exactPrice,
          // if they select consultation, it's just $150, if other service it's that service price
          // total is auto - no adding unless they book 2 services later
        }),
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.error || "Failed to send");

      setForm({ name: "", email: "", phone: "", service: "Initial Consultation - 60min", message: "", useInsurance: false, insuranceProvider: "", memberId: "" });
      setSent(true);
      setTimeout(() => setSent(false), 5000);
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
            Select your service to see exact fee. No ranges.
            <br/><b style={{ color: "#4A7C7E" }}> Doctoral Candidate - Regent University - May 2028 • Virginia Beach, VA</b>
          </p>
        </div>

        <div className="contact-grid">
          <div style={card}>
            <h2 style={h2}>Send us a message</h2>
            <form onSubmit={handleSubmit}>
              <label style={label}>Full Name</label>
              <input style={input} placeholder="Kelly Rogers" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <label style={label}>Email</label>
              <input style={input} type="email" placeholder="you@email.com" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              <label style={label}>Phone</label>
              <input style={input} placeholder="(555) 123-4567" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />

              <label style={label}>Service Interested In - Exact Fee</label>
              <select style={input} value={form.service} onChange={e => setForm({...form, service: e.target.value})}>
                <option>Initial Consultation - 60min - $150</option>
                <option>Divorce Coaching - $200</option>
                <option>Counselling & Stress Management - $200</option>
                <option>Clinical Support & Wellbeing - $200</option>
                <option>Ph.D Private Psychotherapy Assessment - $300</option>
              </select>

              {/* AUTO PRICE DISPLAY */}
              <div style={{ marginTop: 12, background: "#E9EFE6", border: "1px solid #4A7C7E", borderRadius: 8, padding: "12px 14px", fontFamily: "Inter" }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>Your Selected Fee: <span style={{ fontSize: 18, color: "#4A7C7E" }}>${exactPrice}</span></div>
                <div style={{ fontSize: 11.5, color: "#555", marginTop: 4 }}>You will only be billed for this chosen service.</div>
              </div>

              {/* INSURANCE - OPTION B */}
              <div style={{ marginTop: 16, padding: 12, border: "1px dashed #4A7C7E", borderRadius: 8 }}>
                <label style={{ display: "flex", gap: 8, alignItems: "center", cursor: "pointer", fontFamily: "Inter", fontWeight: 700, fontSize: 13.5 }}>
                  <input type="checkbox" checked={form.useInsurance} onChange={e => setForm({...form, useInsurance: e.target.checked})} style={{ width: 18, height: 18, accentColor: "#4A7C7E" }} />
                  I want to use Insurance for reimbursement (Option B)
                </label>
                {form.useInsurance && (
                  <div style={{ marginTop: 10 }}>
                    <select style={input} value={form.insuranceProvider} onChange={e => setForm({...form, insuranceProvider: e.target.value})} required={form.useInsurance}>
                      <option value="">Select Provider</option>
                      <option>Aetna</option><option>Cigna</option><option>BlueCross BlueShield</option><option>United Healthcare</option><option>Anthem</option><option>Other</option>
                    </select>
                    <input style={{...input, marginTop: 8}} placeholder="Member ID / Policy Number" value={form.memberId} onChange={e => setForm({...form, memberId: e.target.value})} />
                    <p style={{ fontSize: 11.5, color: "#4A7C7E", marginTop: 8, lineHeight: 1.4, fontFamily: "Inter", fontWeight: 600 }}>
                      You pay ${exactPrice} upfront. We will issue a Superbill/receipt for you to claim from {form.insuranceProvider || "your insurer"}.
                    </p>
                  </div>
                )}
              </div>

              <label style={label}>How can we support you?</label>
              <textarea style={{...input, height: 110, resize: "none" }} required placeholder="Tell us a bit..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />

              <button type="submit" disabled={loading} style={{...btn, opacity: loading? 0.6 : 1}}>
                {loading? "Sending..." : `✈ Send Message - Pay $${exactPrice}`}
              </button>
              <p style={{ fontFamily: "Inter", fontSize: 13, textAlign: "center", marginTop: 12 }}>We typically respond within 24 hours with payment link + Superbill info.</p>
            </form>
          </div>

          {/* RIGHT - Keep your same How Booking Works but update text */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={card}>
              <h2 style={h2}>How Booking Works</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={step}><span style={stepNum}>1</span><div><b>Select Service</b><br/><span style={stepText}>Exact fee shown - no range.</span></div></div>
                <div style={step}><span style={stepNum}>2</span><div><b>Auto Email with Fee</b><br/><span style={stepText}>You get email: "Your fee for {form.service} is ${exactPrice}"</span></div></div>
                <div style={step}><span style={stepNum}>3</span><div><b>Insurance? Get Superbill</b><br/><span style={stepText}>Pay upfront, we give you Superbill to reimburse.</span></div></div>
                <div style={step}><span style={stepNum}>4</span><div><b>Pick Time</b><br/><span style={stepText}>After payment, choose from open slots.</span></div></div>
              </div>
            </div>
            <div style={{...card, borderLeft: "5px solid #4A7C7E" }}>
              <h2 style={{...h2, margin: 0 }}>Office Hours</h2>
              <div style={{ fontFamily: "Inter", fontSize: 14, lineHeight: 2.2, color: "#111", marginTop: 12 }}>
                <div>✓ <b>Mon, Wed:</b> 9am - 5pm</div>
                <div>✓ <b>Tue, Thu:</b> 9am - 3pm</div>
                <div>✓ <b>Fri:</b> 9am - 1pm</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {sent && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "#2B222B", color: "white", padding: "14px 28px", borderRadius: 100, fontFamily: "Inter", fontWeight: 700, fontSize: 14, zIndex: 9999 }}>
          ✓ Sent! Check your email for exact fee: ${exactPrice}
        </div>
      )}
      <style>{`.contact-grid{ display:grid; grid-template-columns:1fr 1fr; gap:20px; } @media(max-width:900px){.contact-grid{ grid-template-columns:1fr; } }`}</style>
    </main>
  )
}
const card = { background: "white", border: "1.5px solid #4A7C7E", borderRadius: 16, padding: "22px 20px", boxShadow: "0 10px 30px rgba(0,0,0,0.08)" } as const
const h2 = { fontFamily: "Canela, Georgia, serif", fontSize: 26, color: "#2B222B", margin: "0 0 16px" } as const
const label = { fontFamily: "Inter", fontSize: 13, fontWeight: 700, color: "#2B222B", display: "block", margin: "12px 0 6px" } as const
const input = { width: "100%", background: "#F7F3EF", border: "1px solid #E0D5C3", borderRadius: 8, padding: "11px 14px", fontFamily: "Inter", fontSize: 15, color: "#111", outline: "none" } as const
const btn = { width: "100%", marginTop: 18, background: "#4A7C7E", color: "white", border: "none", borderRadius: 100, padding: "14px", fontFamily: "Inter", fontSize: 16, fontWeight: 800, cursor: "pointer" } as const
const step = { display: "flex", gap: 12, alignItems: "flex-start", fontFamily: "Inter", fontSize: 13.5 } as const
const stepNum = { minWidth: 28, height: 28, background: "#4A7C7E", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13 } as const
const stepText = { fontSize: 12.5, color: "#444" } as const