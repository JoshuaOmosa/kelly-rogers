'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Lead = { id: string; name: string; email: string; phone: string; message: string; created_at: string }

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!document.cookie.includes('dashboard_auth=true')) {
      window.location.href = '/dashboard/login'
      return
    }
    supabase.from('leads').select('*').order('created_at', {ascending:false}).then(({data})=>{
      if(data) setLeads(data as Lead[])
      setLoading(false)
    })
  }, [])

  if (loading) return <div style={{padding:50}}>Loading...</div>

  return (
    <div style={{padding:20, maxWidth:1100, margin:'auto', fontFamily:'sans-serif'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1>Kelly Rogers - {leads.length} leads</h1>
        <button onClick={()=>{document.cookie="dashboard_auth=; path=/; max-age=0"; window.location.href='/dashboard/login'}} style={{padding:'8px 14px'}}>Logout</button>
      </div>

      <div style={{overflowX:'auto'}}>
      <table style={{width:'100%', borderCollapse:'collapse', marginTop:20}}>
        <thead>
          <tr style={{background:'#f5f5f5'}}>
            <th style={{border:'1px solid #ccc', padding:10, textAlign:'left'}}>Date / Time</th>
            <th style={{border:'1px solid #ccc', padding:10}}>Name</th>
            <th style={{border:'1px solid #ccc', padding:10}}>Email</th>
            <th style={{border:'1px solid #ccc', padding:10}}>Phone</th>
            <th style={{border:'1px solid #ccc', padding:10, textAlign:'left'}}>Message</th>
          </tr>
        </thead>
        <tbody>
          {leads.map(l=>(
            <tr key={l.id}>
              <td style={{border:'1px solid #ccc', padding:10, whiteSpace:'nowrap'}}>{new Date(l.created_at).toLocaleString()}</td>
              <td style={{border:'1px solid #ccc', padding:10}}>{l.name}</td>
              <td style={{border:'1px solid #ccc', padding:10}}>{l.email}</td>
              <td style={{border:'1px solid #ccc', padding:10}}>{l.phone}</td>
              <td style={{border:'1px solid #ccc', padding:10}}>{l.message || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {leads.length===0 && <p style={{textAlign:'center', marginTop:20}}>No leads yet</p>}
    </div>
  )
}