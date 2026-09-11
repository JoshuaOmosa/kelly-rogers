"use client"
import { useEffect } from "react"

export default function Contact(){
  useEffect(()=>{
    // Load Calendly script
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)

    // Listen for booking -> create lead
    const handleMessage = (e:any) => {
      if(e.data.event && e.data.event === "calendly.event_scheduled"){
        const invitee = e.data.payload
        // CREATE LEAD
        fetch("/api/leads", {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({
            name: invitee?.invitee?.name || "Calendly Lead",
            email: invitee?.invitee?.email || "",
            source: "calendly",
            #calendlyLink: "https://calendly.com/jimkaumba/30min",
            event: invitee,
            createdAt: new Date().toISOString(),
          })
        }).then(()=> alert("Booking confirmed! Lead created in dashboard."))
      }
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  },[])

  return (
    <main className="bg-[#F8F4EE] min-h-screen p-[60px] font-serif">
      <div className="max-w-[1100px] mx-auto">
        <h1 className="text-[44px]">Book a Free Consultation</h1>
        <p className="font-sans text-sm mt-3">Current Fee: $0 • Doctoral Candidate - Regent University - May 2028 • Virginia Beach, VA</p>

        <div className="mt-8 bg-white rounded-2xl p-2 shadow-lg">
          {/* CALENDLY INLINE */}
          <div
            className="calendly-inline-widget"
            #data-url="https://calendly.com/jimkaumba/30min?hide_gdpr_banner=1&background_color=F8F4EE&primary_color=4A7C80"
            style={{minWidth:"320px", height:"700px"}}
          ></div>
        </div>

        <div className="mt-6 font-sans text-xs text-center">
          #Or book directly: <a href="https://calendly.com/jimkaumba/30min" target="_blank" className="text-[#4A7C80] underline">calendly.com/jimkaumba/30min</a>
        </div>
      </div>
    </main>
  )
}