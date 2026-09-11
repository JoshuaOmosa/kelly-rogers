import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)
  
  try {
    const body = await req.json()
    console.log('Incoming lead:', body)

    // --- HANDLE CALENDLY WEBHOOK + FRONTEND WIDGET ---
    // Calendly can send { invitee, event } or our frontend sends { name, email, source: 'calendly' }
    let name = body.name
    let email = body.email
    let phone = body.phone || ""
    let message = body.message || ""
    let source = body.source || "contact_form"

    // If it's a raw Calendly webhook: body.payload
    if (body.payload) {
      const invitee = body.payload
      name = invitee?.name || invitee?.invitee?.name || name
      email = invitee?.email || invitee?.invitee?.email || email
      source = "calendly"
      message = `Calendly Booking: ${invitee?.event || body.event || '30min'} - https://calendly.com/jimkaumba/30min`
    }

    // If it's our frontend widget event
    if (body.source === 'calendly') {
      message = `Calendly Booking via website: ${body.calendlyLink || 'https://calendly.com/jimkaumba/30min'} - ${JSON.stringify(body.event || '').slice(0,500)}`
    }

    if (!name || !email) {
      return NextResponse.json({ error: "Missing name or email" }, { status: 400 })
    }

    const { data, error } = await supabase.from('leads').insert([{ 
      name, 
      email, 
      phone, 
      message,
      // if your table has 'source' column, it will save. If not, it will ignore - so we try with it but fallback
    }]).select()

    // If error because of 'source' column missing, retry without it
    if (error && error.message.includes('source')) {
      const retry = await supabase.from('leads').insert([{ name, email, phone, message }]).select()
      if (retry.error) throw retry.error
      return NextResponse.json({ success: true, data: retry.data, source })
    }

    if (error) throw error
    return NextResponse.json({ success: true, data, source })

  } catch (e: any) {
    console.error('Catch error:', e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}