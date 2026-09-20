import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    let name = body.name
    let email = body.email
    let phone = body.phone || ""
    let message = body.message || ""
    let source = body.source || "contact_form"

    if (body.payload) {
      const invitee = body.payload
      name = invitee?.name || invitee?.invitee?.name || name
      email = invitee?.email || invitee?.invitee?.email || email
      source = "calendly"
      message = `Calendly Booking: ${invitee?.event || '30min'}`
    }
    if (body.source === 'calendly') {
      source = "calendly"
      message = `Calendly via website: ${body.calendlyLink || ''}`
    }

    if (!name || !email) return NextResponse.json({ error: "Missing name/email" }, { status: 400 })

    const { data, error } = await supabase.from('leads').insert([{
      name, email, phone, message, source,
      status: 'New',
      created_at: new Date().toISOString(),
      last_contacted_at: new Date().toISOString(),
    }]).select()

    if (error) throw error
    return NextResponse.json({ success: true, data })

  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function GET() {
  const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data || [])
}

export async function PATCH(req: Request) {
  const { id, status } = await req.json()
  const { error } = await supabase.from('leads').update({ 
    status, 
    last_contacted_at: new Date().toISOString() 
  }).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
// DELETE LEAD
export async function DELETE(req: Request) {
  const { id } = await req.json();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if(error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}