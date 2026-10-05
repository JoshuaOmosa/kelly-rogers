import { NextResponse } from 'next/server'
import { createSessionToken, safeEqual, SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/auth'

export async function POST(req: Request) {
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminEmail || !adminPassword || !process.env.SESSION_SECRET) {
    return NextResponse.json({ error: 'Admin login is not configured' }, { status: 500 })
  }

  const { email, password } = await req.json().catch(() => ({}))
  if (typeof email !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  // Check both fields before deciding so a wrong email and a wrong password
  // take the same path.
  const emailOk = safeEqual(email.trim().toLowerCase(), adminEmail.trim().toLowerCase())
  const passwordOk = safeEqual(password, adminPassword)
  if (!emailOk || !passwordOk) {
    return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
  return res
}
