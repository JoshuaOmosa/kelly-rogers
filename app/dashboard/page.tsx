"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const leadsData = [
  { date: "Oct 5, 2024", name: "Sarah Mitchell", email: "s.mitchell@email.com", phone: "(555) 234-1189", source: "Website", tag: "Follow-Up Sent", status: "Voicemail left • 4h ago", next: "Oct 8, 2024 • in 2 days", avatar: "SM", bg: "#4A7C7E" },
  { date: "Oct 5, 2024", name: "James Chen", email: "j.chen@email.com", phone: "(555) 802-4491", source: "Website Form", tag: "Form submitted", status: "Form submitted • 6h ago", next: "Oct 7, 2024 • today", avatar: "JC", bg: "#A8B5A0" },
  { date: "Oct 4, 2024", name: "Emma Rodriguez", email: "e.rodriguez@email.com", phone: "(555) 917-3320", source: "Quote Sent", tag: "Quote Sent", status: "Quote emailed • 1 day ago", next: "Oct 9, 2024 • in 3 days", avatar: "ER", bg: "#4A7C7E" },
  { date: "Oct 3, 2024", name: "Michael Park", email: "m.park@email.com", phone: "(555) 644-7721", source: "Booking", tag: "Booking", status: "Deal closed • 2 days ago", next: "—", avatar: "MP", bg: "#2B222B" },
  { date: "Oct 2, 2024", name: "Olivia Thompson", email: "o.thompson@email.com", phone: "(555) 311-8894", source: "Lost", tag: "Lost", status: "No response • 4 days ago", next: "—", avatar: "OT", bg: "#C9A6A0" },
];

const filters = ["All Leads", "New", "Quote Sent", "Follow-Up Sent", "Won", "Lost", "Missed Calls"];

export default function DashboardPage() {
  const router = useRouter();
  const [active, setActive] = useState("All Leads");
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("kr_auth")) router.push("/dashboard/login");
  }, [router]);

  const filtered = leadsData.filter(l =>
    q === "" || `${l.name} ${l.email}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <main style={{ background: "#FDF6EB", minHeight: "100vh", display: "flex", fontFamily: "Inter, sans-serif" }}>

      {/* SIDEBAR - Desktop */}
      <aside className="side">
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
            <div style={{ width: 36, height: 36, background: "#F7F3EF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>🧠</div>
            <div><div style={{ fontWeight: 900, fontSize: 13, color: "#FDF3FF" }}>Kelly Rogers Psychology</div><div style={{ fontSize: 10, color: "#F7F3EF", opacity: 0.8 }}>PhD • Psychology Practice</div></div>
          </div>

          <div style={{ fontSize: 11, fontWeight: 800, color: "#F7F3EF", opacity: 0.5, letterSpacing: "0.08em", margin: "10px 8px" }}>LEADS</div>
          <div style={{ fontSize: 11, fontWeight: 800, background: "#FFFFFF22", color: "#FDF3FF", padding: "6px 10px", borderRadius: 6, marginBottom: 12 }}>Status Filters</div>

          {filters.map(f => (
            <button key={f} onClick={() => setActive(f)} style={{
              width: "100%", textAlign: "left", padding: "11px 12px", borderRadius: 10, border: "none", cursor: "pointer", display: "flex", gap: 10,
              background: active === f? "#F7F3EF" : "transparent",
              color: active === f? "#2B222B" : "#FDF3FF", fontWeight: active === f? 800 : 500, fontSize: 13, marginBottom: 4
            }}>
              {f === "All Leads"? "☰" : f === "New"? "☆" : f === "Quote Sent"? "✈" : f === "Follow-Up Sent"? "↻" : f === "Won"? "✔" : f === "Lost"? "✕" : "📞"} {f}
            </button>
          ))}

          <div style={{ borderTop: "1px solid #FFFFFF20", marginTop: 20, paddingTop: 16 }}>
            <div style={{ padding: "10px 12px", color: "#FDF3FF", fontSize: 13 }}>⚙ Settings</div>
            <div style={{ padding: "10px 12px", color: "#FDF3FF", fontSize: 13 }}>❓ Help & Support</div>
            <div style={{ background: "#FFFFFF25", borderRadius: 8, padding: "8px 10px", fontSize: 10, color: "#FDF3FF", marginTop: 16 }}>🛡 HIPAA Secure • Encrypted</div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* TOP BAR */}
        <div style={{ background: "#FDF6EB", borderBottom: "1px solid #E8DDD0", padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 800, color: "#4A7C7E", fontSize: 13 }}>
            <div style={{ width: 26, height: 26, background: "#4A7C7E", borderRadius: "50%", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>🧠</div> Kelly Rogers Psychology
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input placeholder="Search leads, email, phone..." value={q} onChange={e=>setQ(e.target.value)} style={{ background: "white", border: "1.5px solid #4A7C7E", borderRadius: 10, padding: "8px 12px 8px 28px", fontSize: 13, width: 220 }} />
            <div style={{ width: 32, height: 32, background: "#A8B5A0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12 }}>KR</div>
          </div>
        </div>

        <div style={{ padding: 18 }}>
          <h1 style={{ fontFamily: "Canela, Georgia, serif", fontSize: 28, color: "#2B222B", margin: "0 0 4px" }}>Lead & Inquiry Dashboard</h1>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
            <p style={{ fontSize: 13, color: "#2B222B", opacity: 0.7, margin: 0 }}>Manage patient inquiries, track follow-ups, and convert leads securely</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={topBtn}>+ Send Quote</button>
              <button style={topBtn}>✔ Mark as Won</button>
              <button style={{...topBtn, background: "#4A7C7E", color: "white", borderColor: "#4A7C7E" }}>☆ Request Review</button>
            </div>
          </div>

          {/* KPI CARDS - Big Readable */}
          <div className="kpiGrid">
            <div style={kpiCard}><div style={kpiIcon}>👥</div><div><div style={kLab}>Total Leads This Month</div><div style={kVal}>24</div><div style={kSub}>+3 from last month</div><b style={{ color: "#2E8B57", fontSize: 11 }}>↑ +12%</b></div></div>
            <div style={kpiCard}><div style={{...kpiIcon, background: "#F7F3EF" }}>🕐</div><div><div style={kLab}>Response Time Avg</div><div style={kVal}>2.1h</div><div style={kSub}>Faster than avg 3.4h</div><b style={{ color: "#2E8B57", fontSize: 11 }}>↓ -38%</b></div></div>
            <div style={kpiCard}><div style={{...kpiIcon, background: "#E8F5E8" }}>↗</div><div><div style={kLab}>Quote Conversion</div><div style={kVal}>68%</div><div style={kSub}>+5% vs last month</div><b style={{ color: "#2E8B57", fontSize: 11 }}>↑ +5%</b></div></div>
            <div style={kpiCard}><div style={{...kpiIcon, background: "#FFF2E0" }}>☆</div><div><div style={kLab}>Review Requests Sent</div><div style={kVal}>12</div><div style={kSub}>4 new reviews published</div><b style={{ color: "#2E8B57", fontSize: 11 }}>↑ +2</b></div></div>
          </div>

          {/* LEADS TABLE */}
          <div style={{ background: "white", borderRadius: 14, padding: 14, border: "1px solid #E8DDD0", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
              <b style={{ fontSize: 16 }}>Leads (24)</b>
              <div style={{ display: "flex", gap: 8 }}><select style={sel}><option>Last 30 days</option></select><input placeholder="Filter by name, email..." style={{...sel, width: 160 }} /><button style={sel}>⬇ Export CSV</button></div>
            </div>

            <div style={{ background: "#FFF4E0", borderRadius: 8, padding: "8px 12px", fontSize: 11, fontWeight: 800, color: "#8A5A00", marginBottom: 10 }}>⏰ Automated Reminder • Follow-up email scheduled in 2 days</div>

            <div className="tableScroll">
              <div style={headRow}><div>Date</div><div>Name</div><div>Email</div><div>Phone</div><div>Source</div><div>Status</div><div>Next Follow-up</div><div>Actions</div></div>
              {filtered.map((l,i)=>(
                <div key={i} style={{...row, background: i===0?"#FFF7E8":"white", borderLeft: i===0?"4px solid #E8A44A":"4px solid transparent" }}>
                  <div style={cSmall}>{l.date}</div>
                  <div style={{ display:"flex", gap:8, alignItems:"center", fontWeight:800, fontSize:13 }}><div style={{ width:26, height:26, borderRadius:"50%", background:l.bg, color:"white", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>{l.avatar}</div>{l.name}</div>
                  <div style={cSmall}>{l.email}</div>
                  <div style={cSmall}>{l.phone}</div>
                  <div><span style={badge(l.tag)}>{l.tag}</span></div>
                  <div style={{ fontSize:10 }}>{l.status}</div>
                  <div style={{ fontSize:10, background:l.next.includes("today")?"#D6E9FF":l.next.includes("2 days")?"#FFE8CC":"transparent", padding:"4px 6px", borderRadius:6 }}>{l.next}</div>
                  <div style={{ display:"flex", gap:4 }}>☐ ☐ ☆</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
       .side{ width:210px; background:#4A6B6D; min-height:100vh; }
       .kpiGrid{ display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:16px; }
       .tableScroll{ overflow-x:auto; }
       .tableScroll > div{ min-width:900px; }
        @media(max-width:900px){
         .side{ display:none; }
         .kpiGrid{ grid-template-columns:repeat(2,1fr); }
        }
        @media(max-width:600px){
         .kpiGrid{ grid-template-columns:1fr; }
        }
      `}</style>
    </main>
  )
}

const topBtn={ border:"1.5px solid #4A7C7E", background:"white", color:"#4A7C7E", borderRadius:10, padding:"7px 12px", fontSize:12, fontWeight:800 } as const
const kpiCard={ background:"white", borderRadius:12, padding:14, display:"flex", gap:12, border:"1px solid #E8DDD0" } as const
const kpiIcon={ width:36, height:36, borderRadius:"50%", background:"#F0E8E0", display:"flex", alignItems:"center", justifyContent:"center" } as const
const kLab={ fontSize:11, color:"#2B222B", opacity:0.7, fontWeight:700 } as const
const kVal={ fontSize:30, fontWeight:900, color:"#2B222B", lineHeight:1.1 } as const
const kSub={ fontSize:10, opacity:0.6 } as const
const sel={ border:"1px solid #E8DDD0", borderRadius:8, padding:"6px 10px", fontSize:12, background:"white" } as const
const headRow={ display:"grid", gridTemplateColumns:"80px 1.1fr 1.3fr 110px 100px 120px 140px 80px", gap:8, padding:"8px 10px", background:"#F7F3EF", borderRadius:8, fontSize:11, fontWeight:900 } as const
const row={ display:"grid", gridTemplateColumns:"80px 1.1fr 1.3fr 110px 100px 120px 140px 80px", gap:8, padding:"12px 10px", borderBottom:"1px solid #F0E8DC", alignItems:"center" } as const
const cSmall={ fontSize:12, color:"#2B222B" } as const
const badge=(t:string)=>({ fontSize:10, padding:"4px 8px", borderRadius:6, fontWeight:800, display:"inline-block", background:t==="Follow-Up Sent"?"#E6E0FF":t==="Form submitted"?"#D6E9FF":t==="Quote Sent"?"#CDE8FF":t==="Booking"?"#C8EAC8":t==="Lost"?"#FFD0D0":"#EEE", color:"#2B222B" }) as const