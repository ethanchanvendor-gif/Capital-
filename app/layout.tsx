import type { Metadata } from 'next'
import './globals.css'
import { RootProvider } from '@/components/providers/root-provider'

export const metadata: Metadata = {
  title: 'DeFi Pro - Institutional Grade Staking & Investment Platform',
  description: 'Premium institutional DeFi platform for staking, investments, and cryptocurrency swaps powered by AI optimization and Jupiter DEX integration.',
  keywords: 'DeFi, staking, crypto, investment, swap, Jupiter, Solana, Ethereum',
  openGraph: {
    title: 'DeFi Pro - Institutional Grade Platform',
    description: 'Premium institutional DeFi platform for staking and investments',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeFi Pro',
    description: 'Institutional Grade DeFi Platform',
  },
  robots: 'index, follow',
  alternates: {
    canonical: 'https://defi-pro.com',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0052cc',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-background dark">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="DeFi Pro" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="bg-background text-foreground antialiased">
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
