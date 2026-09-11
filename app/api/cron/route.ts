import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { Resend } from 'resend'
const resend = new Resend(process.env.RESEND_API_KEY || 'dummy_key_for_build')
export async function GET() {
  if (!process.env.RESEND_API_KEY) {
  return NextResponse.json({ ok: true, message: 'Skipped - no RESEND key set' })
}
  const { data: leads } = await supabaseAdmin.from('leads').select('*').eq('status','new').limit(5)
  if (!leads || leads.length===0) return NextResponse.json({ message: 'No new leads' })
  return NextResponse.json({ found: leads.length, leads })
}