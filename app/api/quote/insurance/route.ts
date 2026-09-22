import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: Request){
  const { leadId, provider, memberId } = await req.json()
  await supabaseAdmin.from('leads').update({
    use_insurance: true,
    insurance_provider: provider,
    insurance_member_id: memberId,
    status: 'Insurance Info Received'
  }).eq('id', leadId)
  return NextResponse.json({ok:true})
}