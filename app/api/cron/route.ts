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

  // FIX 1: From must be onboarding until domain verified in Resend
  const FROM = 'Kelly Rogers <onboarding@resend.dev>'
  const KELLY_NOTIFY = process.env.NOTIFY_EMAIL || 'kelly@kellyrogers.com'

  // 1. New leads older than 24h -> remind YOU (Kelly) - DON'T change status
  const { data: newLeads } = await supabaseAdmin
    .from('leads')
    .select('*')
    .ilike('status', 'new')

  for (const lead of newLeads || []) {
    const created = new Date(lead.created_at)
    const hoursSince = (now.getTime() - created.getTime()) / (1000*60*60)
    const lastContact = lead.last_contacted_at ? new Date(lead.last_contacted_at) : created
    const hoursSinceLastContact = (now.getTime() - lastContact.getTime()) / (1000*60*60)

    // Only remind if >24h old AND we haven't reminded in last 23h (prevents spam)
    if (hoursSince > 24 && hoursSinceLastContact > 23) {
      actions.push(`24h reminder to YOU: ${lead.email}`)
      
      await resend.emails.send({
        from: FROM,
        to: KELLY_NOTIFY,
        subject: `⚠️ Unresponded Lead: ${lead.name} - 24h`,
        html: `<p>Kelly, you have a New lead from <b>${lead.name} (${lead.email})</b> for 24h.</p><p>Phone: ${lead.phone}</p><p>Message: ${lead.message}</p><p>Dashboard: ${process.env.NEXT_PUBLIC_SITE_URL}/admin</p>`
      })

      // Update last_contacted_at so we don't spam you every hour
      await supabaseAdmin.from('leads').update({ last_contacted_at: now.toISOString() }).eq('id', lead.id)
    }
  }

  // 2. Quote Sent -> 3-day and 7-day to CLIENT
  const { data: quotedLeads } = await supabaseAdmin
    .from('leads')
    .select('*')
    .eq('status', 'Quote Sent')

  for (const lead of quotedLeads || []) {
    if (!lead.quote_sent_at) continue
    const quoteSent = new Date(lead.quote_sent_at)
    const hoursSinceQuote = (now.getTime() - quoteSent.getTime()) / (1000*60*60)

    // 3-day window - allow 72h+ but only once
    if (hoursSinceQuote >= 72 && hoursSinceQuote < 96 && lead.status === 'Quote Sent') {
      actions.push(`3-day follow-up to CLIENT: ${lead.email}`)
      await resend.emails.send({
        from: FROM,
        to: lead.email,
        subject: `Checking in, ${lead.name} — your quote`,
        html: `<p>Hi ${lead.name},</p><p>Just checking in on the quote I sent. Do you have any questions? I'd love to help you move forward.</p><p>Warmly,<br/>Kelly</p>`
      })
      await supabaseAdmin.from('leads').update({ status: 'Follow-Up Sent', last_contacted_at: now.toISOString() }).eq('id', lead.id)
    }

    // 7-day - only if we already did 3-day
    if (hoursSinceQuote >= 168 && hoursSinceQuote < 192) {
      const { data: check } = await supabaseAdmin.from('leads').select('status').eq('id', lead.id).single()
      if (check?.status === 'Follow-Up Sent') {
        actions.push(`7-day follow-up to CLIENT: ${lead.email}`)
        await resend.emails.send({
          from: FROM,
          to: lead.email,
          subject: `Still here to help, ${lead.name}`,
          html: `<p>Hi ${lead.name},</p><p>Just wanted to follow up once more. I'm here if you decide you'd like to proceed.</p><p>Warmly,<br/>Kelly</p>`
        })
      }
    }
  }

    // 3. Auto LOST if unpaid after 7 days
  const { data: unpaid } = await supabaseAdmin.from('leads').select('*').eq('status','Quote Sent').eq('payment_status','unpaid')
  for(const l of unpaid||[]){
    if(!l.quote_sent_at) continue
    const hrs = (now.getTime() - new Date(l.quote_sent_at).getTime())/3600000
    if(hrs >= 168){
      await supabaseAdmin.from('leads').update({ status:'Lost' }).eq('id', l.id)
      actions.push(`Auto Lost: ${l.email}`)
    }
  }

  // 4. Auto Review 24h after Complete
  const { data: completed } = await supabaseAdmin.from('leads').select('*').eq('status','Complete').is('review_sent_at', null)
  for(const l of completed||[]){
    const hrs = (now.getTime() - new Date(l.last_contacted_at||l.quote_sent_at).getTime())/3600000
    if(hrs >= 24){
      await resend.emails.send({
        from: FROM, to: l.email,
        subject: `How was your experience, ${l.name}?`,
        html: `<p>Hi ${l.name}, thanks for choosing us! Could you leave a quick review?</p><p><a href="$https://kelly-rogers-one.vercel.app//reviews/submit?lead=${l.id}">Leave Review</a></p>`
      })
      await supabaseAdmin.from('leads').update({ review_sent_at: now.toISOString() }).eq('id', l.id)
      actions.push(`Review sent to: ${l.email}`)
    }
  }
  return NextResponse.json({ ok: true, checked: (newLeads?.length||0)+(quotedLeads?.length||0), actions })
}