import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value: number | string, decimals: number = 2): string {
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return '0.00'
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num)
}

export function formatCurrency(value: number | string, currency: string = 'USD'): string {
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return '$0.00'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(num)
}

export function formatPercent(value: number, decimals: number = 2): string {
  return `${formatNumber(value, decimals)}%`
}

export function shortenAddress(address: string, chars: number = 4): string {
  if (!address) return ''
  if (address.length < chars * 2) return address
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

export function truncateText(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength)}...`
}

export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function isValidWalletAddress(address: string, network: 'solana' | 'ethereum' = 'solana'): boolean {
  if (network === 'ethereum') {
    return /^0x[a-fA-F0-9]{40}$/.test(address)
  }
  // Solana base58 address check (simplified)
  return /^[1-9A-HJ-NP-Z]{43,44}$/.test(address)
}

export function generateRandomString(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function calculateAPY(apr: number, compoundingFrequency: number = 365): number {
  return (Math.pow(1 + apr / 100 / compoundingFrequency, compoundingFrequency) - 1) * 100
}

export function calculateRewards(amount: number, apr: number, days: number): number {
  return (amount * apr * days) / (100 * 365)
}

export function formatTimeAgo(date: Date | string): string {
  const now = new Date()
  const pastDate = typeof date === 'string' ? new Date(date) : date
  const diffMs = now.getTime() - pastDate.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSecs < 60) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`
  return `${Math.floor(diffDays / 30)}mo ago`
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export function getContrastColor(hexColor: string): string {
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 128 ? '#000000' : '#FFFFFF'
}

export function generateGradient(start: string, end: string): string {
  return `linear-gradient(135deg, ${start}, ${end})`
}
