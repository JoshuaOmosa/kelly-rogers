import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import crypto from 'crypto'

export async function POST(req: Request) {
  const body = await req.text()
  const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY!).update(body).digest('hex')
  if(hash !== req.headers.get('x-paystack-signature')) return NextResponse.json({error:'invalid'}, {status:401})

  const event = JSON.parse(body)
  if(event.event === 'charge.success'){
    const leadId = event.data.metadata.lead_id
    await supabaseAdmin.from('leads').update({
      status: 'Complete',
      payment_status: 'paid',
      last_contacted_at: new Date().toISOString()
    }).eq('id', leadId)
  }
  return NextResponse.json({ ok:true })
}