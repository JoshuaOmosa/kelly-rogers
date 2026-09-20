import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { to, name, type, phone, message } = await req.json()

    if (!to) return NextResponse.json({ success: false, error: "Missing to" }, { status: 400 })

    const FROM = "Kelly Rogers <onboarding@resend.dev>"
    const KELLY_EMAIL = "kelly@kellyrogersinteriors.com"

    if (type === "new-lead") {
      const { error } = await resend.emails.send({
        from: FROM,
        to: KELLY_EMAIL,
        subject: `🔥 New Lead: ${name} - ${to}`,
        html: `<p><b>New lead from website</b></p><p><b>Name:</b> ${name}<br/><b>Email:</b> ${to}<br/><b>Phone:</b> ${phone}<br/><b>Message:</b> ${message}</p><p>Dashboard: ${process.env.NEXT_PUBLIC_SITE_URL}/dashboard</p>`
      })
      if (error) throw error
    }

    if (type === "3-day") {
      const { error } = await resend.emails.send({
        from: FROM,
        to,
        subject: `Checking in, ${name} — your quote`,
        html: `<p>Hi ${name},</p><p>Just checking in on the quote I sent — happy to answer any questions you have.</p><p>Warmly,<br/>Kelly Rogers, PhD</p>`
      })
      if (error) throw error
    }

    if (type === "7-day") {
      const { error } = await resend.emails.send({
        from: FROM,
        to,
        subject: `Quick closing loop, ${name}?`,
        html: `<p>Hi ${name},</p><p>Closing the loop on your quote — would you like me to hold your spot for this month?</p><p>Let me know either way.</p><p>Best,<br/>Kelly</p>`
      })
      if (error) throw error
    }

    if (type === "24h-kelly") {
      const { error } = await resend.emails.send({
        from: FROM,
        to: KELLY_EMAIL,
        subject: `⏰ Action Needed: Follow up with ${name} - ${to}`,
        html: `<p>Hi Kelly,</p><p>Lead <b>${name} (${to})</b> has been in <b>New</b> for 24 hours.</p><p>Go to your dashboard to mark as Contacted / Quote Sent.</p><p>Link: ${process.env.NEXT_PUBLIC_SITE_URL}/dashboard</p>`
      })
      if (error) throw error
    }

    return NextResponse.json({ success: true, type })

  } catch(e:any) {
    console.error("Email error:", e)
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}