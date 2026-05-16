'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Lock, Unlock, Info } from 'lucide-react'

export default function StakingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

  const stakingPlans = [
    {
      id: '1',
      name: 'Basic Staking',
      apr: 12.5,
      period: '30 days',
      minAmount: 100,
      maxAmount: 10000,
      features: ['Auto-compounding', 'Flexible withdrawal', 'Daily rewards'],
      risk: 'low',
    },
    {
      id: '2',
      name: 'Premium Staking',
      apr: 18.5,
      period: '90 days',
      minAmount: 1000,
      maxAmount: 100000,
      features: ['Higher rewards', 'Priority support', 'Boost multiplier'],
      risk: 'medium',
    },
    {
      id: '3',
      name: 'Elite Staking',
      apr: 25.0,
      period: '180 days',
      minAmount: 10000,
      maxAmount: null,
      features: ['Maximum rewards', 'VIP access', 'Custom strategies'],
      risk: 'high',
    },
  ]

  const activePositions = [
    {
      id: 'p1',
      plan: 'Premium Staking',
      amount: 5000,
      earned: 245.50,
      unlocksAt: '2024-08-15',
      status: 'active',
    },
    {
      id: 'p2',
      plan: 'Basic Staking',
      amount: 2500,
      earned: 125.25,
      unlocksAt: '2024-06-20',
      status: 'active',
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-foreground mb-2">Staking Strategies</h1>
        <p className="text-text-secondary">Select a plan and start earning passive income</p>
      </motion.div>

      {/* Available Plans */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-foreground">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stakingPlans.map((plan) => (
            <motion.div key={plan.id} variants={item}>
              <Card
                className={`glassmorphism border-0 bg-glass cursor-pointer transition-all duration-300 ${
                  selectedPlan === plan.id ? 'ring-2 ring-primary' : 'hover:bg-glass-light'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <CardDescription>{plan.period} lockup</CardDescription>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      plan.risk === 'low' ? 'bg-green-500/20 text-green-400' :
                      plan.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {plan.risk}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold text-gradient">{plan.apr}% APY</div>
                  
                  <div className="space-y-2">
                    <p className="text-text-secondary text-sm">
                      Min: ${plan.minAmount.toLocaleString()}
                    </p>
                    <p className="text-text-secondary text-sm">
                      Max: {plan.maxAmount ? `$${plan.maxAmount.toLocaleString()}` : 'Unlimited'}
                    </p>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-border">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-text-secondary text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button variant="primary" className="w-full mt-4">
                    Stake Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Active Positions */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Your Active Stakes</h2>
            <p className="text-text-secondary text-sm">Monitor your staking positions</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gradient">$7,500</div>
            <p className="text-text-secondary text-xs">Total staked</p>
          </div>
        </div>

        {activePositions.length > 0 ? (
          <div className="space-y-4">
            {activePositions.map((position) => (
              <motion.div key={position.id} variants={item}>
                <Card className="glassmorphism border-0 bg-glass">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                      <div>
                        <p className="text-text-secondary text-sm mb-1">Plan</p>
                        <p className="font-semibold text-foreground">{position.plan}</p>
                      </div>
                      <div>
                        <p className="text-text-secondary text-sm mb-1">Staked Amount</p>
                        <p className="font-semibold text-foreground">${position.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-text-secondary text-sm mb-1">Earned</p>
                        <p className="font-semibold text-success">${position.earned.toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-text-secondary text-sm mb-1">Unlocks</p>
                        <p className="font-semibold text-foreground">{position.unlocksAt}</p>
                      </div>
                      <div className="flex items-end gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Claim Rewards
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="glassmorphism border-0 bg-glass">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Lock className="w-12 h-12 text-text-tertiary mb-4" />
              <p className="text-text-secondary">No active stakes yet</p>
              <Button variant="primary" className="mt-4">
                Create Your First Stake
              </Button>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-glass-light rounded-xl p-6 border border-border flex gap-4"
      >
        <Info className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-foreground mb-2">How Staking Works</h3>
          <p className="text-text-secondary text-sm">
            Lock your tokens for a selected period to earn guaranteed APY. Rewards are calculated daily and can be claimed anytime. Higher lockup periods provide better yields.
          </p>
        </div>
      </motion.div>
    </div>
  )
}
