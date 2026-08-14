import { formatINR, type Product } from './products'
import type { CartItem } from '@/components/store/store-provider'

/**
 * Set your WhatsApp Business (or personal) number here, in international
 * format with country code and no leading +, spaces, or dashes.
 * e.g. 91 90265 51729 -> "919026551729"
 *
 * Prefer setting NEXT_PUBLIC_WHATSAPP_NUMBER as an environment variable in
 * Vercel so you can change it without editing code. This constant is only
 * the fallback used when that env var isn't set.
 */
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919026551729'

/** Builds a wa.me link that opens WhatsApp with a pre-filled, URL-encoded message. */
export function buildWhatsAppLink(message: string, phone: string = WHATSAPP_NUMBER): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

/** Returns the current site origin on the client, or '' during server rendering. */
function getOrigin(): string {
  if (typeof window !== 'undefined') return window.location.origin
  return ''
}

/** "I'm interested in this product" message for the product detail page. */
export function buildProductInquiryMessage(product: Product): string {
  const url = `${getOrigin()}/product/${product.slug}`
  const lines = [
    `Hi! I am interested in buying this product: ${product.title}`,
    '',
    `*${product.title}*`,
    `Brand: ${product.brand}`,
    `Price: ${formatINR(product.price)}`,
    `Link: ${url}`,
  ]
  if (product.image) {
    const imageUrl = product.image.startsWith('http') ? product.image : `${getOrigin()}${product.image}`
    lines.push(`Image: ${imageUrl}`)
  }
  lines.push('', 'Could you please help me place this order?')
  return lines.join('\n')
}

/** Full cart summary message for "Complete Order on WhatsApp" at checkout. */
export function buildCartOrderMessage(params: {
  cart: CartItem[]
  subtotal: number
  shippingLabel: string
  shippingCost: number
  total: number
  contactName?: string
  phone?: string
  address?: string
}): string {
  const { cart, subtotal, shippingLabel, shippingCost, total, contactName, phone, address } = params
  const origin = getOrigin()

  const lines = ['Hi! I would like to place the following order (Cash on Delivery):', '']

  for (const item of cart) {
    const url = `${origin}/product/${item.product.slug}`
    lines.push(
      `\u2022 ${item.product.title} (${item.product.brand})`,
      `  Size: ${item.size} \u00d7 Qty: ${item.qty}`,
      `  Price: ${formatINR(item.product.price * item.qty)}`,
      `  Link: ${url}`,
      '',
    )
  }

  lines.push(
    `Subtotal: ${formatINR(subtotal)}`,
    `Shipping (${shippingLabel}): ${shippingCost === 0 ? 'Free' : formatINR(shippingCost)}`,
    `*Total: ${formatINR(total)}*`,
    '',
  )

  if (contactName || phone || address) {
    lines.push('Delivery Details:')
    if (contactName) lines.push(`Name: ${contactName}`)
    if (phone) lines.push(`Phone: ${phone}`)
    if (address) lines.push(`Address: ${address}`)
    lines.push('')
  }

  lines.push('Please confirm my order. I will pay via Cash on Delivery.')
  return lines.join('\n')
}

/** Generic "I have a question" message for the footer's general support link. */
export function buildGeneralInquiryMessage(): string {
  return "Hi! I have a question about The Bombay Outfit \u2014 could you help me out?"
}
