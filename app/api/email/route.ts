import { NextResponse } from "next/server"
import { Resend } from "resend"
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { to, name, type } = await req.json()
    if(type === "3-day") {
      await resend.emails.send({
        from: "Kelly Rogers <onboarding@resend.dev>",
        to,
        subject: `Checking in, ${name} — your quote`,
        html: `<p>Hi ${name},</p><p>Just checking in on your quote. Happy to answer any questions.</p><p>Best,<br/>Kelly Rogers, PhD</p>`
      })
    }
    return NextResponse.json({ success: true })
  } catch(e:any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}