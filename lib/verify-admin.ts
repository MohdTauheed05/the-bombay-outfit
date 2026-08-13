import { adminAuth } from './firebase-admin'

/**
 * Verifies the Authorization: Bearer <idToken> header on an admin API
 * request. Returns the decoded token (with uid, email) if valid, or null
 * if missing/invalid/expired. Every admin write route must call this
 * before touching Firestore — this is what actually protects your data,
 * not the admin UI's client-side redirect.
 */
export async function verifyAdminRequest(request: Request) {
  const authHeader = request.headers.get('authorization') || ''
  const match = authHeader.match(/^Bearer (.+)$/)
  if (!match) return null

  try {
    return await adminAuth.verifyIdToken(match[1])
  } catch {
    return null
  }
}
