'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [pw, setPw] = useState('')
  const router = useRouter()
  
  const login = () => {
    if (pw === 'Kelly2026!') {
      document.cookie = "dashboard_auth=true; path=/; max-age=86400"
      router.push('/dashboard')
    } else {
      alert('Wrong password')
    }
  }

  return (
    <div style={{padding:50, maxWidth:400, margin:'100px auto'}}>
      <h2>Kelly Dashboard Login</h2>
      <input 
        type="password" 
        value={pw} 
        onChange={e=>setPw(e.target.value)} 
        placeholder="Password" 
        style={{width:'100%', padding:10, marginTop:20}} 
      />
      <button onClick={login} style={{width:'100%', padding:10, marginTop:10, background:'black', color:'white', cursor:'pointer'}}>
        Login
      </button>
    </div>
  )
}