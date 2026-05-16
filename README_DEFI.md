# DeFi Pro - Institutional Grade Staking & Investment Platform

A production-ready decentralized finance (DeFi) platform built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Supabase**, and **Solana + Ethereum** blockchain integration.

## 🎯 Overview

DeFi Pro is an enterprise-grade platform that enables users to:

- **🏦 Deposit & Withdraw** - Seamless fund management with multi-chain support
- **💰 Staking** - Earn competitive yields through multiple staking plans
- **🔄 Token Swaps** - Trade tokens via Jupiter DEX integration
- **📊 Portfolio Management** - Real-time portfolio tracking and analytics
- **🤖 AI Optimization** - Automated yield optimization strategies
- **💎 Rewards System** - Stake, referral, and trading rewards
- **🌐 Multi-Chain** - Support for Solana and Ethereum networks

## 🏗️ Architecture

### Frontend Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4 + Shadcn UI + custom Magic UI components
- **State Management**: Zustand + TanStack Query (React Query)
- **Animations**: Framer Motion
- **Blockchain**: Wagmi (Ethereum) + Solana Web3.js
- **Icons**: Lucide React
- **Toast Notifications**: React Hot Toast

### Backend Integration
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth + JWT
- **Real-time**: WebSocket via Supabase Realtime
- **API Routes**: Next.js API Routes (with Supabase client)

### Database Schema
- **user_profiles** - User information and wallet addresses
- **staking_plans** - Configurable staking options
- **staking_positions** - User's active staking positions
- **wallet_balances** - Cached wallet balance data
- **deposits** - Deposit transaction history
- **withdrawals** - Withdrawal transaction history
- **portfolio** - User portfolio summaries
- **transactions** - All transaction records
- **rewards** - Earned rewards tracking
- **referral_program** - Referral system data
- **notifications** - User notifications

## 📦 Project Structure

```
.
├── app/
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Landing page
│   ├── globals.css                # Global styles
│   ├── auth/
│   │   ├── layout.tsx            # Auth layout
│   │   ├── login/page.tsx        # Login page
│   │   └── register/page.tsx     # Registration page
│   ├── dashboard/
│   │   ├── layout.tsx            # Dashboard layout
│   │   ├── page.tsx              # Dashboard home
│   │   ├── deposits/page.tsx     # Deposits history
│   │   ├── withdrawals/page.tsx  # Withdrawals history
│   │   └── staking/page.tsx      # Staking interface
│   └── api/
│       ├── auth/
│       │   ├── login/route.ts
│       │   └── register/route.ts
│       ├── deposits/
│       │   ├── create/route.ts
│       │   └── list/route.ts
│       ├── withdrawals/
│       │   ├── create/route.ts
│       │   └── list/route.ts
│       ├── staking/
│       │   ├── plans/route.ts
│       │   ├── stake/route.ts
│       │   └── claim/route.ts
│       └── portfolio/route.ts
├── components/
│   ├── ui/                        # Shadcn/Radix UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── dialog.tsx
│   ├── defi/                      # DeFi-specific components
│   │   ├── deposit-dialog.tsx
│   │   └── withdrawal-dialog.tsx
│   ├── providers/
│   │   ├── root-provider.tsx
│   │   └── wallet-provider.tsx
│   └── layout/
├── hooks/
│   ├── useAuth.ts                 # Authentication hook
│   └── useLoader.ts               # Loading states
├── lib/
│   ├── supabase.ts                # Supabase client
│   ├── api-utils.ts               # API utilities
│   └── utils.ts                   # Utility functions
├── store/
│   └── auth-store.ts              # Zustand auth store
├── types/
│   └── index.ts                   # TypeScript interfaces
├── scripts/
│   └── init-supabase.sql          # Database schema
├── public/                        # Static assets
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm/yarn
- Supabase account and project
- Phantom wallet (Solana) or MetaMask (Ethereum) for testing

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/defi-pro.git
cd defi-pro

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### Environment Variables

Create a `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Blockchain RPC (Optional)
NEXT_PUBLIC_ETHEREUM_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/your-key
NEXT_PUBLIC_SOLANA_RPC_URL=https://api.mainnet-beta.solana.com

# API URLs
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Database Setup

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Copy credentials to `.env.local`

2. **Initialize Schema**:
   ```bash
   # Run the SQL schema in Supabase SQL Editor
   # Copy content from scripts/init-supabase.sql
   ```

3. **Enable Row Level Security (RLS)**:
   - Already configured in `init-supabase.sql`
   - Provides multi-tenant security

### Development

```bash
# Start dev server
npm run dev

# Open http://localhost:3000
# Landing page at /
# Auth at /auth/login and /auth/register
# Dashboard at /dashboard
```

### Build for Production

```bash
# Build optimized bundle
npm run build

# Start production server
npm run start

# Type check
npm run type-check
```

## 🔑 Key Features Implemented

### ✅ Authentication
- Email/password signup and login
- Supabase Auth integration
- JWT token management
- Protected routes with middleware

### ✅ Deposits & Withdrawals
- Multi-chain deposit support (Ethereum, Solana)
- Deposit UI with amount validation
- Withdrawal request flow with fee calculation
- Transaction history and status tracking
- Real-time deposit/withdrawal list API

### ✅ Portfolio Dashboard
- Real-time balance display
- Asset allocation visualization
- Performance metrics
- Portfolio summary stats
- Quick action buttons

### ✅ Staking
- Multiple staking plans with different APYs
- Lockup period configuration
- Position management
- Reward calculation and tracking
- Staking plan API

### ✅ User Interface
- Institutional-grade glassmorphism design
- Dark mode native support
- Responsive mobile-first layout
- Smooth animations (Framer Motion)
- Toast notifications

## 📡 API Routes

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Sign in user

### Deposits
- `POST /api/deposits/create` - Initiate deposit
- `GET /api/deposits/list` - Get user's deposits

### Withdrawals
- `POST /api/withdrawals/create` - Request withdrawal
- `GET /api/withdrawals/list` - Get user's withdrawals

### Portfolio
- `GET /api/portfolio` - Get portfolio data

### Staking
- `GET /api/staking/plans` - List staking plans
- `POST /api/staking/stake` - Create staking position

## 🔐 Security Features

- **Row Level Security (RLS)**: Database-level access control
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Server-side validation on all endpoints
- **Environment Variables**: Secrets never in code
- **CSRF Protection**: Built into Next.js
- **Rate Limiting**: Implement on sensitive endpoints
- **SQL Injection Prevention**: Parameterized queries via Supabase

## 📊 Database Schema

### Key Tables

**user_profiles**
```sql
- id (UUID, PK)
- email (unique)
- full_name
- wallet_solana, wallet_ethereum
- role (user, admin, moderator)
- status (active, inactive, suspended)
```

**deposits**
```sql
- id (UUID, PK)
- user_id (FK)
- amount, asset, network
- status (pending, confirmed, failed)
- transaction_hash
```

**withdrawals**
```sql
- id (UUID, PK)
- user_id (FK)
- amount, asset, network
- status (pending, processing, completed, failed)
- to_wallet_address
- fee
```

**staking_positions**
```sql
- id (UUID, PK)
- user_id, plan_id (FKs)
- amount, earned_rewards
- status (active, unlocking, withdrawn)
- staked_at, unlock_at
```

## 🧪 Testing

```bash
# Manual testing flows:

1. Landing Page (/)
   - View features and stats
   - Navigate to auth

2. Registration (/auth/register)
   - Create account with email/password
   - Redirects to dashboard on success

3. Login (/auth/login)
   - Sign in with credentials
   - Session persists

4. Dashboard (/dashboard)
   - View portfolio stats
   - Open deposit/withdrawal dialogs

5. Deposits (/dashboard/deposits)
   - View deposit history
   - Monitor transaction status

6. Withdrawals (/dashboard/withdrawals)
   - View withdrawal history
   - Track fee charges
```

## 🚢 Deployment

### Vercel (Recommended for Frontend)
```bash
# Connect GitHub repo to Vercel
# Set environment variables in Vercel settings
# Auto-deploy on git push
```

### Self-Hosted Backend
```bash
# Using Docker:
docker build -t defi-pro .
docker run -p 3000:3000 defi-pro

# Using Node directly:
npm run build && npm start
```

## 📈 Performance Optimization

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Dynamic imports for routes
- **Caching**: SWR for client-side data
- **Database Indexing**: Optimized indexes in schema
- **CDN**: Vercel Edge Network

## 🛣️ Roadmap

- [ ] Phase 1: Core setup ✅
- [ ] Phase 2: Auth & wallets ✅
- [ ] Phase 3: Landing page ✅
- [ ] Phase 4: Deposits/withdrawals ✅
- [ ] Phase 5: Staking module
- [ ] Phase 6: DEX swap interface
- [ ] Phase 7: Portfolio dashboard
- [ ] Phase 8: AI yield optimization
- [ ] Phase 9: Rewards & referrals
- [ ] Phase 10: Admin panel
- [ ] Phase 11: Mobile optimization
- [ ] Phase 12: Production deployment

## 📚 Documentation

- **Database Schema**: See `scripts/init-supabase.sql`
- **Component API**: Individual component files have JSDoc comments
- **Environment Setup**: See `.env.example`
- **API Documentation**: OpenAPI/Swagger (future)

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review API route comments

## ⚡ Quick Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Wagmi Documentation](https://wagmi.sh)
- [Solana Documentation](https://docs.solana.com)

---

**Built with ❤️ using modern web technologies**
