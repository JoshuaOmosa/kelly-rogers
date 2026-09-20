import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
export async function POST(req: Request){
  const { leadId } = await req.json()
  await supabaseAdmin.from('leads').update({ status:'Complete', payment_status:'paid', last_contacted_at: new Date().toISOString() }).eq('id', leadId)
  return NextResponse.json({ok:true})
}