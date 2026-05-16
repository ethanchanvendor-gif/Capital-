// User and Auth Types
export interface User {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  wallet_address: string | null
  created_at: string
  updated_at: string
}

export interface AuthSession {
  user: User | null
  isLoading: boolean
  error: string | null
}

// Token Types
export interface Token {
  id: string
  symbol: string
  name: string
  decimals: number
  logo: string
  price: number
  change24h: number
}

// Wallet Types
export interface WalletInfo {
  address: string
  network: 'solana' | 'ethereum'
  balance: number
  type: 'phantom' | 'metamask' | 'other'
}

// Staking Types
export interface StakingPlan {
  id: string
  name: string
  description: string
  apy: number
  lockup_period_days: number
  min_amount: number
  max_amount: number | null
  risk_level: 'low' | 'medium' | 'high'
  features?: string[]
}

export interface StakingPosition {
  id: string
  user_id: string
  plan_id: string
  amount: number
  staked_at: string
  unlock_at: string
  earned_rewards: number
  status: 'active' | 'unlocking' | 'completed'
  created_at: string
}

// Portfolio Types
export interface Portfolio {
  id: string
  user_id: string
  total_value: number
  total_invested: number
  total_earned: number
  allocation: TokenAllocation[]
  created_at: string
  updated_at: string
}

export interface TokenAllocation {
  symbol: string
  amount: number
  value: number
  percentage: number
  price: number
}

// Swap Types
export interface SwapQuote {
  inputMint: string
  outputMint: string
  inAmount: number
  outAmount: number
  priceImpact: number
  route: string[]
  fee: number
}

export interface SwapTransaction {
  id: string
  user_id: string
  from_token: string
  to_token: string
  from_amount: number
  to_amount: number
  rate: number
  transaction_hash: string
  status: 'pending' | 'completed' | 'failed'
  created_at: string
}

// Analytics Types
export interface TVLData {
  date: string
  tvl: number
  users: number
}

export interface APYData {
  plan_id: string
  current_apy: number
  historical: Array<{
    date: string
    apy: number
  }>
}

// Rewards Types
export interface Reward {
  id: string
  user_id: string
  amount: number
  type: 'staking' | 'referral' | 'trading'
  status: 'pending' | 'claimed' | 'distributed'
  claimed_at: string | null
  created_at: string
}

// Referral Types
export interface ReferralProgram {
  id: string
  user_id: string
  referral_code: string
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
  referrals_count: number
  total_earned: number
  created_at: string
}

// Admin Types
export interface AdminUser {
  id: string
  email: string
  role: 'admin' | 'moderator' | 'analyst'
  permissions: string[]
  created_at: string
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Event Types
export interface Transaction {
  id: string
  user_id: string
  type: 'staking' | 'unstaking' | 'swap' | 'reward'
  amount: number
  status: 'pending' | 'completed' | 'failed'
  transaction_hash?: string
  created_at: string
}

export interface Notification {
  id: string
  user_id: string
  type: 'stake' | 'reward' | 'swap' | 'alert'
  title: string
  message: string
  read: boolean
  action_url?: string
  created_at: string
}
