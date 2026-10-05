import crypto from 'crypto'
import { NextResponse } from 'next/server'

// Admin sessions are a signed, httpOnly cookie: "<expiry>.<hmac>".
// The HMAC uses SESSION_SECRET, so the browser can hold the cookie but
// cannot forge or extend it. Nothing about the session lives in localStorage.

export const SESSION_COOKIE = 'kr_session'
export const SESSION_MAX_AGE = 60 * 60 * 12 // 12 hours, in seconds

function sign(value: string): string {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error('SESSION_SECRET is not set')
  return crypto.createHmac('sha256', secret).update(value).digest('hex')
}

// Constant-time comparison so response timing doesn't leak how much of a
// guess was correct. Hashing first makes both inputs the same length.
export function safeEqual(a: string, b: string): boolean {
  const ha = crypto.createHash('sha256').update(a).digest()
  const hb = crypto.createHash('sha256').update(b).digest()
  return crypto.timingSafeEqual(ha, hb)
}

export function createSessionToken(): string {
  const expires = String(Date.now() + SESSION_MAX_AGE * 1000)
  return `${expires}.${sign(expires)}`
}

function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false
  const [expires, signature] = token.split('.')
  if (!expires || !signature || Number(expires) < Date.now()) return false
  return safeEqual(signature, sign(expires))
}

function readCookie(req: Request, name: string): string | undefined {
  const header = req.headers.get('cookie') || ''
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) return decodeURIComponent(rest.join('='))
  }
  return undefined
}

export function isAdmin(req: Request): boolean {
  try {
    return verifySessionToken(readCookie(req, SESSION_COOKIE))
  } catch {
    // Missing SESSION_SECRET means nobody can be signed in.
    return false
  }
}

export function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
