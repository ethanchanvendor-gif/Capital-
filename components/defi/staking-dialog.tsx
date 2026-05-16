'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, AlertCircle, TrendingUp, Lock } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { StakingPlan } from '@/types'

interface StakingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  plan: StakingPlan | null
  onSuccess?: () => void
}

export function StakingDialog({ open, onOpenChange, plan, onSuccess }: StakingDialogProps) {
  const [step, setStep] = useState<'amount' | 'confirm' | 'success'>('amount')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [positionId, setPositionId] = useState('')

  // Mock balance
  const balance = 50000

  const handleStake = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    if (!plan) {
      toast.error('No staking plan selected')
      return
    }

    if (parseFloat(amount) < plan.min_amount) {
      toast.error(`Minimum stake is ${plan.min_amount}`)
      return
    }

    if (plan.max_amount && parseFloat(amount) > plan.max_amount) {
      toast.error(`Maximum stake is ${plan.max_amount}`)
      return
    }

    if (parseFloat(amount) > balance) {
      toast.error('Insufficient balance')
      return
    }

    setStep('confirm')
  }

  const handleConfirm = async () => {
    if (!plan || !amount) return

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setPositionId(`pos_${Math.random().toString(36).slice(2, 9)}`)
      setStep('success')
    } catch (error) {
      toast.error('Failed to stake')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setStep('amount')
    setAmount('')
    onOpenChange(false)
  }

  if (!plan) return null

  const stakeAmount = parseFloat(amount) || 0
  const estimatedRewards = (stakeAmount * plan.apy) / 100
  const unlockDate = new Date()
  unlockDate.setDate(unlockDate.getDate() + plan.lockup_period_days)

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] glassmorphism border-0 bg-glass">
        {step === 'amount' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <DialogHeader>
              <DialogTitle className="text-foreground">{plan.name}</DialogTitle>
              <DialogDescription className="text-text-secondary">
                Stake your tokens and earn {plan.apy}% APY
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Plan Summary */}
              <Card className="bg-card-dark border border-border">
                <CardContent className="pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Annual Yield</span>
                    <span className="text-foreground font-bold text-lg">{plan.apy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Lockup Period</span>
                    <span className="text-foreground font-semibold">{plan.lockup_period_days} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Risk Level</span>
                    <span className="text-foreground font-semibold capitalize">{plan.risk_level}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Balance */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-text-secondary">Amount to Stake</label>
                  <span className="text-xs text-text-secondary">Balance: ${balance.toLocaleString()}</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full bg-card-dark border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary">
                    USDC
                  </div>
                </div>
              </div>

              {/* Quick Amounts */}
              <div>
                <label className="text-sm font-medium text-text-secondary mb-2 block">Quick Select</label>
                <div className="grid grid-cols-4 gap-2">
                  {[250, 500, 1000, 5000].map((val) => (
                    <button
                      key={val}
                      onClick={() => setAmount(Math.min(val, balance).toString())}
                      className="py-2 px-3 bg-border rounded-lg text-sm font-medium text-text-secondary hover:bg-card-light transition"
                    >
                      ${val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Estimated Rewards */}
              {stakeAmount > 0 && (
                <Card className="bg-success bg-opacity-10 border border-success border-opacity-20">
                  <CardContent className="pt-4 space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-success" />
                      <p className="text-sm font-semibold text-success">Estimated Annual Rewards</p>
                    </div>
                    <div className="text-2xl font-bold text-success">${estimatedRewards.toFixed(2)}</div>
                    <p className="text-xs text-text-secondary">
                      Unlocks on {unlockDate.toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Stake Button */}
              <Button
                onClick={handleStake}
                className="w-full"
              >
                Review Stake
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'confirm' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <DialogHeader>
              <DialogTitle className="text-foreground">Confirm Stake</DialogTitle>
              <DialogDescription className="text-text-secondary">
                Review your staking details
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Stake Summary */}
              <Card className="bg-card-dark border border-border">
                <CardContent className="pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Staking Amount</span>
                    <span className="text-foreground font-bold">${stakeAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Annual Yield</span>
                    <span className="text-foreground font-bold">{plan.apy}%</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="text-foreground font-semibold">Est. Annual Reward</span>
                    <span className="text-success font-bold">${estimatedRewards.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Lockup Info */}
              <Card className="bg-warning bg-opacity-10 border border-warning border-opacity-20">
                <CardContent className="pt-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-warning" />
                    <p className="text-sm font-semibold text-warning">Locked for {plan.lockup_period_days} Days</p>
                  </div>
                  <p className="text-xs text-text-secondary">
                    Your tokens will be locked until {unlockDate.toLocaleDateString()}. You can claim rewards anytime.
                  </p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep('amount')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Confirming...' : 'Confirm Stake'}
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="text-center space-y-6">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle className="w-16 h-16 text-success mx-auto" />
              </motion.div>

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Stake Confirmed!
                </h3>
                <p className="text-text-secondary">
                  ${stakeAmount.toLocaleString()} staked successfully in {plan.name}
                </p>
              </div>

              <Card className="bg-card-dark border border-border">
                <CardContent className="pt-4 space-y-2">
                  <p className="text-xs text-text-tertiary mb-1">Position ID</p>
                  <p className="font-mono text-sm text-foreground">{positionId}</p>
                </CardContent>
              </Card>

              <Card className="bg-success bg-opacity-10 border border-success border-opacity-20">
                <CardContent className="pt-4 space-y-2">
                  <p className="text-sm font-semibold text-success mb-2">
                    Est. Annual Reward: ${estimatedRewards.toFixed(2)}
                  </p>
                  <p className="text-xs text-text-secondary">
                    Unlocks on {unlockDate.toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>

              <Button
                onClick={() => {
                  handleClose()
                  onSuccess?.()
                }}
                className="w-full"
              >
                View My Stakes
              </Button>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  )
}
