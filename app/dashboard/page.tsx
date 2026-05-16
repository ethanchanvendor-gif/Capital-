'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Wallet, PieChart, Zap, ArrowDownLeft, ArrowUpRight, ArrowRightLeft } from 'lucide-react'
import { DepositDialog } from '@/components/defi/deposit-dialog'
import { WithdrawalDialog } from '@/components/defi/withdrawal-dialog'
import { SwapDialog } from '@/components/defi/swap-dialog'

export default function DashboardPage() {
  const [depositOpen, setDepositOpen] = useState(false)
  const [withdrawalOpen, setWithdrawalOpen] = useState(false)
  const [swapOpen, setSwapOpen] = useState(false)

  const stats = [
    {
      title: 'Total Balance',
      value: '$24,850.50',
      change: '+12.5%',
      icon: Wallet,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Total Earned',
      value: '$2,485.23',
      change: '+8.2%',
      icon: TrendingUp,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Active Stakes',
      value: '3 Positions',
      change: 'Locked',
      icon: Zap,
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Portfolio',
      value: '4 Assets',
      change: 'Diversified',
      icon: PieChart,
      color: 'from-orange-500 to-orange-600',
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="flex-1 p-6 lg:p-8 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back!</h1>
        <p className="text-text-secondary">Here&apos;s your DeFi portfolio overview</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div key={index} variants={item}>
              <Card className="glassmorphism border-0 bg-glass hover:bg-glass-light transition-all duration-300">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-text-secondary">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <p className="text-xs text-success font-semibold">{stat.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Charts and Content Sections */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Main Chart Area */}
        <motion.div variants={item} className="lg:col-span-2">
          <Card className="glassmorphism border-0 bg-glass h-96">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-full flex items-center justify-center text-text-secondary">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gradient mb-2">Coming Soon</div>
                  <p>Interactive chart component</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sidebar */}
        <motion.div variants={item} className="space-y-6">
          {/* Asset Allocation */}
          <Card className="glassmorphism border-0 bg-glass">
            <CardHeader>
              <CardTitle className="text-lg">Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'SOL', percentage: 45, color: 'bg-primary' },
                  { name: 'ETH', percentage: 30, color: 'bg-secondary' },
                  { name: 'USDC', percentage: 20, color: 'bg-warning' },
                  { name: 'Other', percentage: 5, color: 'bg-border' },
                ].map((asset) => (
                  <div key={asset.name}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-text-secondary text-sm font-medium">{asset.name}</span>
                      <span className="text-foreground font-semibold">{asset.percentage}%</span>
                    </div>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <div
                        className={`h-full ${asset.color} rounded-full transition-all duration-500`}
                        style={{ width: `${asset.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glassmorphism border-0 bg-glass">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                onClick={() => setDepositOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark"
              >
                <ArrowDownLeft className="w-4 h-4" />
                Deposit
              </Button>
              <Button
                onClick={() => setSwapOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <ArrowRightLeft className="w-4 h-4" />
                Swap
              </Button>
              <Button
                onClick={() => setWithdrawalOpen(true)}
                className="w-full flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark"
              >
                <ArrowUpRight className="w-4 h-4" />
                Withdraw
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>


      {/* Dialogs */}
      <DepositDialog
        open={depositOpen}
        onOpenChange={setDepositOpen}
        onSuccess={() => {
          setDepositOpen(false)
        }}
      />
      <SwapDialog
        open={swapOpen}
        onOpenChange={setSwapOpen}
        onSuccess={() => {
          setSwapOpen(false)
        }}
      />
      <WithdrawalDialog
        open={withdrawalOpen}
        onOpenChange={setWithdrawalOpen}
        onSuccess={() => {
          setWithdrawalOpen(false)
        }}
      />
    </div>
  )
}
