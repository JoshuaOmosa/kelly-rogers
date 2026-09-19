import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, service } = await req.json()

    // 1. Log to private DB as New
    const { data, error } = await supabase
      .from('inquiries')
      .insert({
        name,
        email,
        phone,
        message,
        service,
        status: 'New',
        last_status_change: new Date().toISOString()
      })
      .select()
      .single()

    if (error) throw error

    // 2. Notify Kelly immediately
    await resend.emails.send({
      from: 'Kelly Rogers <onboarding@resend.dev>',
      to: 'joshua_stephen1@outlook.com', // <- CHANGE to Kelly's real email
      subject: `New Inquiry: ${name} - ${service || 'General'}`,
      html: `
        <h3>New Lead: ${name}</h3>
        <p><b>Email:</b> ${email}<br/>
        <b>Phone:</b> ${phone || 'N/A'}<br/>
        <b>Service:</b> ${service || 'N/A'}</p>
        <p>${message}</p>
        <p><a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard">View in Dashboard</a></p>
      `
    })

    return NextResponse.json({ success: true, inquiry: data })
  } catch (err: any) {
    console.error(err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}