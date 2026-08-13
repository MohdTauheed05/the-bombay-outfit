import { initializeApp, getApps, getApp, cert, type App } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getAuth } from 'firebase-admin/auth'

// SERVER-ONLY. Never import this file from a 'use client' component.
// Requires FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
// (from your Firebase service account JSON) set as environment variables in
// Vercel. These are secrets — do NOT prefix them with NEXT_PUBLIC_.
function getAdminApp(): App {
  if (getApps().length) return getApp()

  const projectId = process.env.FIREBASE_PROJECT_ID
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
  // Vercel env vars store literal "\n" — convert back to real newlines.
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin credentials. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY in your environment.',
    )
  }

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  })
}

export const adminDb = getFirestore(getAdminApp())
export const adminAuth = getAuth(getAdminApp())
