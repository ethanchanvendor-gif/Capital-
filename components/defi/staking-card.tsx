'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { TrendingUp, Lock, Zap } from 'lucide-react'
import { motion } from 'framer-motion'
import { StakingPlan } from '@/types'

interface StakingCardProps {
  plan: StakingPlan
  onStake: (planId: string) => void
}

export function StakingCard({ plan, onStake }: StakingCardProps) {
  const riskColors = {
    low: 'bg-green-500/10 text-green-500',
    medium: 'bg-yellow-500/10 text-yellow-500',
    high: 'bg-red-500/10 text-red-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="glassmorphism border-0 bg-glass h-full flex flex-col">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl">{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${riskColors[plan.risk_level]}`}>
            {plan.risk_level.charAt(0).toUpperCase() + plan.risk_level.slice(1)} Risk
          </span>
        </CardHeader>

        <CardContent className="flex-1 space-y-6">
          {/* APY */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm text-text-secondary">Annual Yield</span>
            </div>
            <div className="text-3xl font-bold text-gradient">{plan.apy}%</div>
          </div>

          {/* Lockup Period */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-1">
              <Lock className="w-4 h-4 text-warning" />
              <span className="text-sm text-text-secondary">Lockup Period</span>
            </div>
            <div className="text-lg font-semibold text-foreground">
              {plan.lockup_period_days} days
            </div>
          </div>

          {/* Min/Max Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text-secondary mb-1">Minimum</p>
              <p className="font-semibold text-foreground">${plan.min_amount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-1">Maximum</p>
              <p className="font-semibold text-foreground">
                {plan.max_amount ? `$${plan.max_amount.toLocaleString()}` : 'Unlimited'}
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            <p className="text-xs text-text-secondary font-medium">Features</p>
            <div className="space-y-1">
              {plan.features?.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Zap className="w-3 h-3 text-success" />
                  <span className="text-sm text-text-secondary">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => onStake(plan.id)}
            variant="default"
            className="w-full mt-4"
          >
            Start Staking
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
