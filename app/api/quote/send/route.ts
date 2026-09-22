import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)
const FROM = 'Kelly Rogers <onboarding@resend.dev>'
const SITE = process.env.NEXT_PUBLIC_SITE_URL!

export async function POST(req: Request) {
  const { leadId, amount, note, service } = await req.json()
  const { data: lead } = await supabaseAdmin.from('leads').select('*').eq('id', leadId).single()
  if(!lead) return NextResponse.json({error:'Lead not found'}, {status:404})

  // 1. Create Paystack payment link (keep your working code)
  let paymentLink = `${SITE}/pay/${leadId}`
  if(process.env.PAYSTACK_SECRET_KEY){
    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method:'POST',
      headers:{ Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, 'Content-Type':'application/json' },
      body: JSON.stringify({
        email: lead.email,
        amount: Number(amount) * 100,
        metadata: { lead_id: leadId },
        callback_url: `${SITE}/pay/success?lead=${leadId}`
      })
    })
    const data = await paystackRes.json()
    if(data.data?.authorization_url) paymentLink = data.data.authorization_url
  }

  const quotePageUrl = `${SITE}/quote/${leadId}`

  // 2. Update lead -> Quote Sent with exact fee
  await supabaseAdmin.from('leads').update({
    status: 'Quote Sent',
    quote_amount: amount.toString(),
    exact_price: Number(amount),
    service: service || lead.service,
    quote_sent_at: new Date().toISOString(),
    payment_link: paymentLink,
    payment_status: 'unpaid',
    last_contacted_at: new Date().toISOString()
  }).eq('id', leadId)

  // 3. Email with BOTH OPTIONS - Client chooses
  await resend.emails.send({
    from: FROM, to: lead.email,
    subject: `Your exact fee $${amount} - ${service || 'Session'} - Kelly Rogers`,
    html: `
      <div style="font-family:Georgia, serif; max-width:600px; line-height:1.6;">
        <h2 style="color:#3E5A5C; font-family:Canela, Georgia;">Hi ${lead.name},</h2>
        <p>${note ? note.replace(/\n/g,'<br/>') : `Thank you for reaching out.`}</p>
        
        <div style="background:#F7F3EF; border:1.5px solid #E8DDD0; border-radius:12px; padding:18px; margin:18px 0;">
          <p style="margin:0;"><strong>Service:</strong> ${service || lead.service || 'Consultation'}</p>
          <p style="margin:8px 0 0 0; font-size:20px;"><strong>Exact Fee: $${amount}</strong></p>
        </div>

        <h3 style="margin:24px 0 12px 0;">Choose how you want to pay:</h3>

        <div style="border:1.5px solid #111; border-radius:10px; padding:14px; margin-bottom:12px;">
          <strong>Option A — Pay Direct (fastest)</strong><br>
          <span style="font-size:13px; color:#555;">Pay now to secure your slot.</span><br>
          <a href="${paymentLink}" style="display:inline-block; margin-top:10px; background:#111; color:#fff; padding:12px 22px; border-radius:8px; text-decoration:none; font-weight:800;">Pay $${amount} Direct</a>
        </div>

        <div style="border:1.5px dashed #4A7C7E; border-radius:10px; padding:14px;">
          <strong>Option B — Use Insurance (Superbill)</strong><br>
          <span style="font-size:13px; color:#555;">You pay $${amount} upfront now. We issue a Superbill for Aetna / Cigna / BCBS / United for you to claim reimbursement.</span><br>
          <a href="${quotePageUrl}?choice=insurance" style="display:inline-block; margin-top:10px; background:#4A7C7E; color:#fff; padding:12px 22px; border-radius:8px; text-decoration:none; font-weight:800;">I want to use Insurance</a>
        </div>

        <p style="font-size:12px; color:#888; margin-top:18px;">All fees are exact: Initial $150 | Divorce/Counselling/Clinical $200 | Ph.D Assessment $300. No ranges.</p>
        <p>Best,<br/>Kelly Rogers</p>
      </div>
    `
  })

  return NextResponse.json({ ok:true, paymentLink, quotePageUrl })
}