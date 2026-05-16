'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ArrowUp, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface WithdrawalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function WithdrawalDialog({ open, onOpenChange, onSuccess }: WithdrawalDialogProps) {
  const [step, setStep] = useState<'amount' | 'address' | 'confirm' | 'success'>('amount')
  const [amount, setAmount] = useState('')
  const [asset, setAsset] = useState('USDC')
  const [network, setNetwork] = useState('ethereum')
  const [walletAddress, setWalletAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [withdrawalId, setWithdrawalId] = useState('')

  // Mock balance data
  const balances: Record<string, number> = {
    'USDC': 5000,
    'USDT': 3200,
    'DAI': 1500,
    'ETH': 0.5,
    'SOL': 10,
  }

  const assets = Object.keys(balances)
  const networks = [
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'solana', name: 'Solana' },
  ]

  const currentBalance = balances[asset] || 0
  const withdrawAmount = parseFloat(amount) || 0
  const fee = withdrawAmount * 0.001 // 0.1% fee
  const total = withdrawAmount + fee

  const handleNext = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    if (parseFloat(amount) > currentBalance) {
      toast.error('Insufficient balance')
      return
    }

    setStep('address')
  }

  const handleAddressNext = () => {
    if (!walletAddress || walletAddress.length < 20) {
      toast.error('Please enter a valid wallet address')
      return
    }

    setStep('confirm')
  }

  const handleConfirm = async () => {
    setLoading(true)
    try {
      setWithdrawalId(`wdl_${Math.random().toString(36).slice(2, 9)}`)
      setStep('success')
    } catch (error) {
      toast.error('Failed to process withdrawal')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setStep('amount')
    setAmount('')
    setWalletAddress('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] glassmorphism border-0 bg-glass">
        {step === 'amount' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <DialogHeader>
              <DialogTitle className="text-foreground">Withdraw Funds</DialogTitle>
              <DialogDescription className="text-text-secondary">
                Withdraw from your DeFi Pro account
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Asset Selection */}
              <div>
                <label className="text-sm font-medium text-text-secondary mb-2 block">
                  Select Asset
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {assets.map((a) => (
                    <button
                      key={a}
                      onClick={() => {
                        setAsset(a)
                        setAmount('')
                      }}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                        asset === a
                          ? 'bg-primary text-white'
                          : 'bg-border text-text-secondary hover:bg-card-light'
                      }`}
                    >
                      <div>{a}</div>
                      <div className="text-xs opacity-75 mt-1">{balances[a]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Network Selection */}
              <div>
                <label className="text-sm font-medium text-text-secondary mb-2 block">
                  Withdraw to Network
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {networks.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => setNetwork(n.id)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                        network === n.id
                          ? 'bg-primary text-white'
                          : 'bg-border text-text-secondary hover:bg-card-light'
                      }`}
                    >
                      {n.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-text-secondary">Amount</label>
                  <span className="text-xs text-text-secondary">
                    Balance: {currentBalance.toFixed(2)} {asset}
                  </span>
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
                    {asset}
                  </div>
                </div>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <label className="text-sm font-medium text-text-secondary mb-2 block">
                  Quick Select
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {['25%', '50%', '75%', '100%'].map((percentage) => (
                    <button
                      key={percentage}
                      onClick={() => {
                        const pct = parseInt(percentage) / 100
                        setAmount((currentBalance * pct).toFixed(2))
                      }}
                      className="py-2 px-3 bg-border rounded-lg text-sm font-medium text-text-secondary hover:bg-card-light transition"
                    >
                      {percentage}
                    </button>
                  ))}
                </div>
              </div>

              {/* Withdrawal Button */}
              <Button
                onClick={handleNext}
                className="w-full"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {step === 'address' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <DialogHeader>
              <DialogTitle className="text-foreground">Withdrawal Address</DialogTitle>
              <DialogDescription className="text-text-secondary">
                Enter the {network} address to receive your funds
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-card-dark rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-secondary text-sm">Amount</span>
                  <span className="text-foreground font-semibold">{amount} {asset}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary text-sm">Network</span>
                  <span className="text-foreground font-semibold capitalize">{network}</span>
                </div>
              </div>

              {/* Address Input */}
              <div>
                <label className="text-sm font-medium text-text-secondary mb-2 block">
                  Wallet Address
                </label>
                <textarea
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="0x... or your wallet address"
                  className="w-full bg-card-dark border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  rows={3}
                />
                <p className="text-xs text-text-secondary mt-2">
                  Make sure this address is on the {network} network.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep('amount')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleAddressNext}
                  className="flex-1"
                >
                  Next
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'confirm' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <DialogHeader>
              <DialogTitle className="text-foreground">Confirm Withdrawal</DialogTitle>
              <DialogDescription className="text-text-secondary">
                Review your withdrawal details
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-card-dark rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Amount</span>
                  <span className="text-foreground font-semibold">{withdrawAmount.toFixed(2)} {asset}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Withdrawal Fee (0.1%)</span>
                  <span className="text-foreground font-semibold">{fee.toFixed(2)} {asset}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="text-foreground font-medium">Total</span>
                  <span className="text-foreground font-bold text-lg">{total.toFixed(2)} {asset}</span>
                </div>
              </div>

              {/* Address Info */}
              <div className="bg-card-dark rounded-lg p-4">
                <p className="text-xs text-text-secondary mb-2">To Address</p>
                <p className="text-foreground font-mono text-sm break-all">{walletAddress}</p>
              </div>

              {/* Network Info */}
              <div className="bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-20 rounded-lg p-4">
                <p className="text-sm text-text-secondary">
                  Your withdrawal will be sent on the {network} network. Processing typically takes 5-30 minutes.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep('address')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={handleConfirm}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Processing...' : 'Confirm Withdrawal'}
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
                  Withdrawal Initiated!
                </h3>
                <p className="text-text-secondary">
                  {withdrawAmount} {asset} is being sent to your wallet.
                </p>
              </div>

              <div className="bg-card-dark rounded-lg p-4 text-left">
                <p className="text-xs text-text-tertiary mb-2">Withdrawal ID</p>
                <p className="font-mono text-sm text-foreground">{withdrawalId}</p>
              </div>

              <div className="bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-20 rounded-lg p-4">
                <p className="text-sm text-text-secondary">
                  Check your email for updates. You can track your withdrawal status on the Withdrawals page.
                </p>
              </div>

              <Button
                onClick={() => {
                  handleClose()
                  onSuccess?.()
                }}
                className="w-full"
              >
                Done
              </Button>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  )
}
