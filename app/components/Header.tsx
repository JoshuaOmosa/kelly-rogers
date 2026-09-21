'use client'
import { useState } from 'react'

export default function Header(){
  const [open,setOpen] = useState(false)
  return (
    <>
      <header className="global-header">
        <div>
          <div className="gh-name">Kelly Rogers, Ph.D (C), LCMHC, LCAS</div>
          <div className="gh-sub">Clinical & Counseling Psychologist</div>
        </div>
        <button onClick={()=>setOpen(!open)} className="gh-burger">☰</button>
        <nav className="gh-desktop">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/services">Services</a>
          <a href="/process">The Process</a>
          <a href="/fees">Fees & Hours</a>
          <a href="/reviews">Reviews</a>
          <a href="/contact">Contact</a>
          <a href="/contact" className="gh-cta">Book Now</a>
        </nav>
      </header>
      {open && (
        <div className="gh-mobile">
          <a href="/">Home</a><a href="/about">About</a><a href="/services">Services</a>
          <a href="/process">The Process</a><a href="/fees">Fees & Hours</a>
          <a href="/reviews">Reviews</a><a href="/contact">Contact</a>
          <a href="/contact" className="gh-mobile-cta">Book a Free Consultation</a>
        </div>
      )}
      <style>{`
        .global-header{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;background:#FFFCF7;position:sticky;top:0;z-index:100;border-bottom:1px solid #efe8dd}
        .gh-name{font-family:Georgia,serif;font-size:20px;font-weight:500}
        .gh-sub{font-family:Arial;font-size:11px;color:#6f8d8f;margin-top:2px}
        .gh-desktop{display:flex;gap:20px;align-items:center;font-family:Arial;font-size:14px}
        .gh-desktop a{text-decoration:none;color:#222}
        .gh-cta{background:#4A7C80;color:white !important;padding:8px 18px;border-radius:8px}
        .gh-burger{display:none;font-size:24px;background:none;border:none}
        .gh-mobile{position:fixed;top:58px;left:0;right:0;bottom:0;background:#FFFCF7;z-index:99;padding:20px;display:flex;flex-direction:column;gap:18px}
        .gh-mobile a{font-family:Arial;font-size:17px;text-decoration:none;color:#111;border-bottom:1px solid #f0e6d8;padding-bottom:12px}
        .gh-mobile-cta{background:#4A7C80;color:white !important;text-align:center;padding:14px;border-radius:10px;border:none !important}
        @media(max-width:1024px){.global-header{padding:14px 24px}.gh-desktop{gap:12px}}
        @media(max-width:768px){.gh-desktop{display:none !important}.gh-burger{display:block !important}}
      `}</style>
    </>
  )
}