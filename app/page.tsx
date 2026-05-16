'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Shield, Zap, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  const stats = [
    { label: 'Total Value Locked', value: '$2.4B+', change: '+23.5%' },
    { label: 'Active Users', value: '145K+', change: '+12.8%' },
    { label: 'Average APY', value: '18.5%', change: '+2.1%' },
    { label: 'Total Rewards', value: '$48.2M+', change: '+31.2%' },
  ]

  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Institutional Grade',
      description: 'Enterprise-level infrastructure built for serious investors',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Audited',
      description: 'Multi-sig wallets and smart contract audits by leading firms',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'AI Optimization',
      description: 'Advanced algorithms optimize your yield in real-time',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Multi-Chain',
      description: 'Seamless integration across Solana and Ethereum networks',
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      {/* Navigation */}
      <header className="fixed top-0 w-full z-50 glassmorphism">
        <nav className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold">
              DF
            </div>
            <span className="text-xl font-bold text-gradient">DeFi Pro</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-text-secondary hover:text-foreground transition">Features</a>
            <a href="#stats" className="text-text-secondary hover:text-foreground transition">Stats</a>
            <a href="#staking" className="text-text-secondary hover:text-foreground transition">Staking</a>
            <a href="#contact" className="text-text-secondary hover:text-foreground transition">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm">Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container-custom pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-10 w-96 h-96 bg-secondary opacity-5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-12"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            <span className="text-gradient">Institutional Grade DeFi</span>
            <br />
            <span className="text-foreground">for Smart Investors</span>
          </h1>

          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto text-balance">
            Stake, swap, and optimize your crypto portfolio with AI-powered yield strategies. Bank-level security meets cutting-edge DeFi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button variant="default" size="lg" className="gap-2">
                Start Earning <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              View Documentation
            </Button>
          </div>
        </motion.div>

        {/* Dashboard Preview - Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glassmorphism-lg p-1 rounded-2xl overflow-hidden"
        >
          <div className="bg-gradient-to-br from-card to-card-dark rounded-2xl p-8 h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-bold text-gradient mb-2">Coming Soon</div>
              <p className="text-text-secondary">Interactive dashboard preview</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="container-custom py-20 border-t border-border">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={item} className="glassmorphism p-6 rounded-xl">
              <p className="text-text-secondary text-sm mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <span className="text-success text-sm font-semibold">{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="container-custom py-20 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">Why Choose DeFi Pro?</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Built on the latest technologies and security standards for institutional investors
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="glassmorphism p-8 rounded-xl group hover:bg-glass-light transition-all duration-300"
            >
              <div className="text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-text-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="container-custom py-20 border-t border-border">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glassmorphism-lg p-12 rounded-2xl text-center"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">Ready to Optimize Your Yield?</h2>
          <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of institutional investors earning superior returns with our AI-powered platform
          </p>
          <Link href="/register">
            <Button variant="default" size="lg">
              Create Your Account
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 mt-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li><a href="#" className="hover:text-foreground transition">Staking</a></li>
                <li><a href="#" className="hover:text-foreground transition">Swaps</a></li>
                <li><a href="#" className="hover:text-foreground transition">Portfolio</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li><a href="#" className="hover:text-foreground transition">About</a></li>
                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Legal</h3>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition">Disclaimer</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Connect</h3>
              <ul className="space-y-2 text-text-secondary text-sm">
                <li><a href="#" className="hover:text-foreground transition">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition">Discord</a></li>
                <li><a href="#" className="hover:text-foreground transition">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-text-tertiary text-sm">
            <p>&copy; 2024 DeFi Pro. All rights reserved. Institutional grade DeFi platform.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
