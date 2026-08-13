# Admin Panel Setup — Firebase + Vercel

## 1. Create a Firebase project
1. Go to https://console.firebase.google.com → **Add project** → follow the prompts.
2. In the project, go to **Build → Firestore Database → Create database**. Start in **production mode** (the rules file below locks it down properly).
3. Go to **Build → Authentication → Get started → Sign-in method → Email/Password → Enable**.
4. Go to **Authentication → Users → Add user**. This email + password is your admin login at `/admin/login`.

## 2. Get your client config (public, safe to expose)
1. In Firebase console: **Project settings (gear icon) → General → Your apps → Add app → Web (`</>`)**.
2. Copy the `firebaseConfig` values. In Vercel → your project → **Settings → Environment Variables**, add:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `apiKey` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `authDomain` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `projectId` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `storageBucket` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `messagingSenderId` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `appId` |

## 3. Get your admin (service account) credentials — SECRET, never expose these
1. In Firebase console: **Project settings → Service accounts → Generate new private key**. This downloads a JSON file.
2. From that JSON, add these to Vercel (do **not** prefix with `NEXT_PUBLIC_`):

| Variable | Value (from the JSON file) |
|---|---|
| `FIREBASE_PROJECT_ID` | `project_id` |
| `FIREBASE_CLIENT_EMAIL` | `client_email` |
| `FIREBASE_PRIVATE_KEY` | `private_key` (paste exactly as-is, including `-----BEGIN PRIVATE KEY-----`) |

Vercel's env var UI supports multi-line values — paste the whole key including the header/footer lines. The code already handles the `\n` escaping either way.

## 4. Apply the Firestore Security Rules
1. In Firebase console: **Firestore Database → Rules**.
2. Replace the contents with what's in `firestore.rules` in this project.
3. Click **Publish**.

This makes the `products` collection publicly readable (needed for the storefront) but blocks all direct writes from the browser — writes only happen through the `/api/admin/*` routes, authenticated with the service account.

## 5. Deploy and seed
1. Push this code to GitHub, let Vercel redeploy (it'll pick up the new env vars automatically on redeploy — trigger one manually if it doesn't).
2. Visit `yoursite.com/admin/login`, sign in with the user you created in step 1.
3. On the dashboard, click **Seed Starter Catalog** once — this copies your existing product list into Firestore.
4. Add/edit/delete products from there. Changes appear on the live storefront immediately (no redeploy needed — it reads Firestore directly).

## Notes
- Only create Firebase Auth users for people you trust with full catalog control — anyone who can sign in at `/admin/login` can add, edit, or delete any product.
- The "Seed Starter Catalog" button only works once — it refuses to run if products already exist in Firestore, to avoid duplicating your catalog.
