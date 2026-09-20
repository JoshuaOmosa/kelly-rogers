'use client'
import { useParams } from 'next/navigation'
export default function PayPage(){
  const { id } = useParams()
  return (
    <div style={{maxWidth:500, margin:'80px auto', textAlign:'center'}}>
      <h1>Demo Payment Page</h1>
      <p>This will be replaced by Stripe Checkout</p>
      <button onClick={async()=>{
        await fetch('/api/webhook/test-pay', {method:'POST', body: JSON.stringify({leadId:id})})
        alert('Marked as Paid -> Complete. Check dashboard')
        window.location.href='/dashboard'
      }} style={{background:'#000', color:'#fff', padding:'16px 32px', borderRadius:8, marginTop:20}}>
        Simulate Payment (Mark Paid)
      </button>
    </div>
  )
}