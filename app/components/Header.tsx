'use client'
import { useState } from 'react'

export default function Header(){
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className="site-header">
        <div>
          <div className="logo-main">Kelly Rogers, PhD</div>
          <div className="logo-sub">Clinical & Counselling Psychologist</div>
        </div>
        <button className="hamburger" onClick={()=>setOpen(!open)}>☰</button>
        
        <nav className="desktop-nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/process">The Process</a>
          <a href="/fees">Fees & Hours</a>
          <a href="/reviews">Reviews</a>
          <a href="/contact" className="nav-cta">Book Now</a>
        </nav>
      </header>

      {open && (
        <div className="mobile-drawer">
          <a href="/" onClick={()=>setOpen(false)}>Home</a>
          <a href="/about" onClick={()=>setOpen(false)}>About</a>
          <a href="/services" onClick={()=>setOpen(false)}>Services</a>
          <a href="/process" onClick={()=>setOpen(false)}>The Process</a>
          <a href="/fees" onClick={()=>setOpen(false)}>Fees & Hours</a>
          <a href="/reviews" onClick={()=>setOpen(false)}>Reviews</a>
          <a href="/contact" onClick={()=>setOpen(false)}>Contact</a>
          <a href="/contact" onClick={()=>setOpen(false)} className="drawer-cta">Book a Free Consultation</a>
        </div>
      )}

      <style>{`
        .site-header{ display:flex; justify-content:space-between; align-items:center; padding:18px 60px; background:#FFFCF7; position:sticky; top:0; z-index:100; border-bottom:1px solid #EDE8E1; }
        .logo-main{ font-size:22px; font-weight:600; color:#1a1a1a; font-family:serif; }
        .logo-sub{ font-size:11px; color:#6b8a8c; font-family:Arial; }
        .desktop-nav{ display:flex; gap:22px; align-items:center; font-family:Arial; font-size:14px; }
        .desktop-nav a{ text-decoration:none; color:#1a1a1a; }
        .nav-cta{ background:#4A7C80; color:white !important; padding:8px 18px; border-radius:8px; }
        .hamburger{ display:none; font-size:26px; background:none; border:none; cursor:pointer; }
        .mobile-drawer{ position:fixed; top:64px; left:0; right:0; bottom:0; background:#FFFCF7; z-index:99; padding:24px; display:flex; flex-direction:column; gap:18px; }
        .mobile-drawer a{ font-size:18px; text-decoration:none; color:#1a1a1a; font-family:Arial; border-bottom:1px solid #f0e9e0; padding-bottom:12px; }
        .drawer-cta{ background:#4A7C80; color:white !important; padding:14px; border-radius:10px; text-align:center; border:none !important; }

        @media(max-width: 1024px){ .site-header{ padding:16px 24px; } .desktop-nav{ gap:14px; font-size:13px; } }
        @media(max-width: 768px){ .desktop-nav{ display:none !important; } .hamburger{ display:block !important; } }
      `}</style>
    </>
  )
}