import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    let { name, email, phone, message, source } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
    }

    email = email.toLowerCase().trim() // FIX: normalize

    // Use ilike to find case-insensitive match
    const { data: existing } = await supabaseAdmin
      .from('leads')
      .select('id')
      .ilike('email', email)
      .maybeSingle()

    if (existing) {
      const { error } = await supabaseAdmin
        .from('leads')
        .update({
          name,
          phone,
          message,
          status: 'New',
          last_contacted_at: new Date().toISOString(),
        })
        .eq('id', existing.id)
      if (error) throw error
      return NextResponse.json({ ok: true, updated: true, id: existing.id })
    }

    const { data, error } = await supabaseAdmin
      .from('leads')
      .insert([{
        name,
        email, // always save lowercased
        phone,
        message,
        source: source || 'contact_form',
        status: 'New',
      }])
      .select()
      .single()

    if (error) throw error
    return NextResponse.json({ ok: true, id: data.id })

  } catch (e: any) {
    console.error('Contact error:', e.message)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}