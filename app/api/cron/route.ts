import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key_for_build')

export async function GET() {
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ ok: true, message: 'Skipped - no RESEND key set' })
  }

  const now = new Date()
  let actions: string[] = []

  // 1. Check New leads older than 24h -> remind YOU (Kelly)
  const { data: newLeads } = await supabaseAdmin
    .from('leads')
    .select('*')
    .ilike('status', 'new') // ilike = case-insensitive, so 'New' or 'new' both work

  for (const lead of newLeads || []) {
    const created = new Date(lead.created_at)
    const hoursSince = (now.getTime() - created.getTime()) / (1000*60*60)

    if (hoursSince > 24) {
      actions.push(`24h reminder to YOU: ${lead.email}`)

      // Send email to Kelly
      await resend.emails.send({
        from: 'Kelly Rogers <leads@kellyrogers.com>',
        to: process.env.NOTIFY_EMAIL || 'kelly@kellyrogers.com',
        subject: `⚠️ Unresponded Lead: ${lead.name} - 24h`,
        html: `<p>You have a lead from ${lead.name} (${lead.email}) that hasn't been responded to in 24h.</p><p>Message: ${lead.message}</p>`
      })

      // Mark as notified so we don't spam
      await supabaseAdmin.from('leads').update({ status: 'Follow-Up Sent' }).eq('id', lead.id)
    }
  }

  // 2. Check Quote Sent leads -> 3-day and 7-day follow-up to CLIENT
  const { data: quotedLeads } = await supabaseAdmin
    .from('leads')
    .select('*')
    .ilike('status', 'quote sent')

  for (const lead of quotedLeads || []) {
    if (!lead.quote_sent_at) continue
    const quoteSent = new Date(lead.quote_sent_at)
    const hoursSinceQuote = (now.getTime() - quoteSent.getTime()) / (1000*60*60)

    if (hoursSinceQuote >= 72 && hoursSinceQuote < 73) {
      actions.push(`3-day follow-up to CLIENT: ${lead.email}`)
      await resend.emails.send({
        from: 'Kelly Rogers <hello@kellyrogers.com>',
        to: lead.email,
        subject: `Checking in, ${lead.name}`,
        html: `<p>Hi ${lead.name},</p><p>Just checking in on the quote I sent. Do you have any questions? I'd love to help you move forward.</p><p>Kelly</p>`
      })
    }

    if (hoursSinceQuote >= 168 && hoursSinceQuote < 169) {
      actions.push(`7-day follow-up to CLIENT: ${lead.email}`)
      await resend.emails.send({
        from: 'Kelly Rogers <hello@kellyrogers.com>',
        to: lead.email,
        subject: `Still here to help, ${lead.name}`,
        html: `<p>Hi ${lead.name},</p><p>Just wanted to follow up once more. I'm here if you decide you'd like to proceed.</p><p>Warmly,<br/>Kelly</p>`
      })
      await supabaseAdmin.from('leads').update({ status: 'Follow-Up Sent' }).eq('id', lead.id)
    }
  }

  return NextResponse.json({ ok: true, checked: (newLeads?.length||0)+(quotedLeads?.length||0), actions })
}