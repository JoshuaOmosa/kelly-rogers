import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)
const FROM = 'Kelly Rogers <onboarding@resend.dev>'
const SITE = process.env.NEXT_PUBLIC_SITE_URL!

export async function POST(req: Request) {
  const { leadId, amount, note } = await req.json()
  const { data: lead } = await supabaseAdmin.from('leads').select('*').eq('id', leadId).single()
  if(!lead) return NextResponse.json({error:'Lead not found'}, {status:404})

  // 1. Create Paystack payment link (if keys exist, else use dummy link)
  let paymentLink = `${SITE}/pay/${leadId}`
  if(process.env.PAYSTACK_SECRET_KEY){
    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method:'POST',
      headers:{ Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, 'Content-Type':'application/json' },
      body: JSON.stringify({
        email: lead.email,
        amount: Number(amount) * 100, // Paystack in kobo
        metadata: { lead_id: leadId },
        callback_url: `${SITE}/pay/success?lead=${leadId}`
      })
    })
    const data = await paystackRes.json()
    if(data.data?.authorization_url) paymentLink = data.data.authorization_url
  }

  // 2. Update lead -> auto Quote Sent
  await supabaseAdmin.from('leads').update({
    status: 'Quote Sent',
    quote_amount: amount.toString(),
    quote_sent_at: new Date().toISOString(),
    payment_link: paymentLink,
    payment_status: 'unpaid',
    last_contacted_at: new Date().toISOString()
  }).eq('id', leadId)

  // 3. Email client with quote + pay button
  await resend.emails.send({
    from: FROM, to: lead.email,
    subject: `Your quote from Kelly Rogers — $${amount}`,
    html: `<p>Hi ${lead.name},</p><p>${note}</p><p><b>Quote Amount: $${amount}</b></p><p><a href="${paymentLink}" style="background:#000;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block">Pay Now to Confirm</a></p><p>Best,<br/>Kelly</p>`
  })

  return NextResponse.json({ ok:true, paymentLink })
}