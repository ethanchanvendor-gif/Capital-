'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ArrowDown, Copy, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

interface DepositDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function DepositDialog({ open, onOpenChange, onSuccess }: DepositDialogProps) {
  const [step, setStep] = useState<'amount' | 'confirm' | 'success'>('amount')
  const [amount, setAmount] = useState('')
  const [asset, setAsset] = useState('USDC')
  const [network, setNetwork] = useState('ethereum')
  const [loading, setLoading] = useState(false)
  const [depositId, setDepositId] = useState('')
  const [walletAddress, setWalletAddress] = useState('')

  const assets = ['USDC', 'USDT', 'DAI', 'ETH', 'SOL']
  const networks = [
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'solana', name: 'Solana' },
  ]

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount')
      return
    }

    setLoading(true)
    try {
      // Generate demo wallet address
      const demoAddress = `0x${Math.random().toString(16).slice(2, 42)}`
      setWalletAddress(demoAddress)
      setDepositId(`dep_${Math.random().toString(36).slice(2, 9)}`)
      setStep('confirm')
    } catch (error) {
      toast.error('Failed to initiate deposit')
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = () => {
    setStep('success')
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    toast.success('Address copied!')
  }

  const handleClose = () => {
    setStep('amount')
    setAmount('')
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
              <DialogTitle className="text-foreground">Deposit Funds</DialogTitle>
              <DialogDescription className="text-text-secondary">
                Add funds to your DeFi Pro account
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Asset Selection */}
              <div>
                <label className="text-sm font-medium text-text-secondary mb-2 block">
                  Select Asset
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {assets.map((a) => (
                    <button
                      key={a}
                      onClick={() => setAsset(a)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                        asset === a
                          ? 'bg-primary text-white'
                          : 'bg-border text-text-secondary hover:bg-card-light'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              {/* Network Selection */}
              <div>
                <label className="text-sm font-medium text-text-secondary mb-2 block">
                  Select Network
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
                <label className="text-sm font-medium text-text-secondary mb-2 block">
                  Amount
                </label>
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
                  {['100', '500', '1000', '5000'].map((val) => (
                    <button
                      key={val}
                      onClick={() => setAmount(val)}
                      className="py-2 px-3 bg-border rounded-lg text-sm font-medium text-text-secondary hover:bg-card-light transition"
                    >
                      ${val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Deposit Button */}
              <Button
                onClick={handleDeposit}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Processing...' : 'Continue to Deposit'}
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
              <DialogTitle className="text-foreground">Send Funds</DialogTitle>
              <DialogDescription className="text-text-secondary">
                Send {amount} {asset} to the address below
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {/* Summary */}
              <div className="bg-card-dark rounded-lg p-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Amount</span>
                  <span className="text-foreground font-semibold">{amount} {asset}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Network</span>
                  <span className="text-foreground font-semibold capitalize">{network}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Deposit ID</span>
                  <span className="text-foreground font-mono text-sm">{depositId}</span>
                </div>
              </div>

              {/* Wallet Address */}
              <div>
                <label className="text-sm font-medium text-text-secondary mb-2 block">
                  Send to this address:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={walletAddress}
                    readOnly
                    className="flex-1 bg-card-dark border border-border rounded-lg px-4 py-3 text-foreground text-sm font-mono"
                  />
                  <button
                    onClick={copyAddress}
                    className="p-3 bg-primary rounded-lg text-white hover:bg-primary-dark transition"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-20 rounded-lg p-4">
                <p className="text-sm text-text-secondary">
                  After sending, your deposit will be confirmed once the transaction is verified on the blockchain (usually 1-15 minutes).
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
                  onClick={handleConfirm}
                  className="flex-1"
                >
                  I&apos;ve Sent the Funds
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
                  Deposit Initiated!
                </h3>
                <p className="text-text-secondary">
                  Your deposit of {amount} {asset} is now being processed.
                </p>
              </div>

              <div className="bg-card-dark rounded-lg p-4 text-left">
                <p className="text-xs text-text-tertiary mb-2">Deposit ID</p>
                <p className="font-mono text-sm text-foreground">{depositId}</p>
              </div>

              <div className="bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-20 rounded-lg p-4">
                <p className="text-sm text-text-secondary">
                  Check your email for updates on your deposit status. Most deposits are confirmed within 15 minutes.
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
