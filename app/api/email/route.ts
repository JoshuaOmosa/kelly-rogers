import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { to, name, type } = await req.json()

    if (!to) return NextResponse.json({ success: false, error: "Missing to" }, { status: 400 })

    // Use onboarding@resend.dev until your domain is verified in Resend
    // After you verify kellyrogersinteriors.com in Resend, change to: Kelly Rogers <hello@kellyrogersinteriors.com>
    const FROM = "Kelly Rogers <onboarding@resend.dev>"
    const KELLY_EMAIL = "kelly@kellyrogersinteriors.com" // <-- change to your real email

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
      // This is the reminder TO YOU that a New lead is waiting 24h
      const { error } = await resend.emails.send({
        from: FROM,
        to: KELLY_EMAIL,
        subject: `⏰ Action Needed: Follow up with ${name} - ${to}`,
        html: `<p>Hi Kelly,</p><p>Lead <b>${name} (${to})</b> has been in <b>New</b> for 24 hours.</p><p>Go to your dashboard to mark as Contacted / Quote Sent.</p><p>Link: ${process.env.NEXT_PUBLIC_SITE_URL}/admin</p>`
      })
      if (error) throw error
    }

    return NextResponse.json({ success: true, type })

  } catch(e:any) {
    console.error("Email error:", e)
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}