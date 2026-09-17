import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  try {
    const body = await req.json()
    console.log('Incoming lead:', body)

    let name = body.name
    let email = body.email
    let phone = body.phone || ""
    let message = body.message || ""
    let source = body.source || "contact_form"

    // Calendly raw webhook
    if (body.payload) {
      const invitee = body.payload
      name = invitee?.name || invitee?.invitee?.name || name
      email = invitee?.email || invitee?.invitee?.email || email
      source = "calendly"
      message = `Calendly Booking: ${invitee?.event || body.event || '30min'} - https://calendly.com/jimkaumba/30min`
    }

    // Frontend widget event
    if (body.source === 'calendly') {
      source = "calendly"
      message = `Calendly Booking via website: ${body.calendlyLink || 'https://calendly.com/jimkaumba/30min'} - ${JSON.stringify(body.event || '').slice(0,500)}`
    }

    if (!name ||!email) {
      return NextResponse.json({ error: "Missing name or email" }, { status: 400 })
    }

    const leadToInsert = {
      name,
      email,
      phone,
      message,
      source,
      status: 'New',
      created_at: new Date().toISOString(),
      last_contacted_at: new Date().toISOString(),
      quote_sent_at: null,
      quote_amount: body.quote_amount || null
    }

    const { data, error } = await supabase.from('leads').insert([leadToInsert]).select()

    // Fallback if your table doesn't have the new columns yet
    if (error) {
      console.warn("Full insert failed, retrying basic:", error.message)

      if (error.message.includes('source') || error.message.includes('status') || error.message.includes('quote')) {
        const retry = await supabase.from('leads').insert([{ name, email, phone, message }]).select()
        if (retry.error) throw retry.error
        return NextResponse.json({
          success: true,
          data: retry.data,
          source,
          warning: "Lead saved, but add status/source columns to Supabase for Phase 2 automation"
        })
      }
      throw error
    }

    return NextResponse.json({ success: true, data, source })

  } catch (e: any) {
    console.error('Catch error:', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}