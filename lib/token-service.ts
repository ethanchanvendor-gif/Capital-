import { Token } from '@/types'

export const TOKENS: Token[] = [
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    logo: '🔵',
    price: 1.0,
    change24h: 0,
  },
  {
    id: 'usdt',
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    logo: '🟢',
    price: 1.0,
    change24h: 0,
  },
  {
    id: 'dai',
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    decimals: 18,
    logo: '⚪',
    price: 1.0,
    change24h: 0,
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
    logo: '💠',
    price: 2450.5,
    change24h: 3.2,
  },
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin',
    decimals: 8,
    logo: '🟧',
    price: 62500.0,
    change24h: 2.8,
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    decimals: 9,
    logo: '⬛',
    price: 145.75,
    change24h: 4.1,
  },
  {
    id: 'ada',
    symbol: 'ADA',
    name: 'Cardano',
    decimals: 6,
    logo: '🔴',
    price: 0.98,
    change24h: 1.5,
  },
  {
    id: 'xrp',
    symbol: 'XRP',
    name: 'Ripple',
    decimals: 6,
    logo: '🔘',
    price: 2.15,
    change24h: 0.8,
  },
  {
    id: 'avax',
    symbol: 'AVAX',
    name: 'Avalanche',
    decimals: 18,
    logo: '❄️',
    price: 38.45,
    change24h: 2.3,
  },
  {
    id: 'matic',
    symbol: 'MATIC',
    name: 'Polygon',
    decimals: 18,
    logo: '🟣',
    price: 0.92,
    change24h: 1.2,
  },
]

export function getToken(id: string): Token | undefined {
  return TOKENS.find(t => t.id === id)
}

export function searchTokens(query: string): Token[] {
  const q = query.toLowerCase()
  return TOKENS.filter(t => 
    t.symbol.toLowerCase().includes(q) || 
    t.name.toLowerCase().includes(q)
  )
}

export function formatTokenAmount(amount: number, decimals: number): string {
  return (amount / Math.pow(10, decimals)).toFixed(4)
}
