# 🚀 DeFi Platform - Quick Start Guide

Get the institutional DeFi platform running in minutes.

## ⚡ Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **npm/pnpm/yarn** - Comes with Node
- **Supabase Account** - [Free tier available](https://supabase.com)
- **Git** - For cloning and version control

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/ethanchanvendor-gif/Capital-.git
cd Capital-
git checkout v0/ethanchanvendor-6756-380c7a2d
```

---

## 2️⃣ Install Dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

---

## 3️⃣ Setup Supabase

### Option A: Using Existing Supabase Project

1. Go to [supabase.com](https://supabase.com/dashboard)
2. Create a new project or use existing
3. Navigate to **Settings → API**
4. Copy your credentials

### Option B: Create New Supabase Project

1. Sign up at [supabase.com](https://supabase.com)
2. Click **New Project**
3. Enter project details
4. Wait for project to initialize
5. Get your credentials from **Settings → API**

---

## 4️⃣ Configure Environment

Create `.env.local` file in project root:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh... (your anon key)
SUPABASE_SERVICE_ROLE_KEY=eyJh... (your service role key)
```

**How to get these:**
1. Go to Supabase Dashboard
2. Click your project
3. Go to **Settings → API**
4. Copy the URLs and keys

---

## 5️⃣ Initialize Database Schema

### Copy SQL Schema

1. Open Supabase Dashboard
2. Click **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy all content from `scripts/init-supabase.sql`
5. Paste into the SQL editor
6. Click **Run**

Wait for the queries to complete. You'll see:
- 14 tables created
- RLS policies configured
- Indexes created
- Sample staking plans inserted

---

## 6️⃣ Run Development Server

```bash
npm run dev
```

You should see:
```
> next dev
> Local:        http://localhost:3000
```

---

## 7️⃣ Test the Application

Open http://localhost:3000 and test:

### 🏠 Landing Page
- Visit `/` 
- See hero section, features, stats
- Click "Get Started" button

### 📝 Sign Up
- Click "Get Started" or go to `/auth/register`
- Enter:
  - Full Name: `Test User`
  - Email: `test@example.com`
  - Password: `SecurePass123!`
- Click Register
- Should redirect to dashboard

### 💳 Dashboard
- Visit `/dashboard`
- See stats cards
- Click **Deposit** button
  - Select asset (USDC)
  - Select network (Ethereum)
  - Enter amount (1000)
  - Click Continue
  - See wallet address and deposit ID
  - Click "Done"

### 💸 Withdrawals
- Click **Withdraw** button
  - Select asset
  - Enter amount
  - Enter withdrawal address
  - Confirm and complete

### 📋 History
- Visit `/dashboard/deposits` - See all deposits
- Visit `/dashboard/withdrawals` - See all withdrawals

---

## 📊 Database Schema Overview

The system has these core tables:

```
users (via Supabase Auth)
  ↓
user_profiles (user details, wallets)
  ↓
├─ wallet_balances (asset holdings)
├─ portfolio (balance summaries)
├─ deposits (deposit history)
├─ withdrawals (withdrawal history)
├─ transactions (all activity)
├─ staking_positions (active stakes)
├─ staking_plans (available plans)
└─ rewards (earned rewards)
```

All tables have Row-Level Security (RLS) enabled - users can only see their own data.

---

## 🔧 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout
│   ├── auth/              # Auth pages
│   ├── dashboard/         # Dashboard pages
│   └── api/               # API routes
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   └── defi/             # DeFi-specific components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── store/                # Zustand stores
└── types/                # TypeScript types
```

---

## 📡 API Endpoints

All endpoints require authentication token in header:
```
Authorization: Bearer <your_jwt_token>
```

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Sign in

### Deposits
- `POST /api/deposits/create` - Create deposit
- `GET /api/deposits/list` - List deposits

### Withdrawals
- `POST /api/withdrawals/create` - Create withdrawal
- `GET /api/withdrawals/list` - List withdrawals

### Staking
- `GET /api/staking/plans` - List plans
- `POST /api/staking/stake` - Create stake

### Portfolio
- `GET /api/portfolio` - Get portfolio data

---

## 🔐 Security Notes

- ✅ **Secrets in .env.local** - Never commit secrets
- ✅ **JWT Tokens** - Used for API authentication
- ✅ **RLS Policies** - Database-level access control
- ✅ **Input Validation** - On all forms and API routes
- ✅ **HTTPS** - Required in production (automatic on Vercel)

---

## 🛠️ Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Check TypeScript types
```

---

## 📚 Key Files

| File | Purpose |
|------|---------|
| `.env.example` | Environment template |
| `scripts/init-supabase.sql` | Database schema |
| `types/index.ts` | TypeScript type definitions |
| `hooks/useAuth.ts` | Authentication hook |
| `components/defi/deposit-dialog.tsx` | Deposit component |
| `components/defi/withdrawal-dialog.tsx` | Withdrawal component |
| `app/api/deposits/create/route.ts` | Deposit API |
| `app/api/withdrawals/create/route.ts` | Withdrawal API |

---

## 🐛 Troubleshooting

### Port 3000 Already in Use
```bash
# Find process using port 3000
lsof -i :3000
# Kill it
kill -9 <PID>
# Or use different port
npm run dev -- -p 3001
```

### Supabase Connection Error
- Check `.env.local` has correct credentials
- Verify Supabase project is active
- Test connection in Supabase dashboard

### Database Schema Not Loaded
- Copy SQL from `scripts/init-supabase.sql`
- Run in Supabase SQL Editor
- Check for errors in query results
- Refresh dashboard

### Build Errors
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run build
```

---

## 🚀 Deploy to Vercel

Deploying this project to Vercel is simple:

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Then redeploy
vercel --prod
```

**Environment variables to add in Vercel:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

---

## 📖 Full Documentation

For complete documentation, see:
- **README_DEFI.md** - Comprehensive guide
- **IMPLEMENTATION_SUMMARY.md** - What's been built
- **Code comments** - In-line documentation

---

## 🎯 Next Steps

After setup, you can:

1. **Test the UI**
   - Try signup/login
   - Test deposit flow
   - Test withdrawal flow

2. **Connect Blockchain**
   - Add Solana wallet adapter
   - Add MetaMask connection
   - Test real transactions

3. **Build More Features**
   - Staking interface
   - Token swap interface
   - Portfolio analytics

4. **Deploy Live**
   - Push to GitHub
   - Deploy to Vercel
   - Go live!

---

## 💬 Need Help?

1. Check the documentation files
2. Review the code comments
3. Check Supabase docs at [supabase.com/docs](https://supabase.com/docs)
4. Open an issue on GitHub

---

## ✨ You're All Set!

Your institutional DeFi platform is ready to run. 

```
🎉 Happy coding! 🎉
```

Start with the landing page and work your way through the features. The foundation is solid—the rest is customization and scaling!

---

**Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Supabase**
