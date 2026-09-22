import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// SERVER TRUTH - exact prices, no range
const PRICE_MAP: Record<string, number> = {
  "Initial Consultation - 60min": 150,
  "Initial Consultation - 60min - $150": 150,
  "Divorce Coaching": 200,
  "Divorce Coaching - $200": 200,
  "Counselling & Stress Management": 200,
  "Counselling & Stress Management - $200": 200,
  "Clinical Support & Wellbeing": 200,
  "Clinical Support & Wellbeing - $200": 200,
  "Ph.D Private Psychotherapy Assessment": 300,
  "Ph.D Private Psychotherapy Assessment - $300": 300,
};

function getExactPrice(service: string) {
  // clean " - $XXX" if present
  const clean = service.split(" - $")[0].trim();
  return PRICE_MAP[service] || PRICE_MAP[clean] || 0;
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    let { name, email, phone, message, source, service, useInsurance, insuranceProvider, memberId } = body

    if (!name ||!email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
    }

    email = email.toLowerCase().trim()
    service = (service || "Initial Consultation - 60min").split(" - $")[0].trim()
    const exactPrice = getExactPrice(service) || body.exactPrice || 0

    // Auto email content logic - Option B
    let emailSubject = `Your fee for ${service} is $${exactPrice}`
    let emailBody = `Hi ${name},\n\nYou selected: ${service}\nExact Fee: $${exactPrice}\n\nYou will only be billed for this chosen service.\n\nNext steps: We will send you a payment link within 24h.`

    if (useInsurance) {
      emailSubject = `Insurance Superbill - ${service} - $${exactPrice} upfront`
      emailBody = `Hi ${name},\n\nYou selected: ${service} - $${exactPrice}\nInsurance Provider: ${insuranceProvider || "Not specified"} / Member ID: ${memberId || "N/A"}\n\nOption B (Out-of-Network): You pay $${exactPrice} upfront. After payment we will issue a Superbill/receipt for you to claim reimbursement from ${insuranceProvider || "your insurer"}.\n\nWe will verify and send payment link.`
    }

    // Check existing
    const { data: existing } = await supabaseAdmin
     .from('leads')
     .select('id')
     .ilike('email', email)
     .maybeSingle()

    const leadPayload = {
      name,
      email,
      phone,
      message,
      service, // new column
      exact_price: exactPrice, // new column
      use_insurance:!!useInsurance, // new column
      insurance_provider: insuranceProvider || null, // new column
      member_id: memberId || null, // new column
      status: useInsurance? 'insurance_verification' : 'New',
      last_contacted_at: new Date().toISOString(),
      source: source || 'contact_form',
    };

    if (existing) {
      const { error } = await supabaseAdmin.from('leads').update(leadPayload).eq('id', existing.id)
      if (error) throw error

      // TODO: Send auto email here with Resend
      console.log("AUTO EMAIL TO:", email, emailSubject, emailBody)

      return NextResponse.json({ ok: true, updated: true, id: existing.id, exactPrice, emailSubject })
    }

    const { data, error } = await supabaseAdmin.from('leads').insert([leadPayload]).select().single()
    if (error) throw error

    // TODO: Send auto email here with Resend
    console.log("AUTO EMAIL TO:", email, emailSubject, emailBody)

       // SEND REAL EMAIL WITH RESEND
    if (process.env.RESEND_API_KEY) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { 
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({
            from: "Kelly Rogers <onboarding@resend.dev>", // change to your verified domain later
            to: email,
            subject: emailSubject,
            text: emailBody,
            html: `<div style="font-family:Inter,sans-serif"><h3>${emailSubject}</h3><p>Hi ${name},</p><p>You selected: <b>${service}</b></p><p style="font-size:22px;color:#4A7C7E"><b>Exact Fee: $${exactPrice}</b></p><p>${useInsurance ? `You pay $${exactPrice} upfront. We will issue a Superbill for ${insuranceProvider}.` : `You will only be billed for this chosen service.`}</p><p>We will send payment link within 24h.</p></div>`
          })
        })
      } catch (mailErr) {
        console.error("Resend error:", mailErr)
      }
    }
    return NextResponse.json({ ok: true, id: data.id, exactPrice, emailSubject })

  } catch (e: any) {
    console.error('Contact error:', e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}