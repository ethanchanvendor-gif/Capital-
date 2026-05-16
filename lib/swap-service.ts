import { getToken } from './token-service'

export interface SwapQuote {
  fromToken: string
  toToken: string
  fromAmount: number
  toAmount: number
  priceImpact: number
  fee: number
  minReceived: number
  slippage: number
  timestamp: number
}

export function calculateSwapQuote(
  fromTokenId: string,
  toTokenId: string,
  fromAmount: number,
  slippage: number = 0.5
): SwapQuote {
  const fromToken = getToken(fromTokenId)
  const toToken = getToken(toTokenId)

  if (!fromToken || !toToken) {
    throw new Error('Invalid token')
  }

  // Mock calculation based on token prices
  const fromUSD = (fromAmount / Math.pow(10, fromToken.decimals)) * fromToken.price
  const toAmount = (fromUSD / toToken.price) * Math.pow(10, toToken.decimals)
  
  // Mock price impact (0.1% to 0.5% depending on amount)
  const priceImpact = Math.random() * 0.4 + 0.1

  // Mock fee (0.25%)
  const fee = toAmount * 0.0025

  // Calculate minimum received based on slippage
  const minReceived = toAmount * (1 - slippage / 100)

  return {
    fromToken: fromTokenId,
    toToken: toTokenId,
    fromAmount,
    toAmount: Math.floor(toAmount),
    priceImpact,
    fee: Math.floor(fee),
    minReceived: Math.floor(minReceived),
    slippage,
    timestamp: Date.now(),
  }
}

export function validateSwapAmount(amount: number): { valid: boolean; error?: string } {
  if (amount <= 0) {
    return { valid: false, error: 'Amount must be greater than 0' }
  }
  if (amount > 1000000) {
    return { valid: false, error: 'Amount exceeds maximum limit' }
  }
  return { valid: true }
}

export function formatTokenPrice(price: number): string {
  if (price >= 1) {
    return `$${price.toFixed(2)}`
  }
  return `$${price.toFixed(4)}`
}

export function formatSwapAmount(amount: number, decimals: number): string {
  return (amount / Math.pow(10, decimals)).toFixed(4)
}

export function estimateGasFee(fromTokenId: string, toTokenId: string): number {
  // Mock gas fee estimation in USD
  const baseGas = 5 + Math.random() * 15
  return Math.floor(baseGas * 100) / 100 // Round to 2 decimals
}
