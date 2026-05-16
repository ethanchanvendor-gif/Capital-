# Capital-
Build a modern institutional-grade DeFi crypto staking, investment, and swap web app using Next.js, Tailwind, Shadcn UI, Magic UI, NestJS backend, Flask AI engine, and Supabase database/auth. Create a complete responsive platform from landing page to authenticated dashboard.  Landing page should include:  * premium fintech 
Full Single-Folder Institutional DeFi Platform

TL;DR

This is a unified single-folder monorepo structure for a production-grade institutional DeFi staking, investment, and swap platform.

Includes:

Next.js App Router frontend

NestJS backend APIs

Flask AI engine

Supabase auth/database

Solana + Ethereum wallets

Jupiter integration

Admin panel

Real-time analytics

AI insights

Mobile responsive architecture

Production-ready folder structure

Full master AI generation prompt



---

1. Complete Single Folder Structure

institutional-defi-platform/
│
├── app/                                    # Next.js App Router
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   ├── staking/page.tsx
│   │   ├── swap/page.tsx
│   │   ├── analytics/page.tsx
│   │   └── learn/page.tsx
│   │
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── staking/page.tsx
│   │   ├── rewards/page.tsx
│   │   ├── swap/page.tsx
│   │   ├── referrals/page.tsx
│   │   ├── insights/page.tsx
│   │   ├── notifications/page.tsx
│   │   ├── settings/page.tsx
│   │   └── admin/page.tsx
│   │
│   ├── api/
│   ├── globals.css
│   ├── layout.tsx
│   └── providers.tsx
│
├── backend/                                # NestJS backend
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── staking/
│   │   ├── rewards/
│   │   ├── swap/
│   │   ├── wallets/
│   │   ├── ai/
│   │   ├── notifications/
│   │   ├── referrals/
│   │   ├── analytics/
│   │   ├── admin/
│   │   ├── websocket/
│   │   ├── prisma/
│   │   ├── common/
│   │   ├── config/
│   │   ├── guards/
│   │   ├── decorators/
│   │   ├── middleware/
│   │   ├── interceptors/
│   │   ├── filters/
│   │   └── main.ts
│   │
│   ├── prisma/
│   ├── test/
│   ├── nest-cli.json
│   └── tsconfig.json
│
├── ai-engine/                              # Flask AI service
│   ├── app.py
│   ├── routes/
│   ├── services/
│   ├── predictors/
│   ├── ml/
│   ├── vectorstore/
│   ├── datasets/
│   ├── utils/
│   ├── requirements.txt
│   └── models/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── marketing/
│   ├── dashboard/
│   ├── staking/
│   ├── swap/
│   ├── analytics/
│   ├── wallet/
│   ├── ai/
│   ├── charts/
│   └── admin/
│
├── lib/
│   ├── supabase/
│   ├── blockchain/
│   ├── api/
│   ├── auth/
│   ├── utils/
│   ├── constants/
│   ├── validators/
│   └── hooks/
│
├── services/
│   ├── staking.service.ts
│   ├── rewards.service.ts
│   ├── swap.service.ts
│   ├── wallet.service.ts
│   ├── ai.service.ts
│   ├── analytics.service.ts
│   └── notification.service.ts
│
├── store/
│   ├── auth.store.ts
│   ├── wallet.store.ts
│   ├── portfolio.store.ts
│   ├── staking.store.ts
│   ├── rewards.store.ts
│   ├── notifications.store.ts
│   ├── ai.store.ts
│   └── theme.store.ts
│
├── styles/
│   ├── globals.css
│   ├── animations.css
│   └── themes.css
│
├── public/
│   ├── logos/
│   ├── icons/
│   ├── images/
│   └── animations/
│
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   ├── policies.sql
│   └── schema.sql
│
├── docker/
│   ├── frontend.Dockerfile
│   ├── backend.Dockerfile
│   ├── ai.Dockerfile
│   └── nginx.conf
│
├── scripts/
│   ├── setup.sh
│   ├── dev.sh
│   ├── build.sh
│   └── deploy.sh
│
├── .env.local
├── .env.example
├── docker-compose.yml
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── middleware.ts
├── postcss.config.js
├── components.json
├── README.md
└── MASTER_PROMPT.txt


---

2. Landing Page Features

Sections

- Premium Hero
- Live TVL Stats
- APY Cards
- AI Yield Optimization
- Crypto Swap Preview
- Security/Audit
- Institutional Testimonials
- FAQ
- CTA Footer


---

3. Dashboard Features

- Portfolio Overview
- Wallet Balances
- Staking Management
- Rewards Tracking
- Token Swaps
- Referral Program
- Notifications
- AI Insights
- Analytics Charts
- Admin Panel
- Mobile Responsive Layout


---

4. Technology Stack

Frontend

next
react
typescript
tailwindcss
shadcn-ui
magicui
framer-motion
zustand
@tanstack/react-query
recharts
@tremor/react


---

Blockchain

wagmi
viem
@rainbow-me/rainbowkit
@solana/web3.js
@solana/wallet-adapter-react
@solana/wallet-adapter-wallets
@jup-ag/react-hook


---

Backend

@nestjs/core
@nestjs/jwt
@nestjs/passport
@nestjs/websockets
socket.io
passport
prisma
redis
bullmq


---

AI Engine

flask
numpy
pandas
scikit-learn
prophet
langchain
openai


---

5. UI Design System

Design Style

Inspired by:

Coinbase

Stripe

Vercel

Jupiter

Linear


Avoid:

casino visuals

meme coin styling

excessive neon

cluttered layouts



---

Visual Style

- Glassmorphism
- Soft gradients
- Clean typography
- Institutional spacing
- Subtle shadows
- Smooth animations


---

6. Dashboard Widgets

Portfolio Widgets

- Total Portfolio Value
- Yield Earned
- Asset Allocation
- Risk Exposure
- Daily Rewards
- APY Forecast


---

Charts

- Area Charts
- Candlestick Charts
- Allocation Pie Charts
- Reward Trends
- AI Forecast Curves


---

7. AI Features

Flask AI Engine

Features:

- Yield prediction
- Portfolio optimization
- Risk scoring
- Smart allocation
- Market intelligence
- Whale movement analysis
- APY forecasting


---

8. Backend API Routes

Authentication

POST /auth/login
POST /auth/register
POST /auth/wallet
POST /auth/logout


---

Portfolio

GET /portfolio
GET /portfolio/history
GET /portfolio/analytics


---

Staking

POST /staking/deposit
POST /staking/withdraw
GET /staking/positions
GET /staking/plans


---

Swap

POST /swap/quote
POST /swap/execute
GET /swap/routes


---

AI

GET /ai/insights
GET /ai/risk
GET /ai/forecast


---

9. Supabase Schema

Core Tables

users
wallets
staking_positions
transactions
rewards
swap_history
notifications
referrals
ai_insights
admin_logs
investment_plans


---

10. Authentication + RBAC

Roles

- user
- premium
- admin
- super_admin


---

Security

- JWT auth
- Wallet signature auth
- MFA support
- RBAC guards
- Rate limiting
- CSRF protection
- Input sanitization


---

11. Realtime Features

WebSockets

Events:

portfolio.updated
staking.updated
rewards.claimed
swap.completed
notification.created
market.updated


---

12. Mobile Responsiveness

Mobile UX

Features:

- Bottom mobile nav
- Swipe panels
- Responsive charts
- Mobile staking flow
- Mobile wallet support


---

13. Production Infrastructure

Deployment

Frontend: Vercel
Backend: Railway/AWS ECS
AI Engine: Docker VPS
Database: Supabase
Cache: Redis
CDN: Cloudflare


---

14. Docker Compose

version: '3.9'

services:
  frontend:
    build:
      context: .
      dockerfile: docker/frontend.Dockerfile
    ports:
      - '3000:3000'

  backend:
    build:
      context: .
      dockerfile: docker/backend.Dockerfile
    ports:
      - '4000:4000'

  ai-engine:
    build:
      context: .
      dockerfile: docker/ai.Dockerfile
    ports:
      - '5000:5000'

  redis:
    image: redis:latest

  nginx:
    image: nginx:latest


---

15. MASTER_PROMPT.txt

Build a modern institutional-grade DeFi crypto staking, investment, and swap platform using:

Frontend:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Shadcn UI
- Magic UI
- Framer Motion
- Recharts/Tremor

Backend:
- NestJS microservices
- Prisma ORM
- Redis
- WebSockets
- BullMQ queues

AI:
- Flask AI analytics service
- Portfolio optimization
- Yield forecasting
- Risk analysis

Database/Auth:
- Supabase
- PostgreSQL
- JWT authentication
- Role-based access control

Blockchain:
- Ethereum wallets
- Solana wallets
- Jupiter aggregator
- WalletConnect
- RainbowKit

Design Requirements:
- Coinbase + Stripe + Jupiter inspired
- Institutional fintech aesthetic
- Ultra clean spacing
- Glassmorphism
- Smooth animations
- Responsive mobile-first design
- Avoid casino/HYIP styles

Landing Page:
- Premium hero section
- Live TVL stats
- APY cards
- AI optimization section
- Swap preview
- Security/audit section
- FAQ
- Testimonials
- CTA section

Dashboard:
- Portfolio overview
- Staking management
- Rewards tracking
- Analytics
- Token swap interface
- Wallet connections
- Referral system
- Notifications
- AI insights
- Admin panel
- Dark/light mode

Architecture Requirements:
- Reusable components
- Modular services
- Clean SaaS architecture
- API-ready backend
- Production-ready folder structure
- Docker support
- CI/CD ready
- Security hardened
- Real-time updates
- Scalable infrastructure

Generate:
- Full folder structure
- Production-ready code
- Shared UI system
- Type-safe APIs
- Responsive layouts
- Backend routes
- Database schemas
- Environment configs
- Docker configs
- Authentication flow
- AI integration structure
- Wallet integration
- Swap execution architecture


---

16. Recommended Build Order

Phase 1

- Next.js setup
- Tailwind + Shadcn
- Layout system
- Landing page

Phase 2

- Dashboard shell
- Supabase auth
- Wallet integration

Phase 3

- Staking engine
- Rewards system
- Swap integration

Phase 4

- AI engine
- Notifications
- Referrals
- Admin panel

Phase 5

- Production hardening
- Security
- Monitoring
- Deployment