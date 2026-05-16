-- ============================================================================
-- DeFi Platform - Supabase Schema Initialization
-- ============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "http";

-- ============================================================================
-- TABLES
-- ============================================================================

-- User Profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  wallet_solana TEXT UNIQUE,
  wallet_ethereum TEXT UNIQUE,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Staking Plans (platform configuration)
CREATE TABLE IF NOT EXISTS public.staking_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  apy DECIMAL(10, 2) NOT NULL,
  min_amount DECIMAL(20, 8) NOT NULL DEFAULT 0.01,
  max_amount DECIMAL(20, 8),
  lockup_period_days INTEGER NOT NULL,
  risk_level TEXT DEFAULT 'low' CHECK (risk_level IN ('low', 'medium', 'high')),
  features JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Staking Positions
CREATE TABLE IF NOT EXISTS public.staking_positions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.user_profiles ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.staking_plans ON DELETE CASCADE,
  amount DECIMAL(20, 8) NOT NULL,
  earned_rewards DECIMAL(20, 8) DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'unlocking', 'withdrawn')),
  staked_at TIMESTAMPTZ DEFAULT NOW(),
  unlock_at TIMESTAMPTZ NOT NULL,
  withdrawn_at TIMESTAMPTZ,
  transaction_hash TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, plan_id, staked_at)
);

-- Wallet Balances (cached, updated via API)
CREATE TABLE IF NOT EXISTS public.wallet_balances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.user_profiles ON DELETE CASCADE,
  network TEXT NOT NULL CHECK (network IN ('solana', 'ethereum')),
  asset TEXT NOT NULL,
  amount DECIMAL(20, 8) NOT NULL DEFAULT 0,
  usd_value DECIMAL(20, 2) NOT NULL DEFAULT 0,
  last_synced TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, network, asset)
);

-- Portfolio Summary
CREATE TABLE IF NOT EXISTS public.portfolio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.user_profiles ON DELETE CASCADE,
  total_value DECIMAL(20, 2) NOT NULL DEFAULT 0,
  total_invested DECIMAL(20, 2) NOT NULL DEFAULT 0,
  total_earned DECIMAL(20, 2) NOT NULL DEFAULT 0,
  total_staked DECIMAL(20, 2) NOT NULL DEFAULT 0,
  allocation JSONB DEFAULT '[]'::jsonb,
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deposits
CREATE TABLE IF NOT EXISTS public.deposits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.user_profiles ON DELETE CASCADE,
  amount DECIMAL(20, 8) NOT NULL,
  asset TEXT NOT NULL,
  network TEXT NOT NULL CHECK (network IN ('solana', 'ethereum')),
  wallet_address TEXT NOT NULL,
  transaction_hash TEXT UNIQUE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed', 'cancelled')),
  confirmations INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Withdrawals
CREATE TABLE IF NOT EXISTS public.withdrawals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.user_profiles ON DELETE CASCADE,
  amount DECIMAL(20, 8) NOT NULL,
  asset TEXT NOT NULL,
  network TEXT NOT NULL CHECK (network IN ('solana', 'ethereum')),
  to_wallet_address TEXT NOT NULL,
  transaction_hash TEXT UNIQUE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  fee DECIMAL(20, 8) DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions (all types)
CREATE TABLE IF NOT EXISTS public.transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.user_profiles ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'stake', 'unstake', 'claim_reward', 'swap')),
  amount DECIMAL(20, 8) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  transaction_hash TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rewards
CREATE TABLE IF NOT EXISTS public.rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.user_profiles ON DELETE CASCADE,
  staking_position_id UUID REFERENCES public.staking_positions ON DELETE SET NULL,
  amount DECIMAL(20, 8) NOT NULL,
  reward_type TEXT DEFAULT 'staking' CHECK (reward_type IN ('staking', 'referral', 'trading', 'bonus')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'claimed', 'distributed')),
  claimed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Swap Transactions
CREATE TABLE IF NOT EXISTS public.swap_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.user_profiles ON DELETE CASCADE,
  from_token TEXT NOT NULL,
  to_token TEXT NOT NULL,
  from_amount DECIMAL(20, 8) NOT NULL,
  to_amount DECIMAL(20, 8) NOT NULL,
  rate DECIMAL(20, 8) NOT NULL,
  slippage DECIMAL(5, 2) DEFAULT 0,
  fee DECIMAL(20, 8) DEFAULT 0,
  transaction_hash TEXT UNIQUE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Referrals
CREATE TABLE IF NOT EXISTS public.referral_program (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES public.user_profiles ON DELETE CASCADE,
  referral_code TEXT UNIQUE NOT NULL,
  tier TEXT DEFAULT 'bronze' CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  referrals_count INTEGER DEFAULT 0,
  total_earned DECIMAL(20, 2) DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Referral Relationships
CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID NOT NULL REFERENCES public.user_profiles ON DELETE CASCADE,
  referee_id UUID NOT NULL UNIQUE REFERENCES public.user_profiles ON DELETE CASCADE,
  reward DECIMAL(20, 2) NOT NULL DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.user_profiles ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('stake', 'reward', 'swap', 'deposit', 'withdrawal', 'alert')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staking_positions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deposits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.swap_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referral_program ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- User profiles: users can only view/edit their own profile
CREATE POLICY "Users can view their own profile" 
  ON public.user_profiles FOR SELECT
  USING (auth.uid() = id OR role = 'admin');

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Staking plans: anyone can view active plans
CREATE POLICY "Anyone can view active staking plans"
  ON public.staking_plans FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admins can manage staking plans"
  ON public.staking_plans FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.user_profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Staking positions: users can only view/manage their own
CREATE POLICY "Users can view own staking positions"
  ON public.staking_positions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert staking positions"
  ON public.staking_positions FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own staking positions"
  ON public.staking_positions FOR UPDATE
  USING (user_id = auth.uid());

-- Wallet balances: users can only view their own
CREATE POLICY "Users can view own wallet balances"
  ON public.wallet_balances FOR SELECT
  USING (user_id = auth.uid());

-- Portfolio: users can only view their own
CREATE POLICY "Users can view own portfolio"
  ON public.portfolio FOR SELECT
  USING (user_id = auth.uid());

-- Deposits: users can view/create their own
CREATE POLICY "Users can view own deposits"
  ON public.deposits FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create deposits"
  ON public.deposits FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Withdrawals: users can view/create their own
CREATE POLICY "Users can view own withdrawals"
  ON public.withdrawals FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create withdrawals"
  ON public.withdrawals FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Transactions: users can view their own
CREATE POLICY "Users can view own transactions"
  ON public.transactions FOR SELECT
  USING (user_id = auth.uid());

-- Rewards: users can view their own
CREATE POLICY "Users can view own rewards"
  ON public.rewards FOR SELECT
  USING (user_id = auth.uid());

-- Swap transactions: users can view/create their own
CREATE POLICY "Users can view own swaps"
  ON public.swap_transactions FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can create swaps"
  ON public.swap_transactions FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Referrals: users can view their own
CREATE POLICY "Users can view own referral program"
  ON public.referral_program FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can view own referrals"
  ON public.referrals FOR SELECT
  USING (referrer_id = auth.uid() OR referee_id = auth.uid());

-- Notifications: users can view their own
CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (user_id = auth.uid());

-- ============================================================================
-- INDEXES (for performance)
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_staking_positions_user_id ON public.staking_positions(user_id);
CREATE INDEX IF NOT EXISTS idx_staking_positions_status ON public.staking_positions(status);
CREATE INDEX IF NOT EXISTS idx_wallet_balances_user_id ON public.wallet_balances(user_id);
CREATE INDEX IF NOT EXISTS idx_deposits_user_id ON public.deposits(user_id);
CREATE INDEX IF NOT EXISTS idx_deposits_status ON public.deposits(status);
CREATE INDEX IF NOT EXISTS idx_withdrawals_user_id ON public.withdrawals(user_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_status ON public.withdrawals(status);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON public.transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON public.transactions(type);
CREATE INDEX IF NOT EXISTS idx_rewards_user_id ON public.rewards(user_id);
CREATE INDEX IF NOT EXISTS idx_swap_transactions_user_id ON public.swap_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON public.notifications(read);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON public.referrals(referrer_id);

-- ============================================================================
-- SAMPLE DATA (staking plans)
-- ============================================================================

INSERT INTO public.staking_plans (name, description, apy, min_amount, lockup_period_days, risk_level, features)
VALUES
  (
    'Starter Plan',
    'Perfect for newcomers to DeFi staking',
    8.5,
    0.1,
    30,
    'low',
    '["Flexible withdrawal", "Daily rewards", "Beginner friendly"]'
  ),
  (
    'Premium Plan',
    'Enhanced rewards for serious investors',
    12.5,
    1.0,
    90,
    'medium',
    '["Higher APY", "Priority support", "Compounding rewards"]'
  ),
  (
    'Elite Plan',
    'Maximum returns with strategic lockup',
    18.5,
    10.0,
    180,
    'high',
    '["Maximum APY", "VIP benefits", "Exclusive strategies"]'
  ),
  (
    'Institutional Plan',
    'Custom terms for institutional investors',
    22.0,
    100.0,
    365,
    'high',
    '["Custom APY", "Dedicated manager", "Multi-sig security"]'
  );
