'use client'

import { useState, type FormEvent } from 'react'
import { Mail, Phone, Clock, MapPin, CheckCircle2, Send } from 'lucide-react'
import { SiteShell } from '@/components/layout/site-shell'

type FormState = { name: string; email: string; subject: string; message: string }
type FormErrors = Partial<Record<keyof FormState, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name.'
  if (!form.email.trim()) errors.email = 'Please enter your email.'
  else if (!EMAIL_RE.test(form.email)) errors.email = 'Enter a valid email address.'
  if (!form.subject.trim()) errors.subject = 'Please select or enter a subject.'
  if (!form.message.trim()) errors.message = 'Please add a short message.'
  else if (form.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.'
  return errors
}

const CONTACT_METADATA = [
  { icon: Mail, label: 'Email', value: 'concierge@thebombayoutfit.com', href: 'mailto:concierge@thebombayoutfit.com' },
  { icon: Phone, label: 'Phone', value: '+91 22 4567 8900', href: 'tel:+912245678900' },
  { icon: Clock, label: 'Operating Hours', value: 'Mon \u2013 Sat, 10:00 AM \u2013 8:00 PM IST' },
  { icon: MapPin, label: 'Flagship Boutique', value: 'Colaba Causeway, Mumbai, Maharashtra 400001' },
]

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    }
  }

  return (
    <SiteShell>
      <div className="mx-auto max-w-[1600px] px-5 py-12 lg:px-8 lg:py-20">
        <div className="mb-12 max-w-2xl">
          <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.24em] text-gold">Get in Touch</p>
          <h1 className="font-serif text-3xl font-bold leading-tight sm:text-4xl">Contact Concierge</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Questions about an order, a fitting, or a piece from the collection? Our concierge team typically
            responds within one business day.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_420px]">
          {/* Form */}
          <div>
            {submitted && (
              <div className="mb-6 flex items-start gap-3 border border-gold/40 bg-gold/10 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <p className="text-sm">
                  Thank you \u2014 your message has been sent. Our concierge team will be in touch shortly.
                </p>
              </div>
            )}
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    Name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your full name"
                    className="w-full border border-border bg-background px-3.5 py-3 text-sm outline-none focus:border-primary"
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-border bg-background px-3.5 py-3 text-sm outline-none focus:border-primary"
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-destructive">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  Subject
                </label>
                <select
                  value={form.subject}
                  onChange={(e) => handleChange('subject', e.target.value)}
                  className="w-full border border-border bg-background px-3.5 py-3 text-sm outline-none focus:border-primary"
                >
                  <option value="">Select a subject</option>
                  <option value="Order Enquiry">Order Enquiry</option>
                  <option value="Returns & Exchanges">Returns &amp; Exchanges</option>
                  <option value="Product Question">Product Question</option>
                  <option value="Personal Styling">Personal Styling</option>
                  <option value="Other">Other</option>
                </select>
                {errors.subject && <p className="mt-1.5 text-xs text-destructive">{errors.subject}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  placeholder="How can we help?"
                  rows={6}
                  className="w-full resize-none border border-border bg-background px-3.5 py-3 text-sm outline-none focus:border-primary"
                />
                {errors.message && <p className="mt-1.5 text-xs text-destructive">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-primary px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary-foreground transition-opacity hover:opacity-90"
              >
                Send Message <Send className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            </form>
          </div>

          {/* Metadata + map */}
          <div className="space-y-6">
            <div className="border border-border p-6">
              <h2 className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em]">Reach Us Directly</h2>
              <ul className="space-y-5">
                {CONTACT_METADATA.map((item) => (
                  <li key={item.label} className="flex items-start gap-3">
                    <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} className="mt-0.5 block text-sm transition-colors hover:text-gold">
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive map placeholder */}
            <div className="group relative aspect-[4/3] overflow-hidden border border-border bg-secondary">
              <div
                className="absolute inset-0 opacity-60 transition-opacity group-hover:opacity-80"
                style={{
                  backgroundImage:
                    'linear-gradient(to right, var(--color-border) 1px, transparent 1px), linear-gradient(to bottom, var(--color-border) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)]">
                  <MapPin className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <p className="mt-1 text-sm font-medium">The Bombay Outfit Flagship</p>
                <p className="max-w-[220px] text-xs text-muted-foreground">
                  Colaba Causeway, Mumbai, Maharashtra 400001
                </p>
                <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold underline underline-offset-4">
                  Get Directions
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteShell>
  )
}
