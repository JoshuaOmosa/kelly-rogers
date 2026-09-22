'use client'
import { useParams, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function PayPage(){
  const { id } = useParams()
  const searchParams = useSearchParams()
  const [lead, setLead] = useState<any>(null)
  const [choice, setChoice] = useState<string | null>(null)
  const [provider, setProvider] = useState("")
  const [memberId, setMemberId] = useState("")
  const [sent, setSent] = useState(false)

  useEffect(()=>{
    setChoice(searchParams.get('choice'))
    fetch(`/api/leads?id=${id}`).then(r=>r.json()).then(d=> setLead(d[0] || d))
  }, [id, searchParams])

  const submitInsurance = async ()=>{
    if(!provider || !memberId) return alert("Enter provider + Member ID")
    await fetch('/api/quote/insurance', {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ leadId: id, provider, memberId })
    })
    setSent(true)
  }

  const markPaid = async ()=>{
    await fetch('/api/webhook/test-pay', {method:'POST', body: JSON.stringify({leadId:id})})
    alert('Marked as Paid -> Check dashboard')
    window.location.href='/dashboard'
  }

  if(!lead) return <div style={{padding:40, textAlign:'center'}}>Loading your quote...</div>

  return (
    <div style={{maxWidth:600, margin:'40px auto', fontFamily:'Inter, sans-serif', padding:20}}>
      <div style={{background:'white', borderRadius:16, padding:24, border:'1.5px solid #E8DDD0', boxShadow:'0 8px 24px rgba(0,0,0,0.06)'}}>
        <h1 style={{fontFamily:'Canela, serif', margin:0}}>Hi {lead.name}</h1>
        <p>Service: <strong>{lead.service || 'Session'}</strong></p>
        <p style={{fontSize:22, fontWeight:800}}>Exact Fee: ${lead.quote_amount || lead.exact_price}</p>
        <p style={{fontSize:12, color:'#888'}}>Link: {lead.payment_link}</p>

        {/* CLIENT CHOOSES */}
        {!choice && (
          <div style={{display:'grid', gap:12, marginTop:24}}>
            <h3 style={{margin:0}}>Choose how you want to pay:</h3>
            <button onClick={()=>setChoice('direct')} style={{background:'#111', color:'#fff', padding:14, borderRadius:10, fontWeight:800, border:'none', cursor:'pointer'}}>Option A — Pay ${lead.quote_amount} Direct</button>
            <button onClick={()=>setChoice('insurance')} style={{background:'#4A7C7E', color:'#fff', padding:14, borderRadius:10, fontWeight:800, border:'none', cursor:'pointer'}}>Option B — Use Insurance (Superbill)</button>
          </div>
        )}

        {choice==='direct' && (
          <div style={{marginTop:20, background:'#E0F0E6', padding:16, borderRadius:10, textAlign:'center'}}>
            <h3 style={{marginTop:0}}>Direct Pay</h3>
            {lead.payment_link?.includes('paystack') ? (
              <a href={lead.payment_link} style={{display:'block', background:'#000', color:'#fff', padding:'16px 32px', borderRadius:8, textDecoration:'none', fontWeight:800, marginTop:10}}>Pay with Paystack ${lead.quote_amount}</a>
            ) : (
              <button onClick={markPaid} style={{background:'#000', color:'#fff', padding:'16px 32px', borderRadius:8, border:'none', fontWeight:800, width:'100%', marginTop:10}}>Simulate Payment (Mark Paid) — TEST</button>
            )}
            <button onClick={()=>setChoice(null)} style={{marginTop:12, background:'transparent', border:'none', textDecoration:'underline', cursor:'pointer'}}>Back</button>
          </div>
        )}

        {choice==='insurance' && !sent && (
          <div style={{marginTop:20}}>
            <h3 style={{marginTop:0}}>Option B — Insurance Superbill</h3>
            <p style={{fontSize:13, color:'#555'}}>You pay ${lead.quote_amount} upfront now. We issue Superbill for Aetna / Cigna / BCBS / United for reimbursement.</p>
            <select value={provider} onChange={e=>setProvider(e.target.value)} style={{width:'100%', padding:12, borderRadius:8, border:'1px solid #E8DDD0', marginTop:10}}>
              <option value="">Select Provider</option><option>Aetna</option><option>Cigna</option><option>BlueCross BlueShield</option><option>United Healthcare</option><option>Other</option>
            </select>
            <input value={memberId} onChange={e=>setMemberId(e.target.value)} placeholder="Member ID / Policy #" style={{width:'100%', padding:12, borderRadius:8, border:'1px solid #E8DDD0', marginTop:10}}/>
            <button onClick={submitInsurance} style={{marginTop:12, width:'100%', background:'#4A7C7E', color:'#fff', padding:12, borderRadius:8, fontWeight:800, border:'none', cursor:'pointer'}}>Submit Insurance Info</button>
          </div>
        )}

        {sent && (
          <div style={{marginTop:20, background:'#D6E8FF', padding:16, borderRadius:10, textAlign:'center'}}>
            <strong>✅ Got it!</strong> We received {provider} — {memberId}<br/><br/>
            Now pay to confirm, Kelly will issue your Superbill after.<br/>
            <button onClick={markPaid} style={{background:'#000', color:'#fff', padding:'16px 32px', borderRadius:8, border:'none', fontWeight:800, width:'100%', marginTop:12}}>Pay Now ${lead.quote_amount} & Confirm</button>
          </div>
        )}
      </div>
    </div>
  )
}