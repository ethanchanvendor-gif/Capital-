'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowRightLeft, ChevronDown, Search, CheckCircle, AlertCircle } from 'lucide-react'
import { TOKENS, getToken, searchTokens } from '@/lib/token-service'
import { calculateSwapQuote, validateSwapAmount, estimateGasFee } from '@/lib/swap-service'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'

interface SwapDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

type SwapStep = 'select' | 'amount' | 'review' | 'success'

export function SwapDialog({ open, onOpenChange, onSuccess }: SwapDialogProps) {
  const [step, setStep] = useState<SwapStep>('select')
  const [fromToken, setFromToken] = useState(TOKENS[0])
  const [toToken, setToToken] = useState(TOKENS[3])
  const [fromAmount, setFromAmount] = useState('')
  const [slippage, setSlippage] = useState(0.5)
  const [selectingFrom, setSelectingFrom] = useState(false)
  const [selectingTo, setSelectingTo] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const quote = fromAmount ? calculateSwapQuote(fromToken.id, toToken.id, parseFloat(fromAmount) * Math.pow(10, fromToken.decimals), slippage) : null
  const gasFee = estimateGasFee(fromToken.id, toToken.id)

  const handleSwap = () => {
    const validation = validateSwapAmount(parseFloat(fromAmount))
    if (!validation.valid) {
      toast.error(validation.error || 'Invalid amount')
      return
    }
    setStep('review')
  }

  const handleConfirmSwap = async () => {
    setIsLoading(true)
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Swap executed successfully!')
      setStep('success')
      setTimeout(() => {
        setFromAmount('')
        setStep('select')
        onOpenChange(false)
        onSuccess?.()
      }, 2000)
    } catch (error) {
      toast.error('Swap failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const TokenSelector = ({ isFrom }: { isFrom: boolean }) => {
    const selecting = isFrom ? selectingFrom : selectingTo
    const token = isFrom ? fromToken : toToken
    const setToken = isFrom ? setFromToken : setToToken
    const setSel = isFrom ? setSelectingFrom : setSelectingTo

    if (selecting) {
      return (
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-text-secondary" />
            <Input
              placeholder="Search token..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="max-h-48 overflow-y-auto space-y-2">
            {searchTokens(searchQuery).map(t => (
              <button
                key={t.id}
                onClick={() => {
                  setToken(t)
                  setSel(false)
                  setSearchQuery('')
                }}
                className="w-full p-3 rounded-lg hover:bg-card transition flex items-center gap-3"
              >
                <div className="text-2xl">{t.logo}</div>
                <div className="text-left flex-1">
                  <div className="font-semibold text-foreground">{t.symbol}</div>
                  <div className="text-xs text-text-secondary">{t.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">${t.price.toFixed(2)}</div>
                  <div className={`text-xs ${t.change24h >= 0 ? 'text-success' : 'text-error'}`}>
                    {t.change24h >= 0 ? '+' : ''}{t.change24h.toFixed(1)}%
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )
    }

    return (
      <button
        onClick={() => setSel(true)}
        className="w-full p-3 rounded-lg border border-border hover:bg-card-light transition flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="text-2xl">{token.logo}</div>
          <div className="text-left">
            <div className="font-semibold text-foreground">{token.symbol}</div>
            <div className="text-xs text-text-secondary">{token.name}</div>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 text-text-secondary" />
      </button>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Swap Tokens</DialogTitle>
          <DialogDescription>
            Exchange tokens at the best rates
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step Indicator */}
          <div className="flex gap-2">
            {(['select', 'amount', 'review', 'success'] as SwapStep[]).map((s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition ${
                  ((['select', 'amount', 'review', 'success'] as SwapStep[]).indexOf(step) >= i)
                    ? 'bg-primary'
                    : 'bg-border'
                }`}
              />
            ))}
          </div>

          {/* Step: Select Tokens */}
          {step === 'select' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">From</label>
                <TokenSelector isFrom={true} />
              </div>

              <button
                onClick={() => {
                  const temp = fromToken
                  setFromToken(toToken)
                  setToToken(temp)
                }}
                className="w-full py-2 hover:bg-card-light transition rounded-lg flex items-center justify-center gap-2 text-text-secondary"
              >
                <ArrowRightLeft className="w-4 h-4" />
                Switch
              </button>

              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">To</label>
                <TokenSelector isFrom={false} />
              </div>

              <Button onClick={() => setStep('amount')} className="w-full">
                Continue
              </Button>
            </motion.div>
          )}

          {/* Step: Enter Amount */}
          {step === 'amount' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground mb-2 block">
                  You send ({fromToken.symbol})
                </label>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="text-lg font-semibold"
                />
              </div>

              {quote && (
                <Card className="bg-card-light border-0">
                  <CardContent className="pt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Price</span>
                      <span className="text-foreground font-semibold">
                        1 {fromToken.symbol} = {(quote.toAmount / (parseFloat(fromAmount) * Math.pow(10, fromToken.decimals))).toFixed(4)} {toToken.symbol}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Price Impact</span>
                      <span className="text-warning font-semibold">{quote.priceImpact.toFixed(2)}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-secondary">Network Fee</span>
                      <span className="text-foreground font-semibold">${gasFee}</span>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div>
                <label className="text-sm font-semibold text-foreground mb-2 flex items-center justify-between">
                  <span>Slippage Tolerance</span>
                  <span className="text-primary">{slippage}%</span>
                </label>
                <div className="flex gap-2">
                  {[0.1, 0.5, 1].map(s => (
                    <button
                      key={s}
                      onClick={() => setSlippage(s)}
                      className={`flex-1 py-2 rounded-lg transition text-sm font-semibold ${
                        slippage === s
                          ? 'bg-primary text-white'
                          : 'border border-border text-foreground hover:bg-card-light'
                      }`}
                    >
                      {s}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep('select')} className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={handleSwap}
                  disabled={!fromAmount || parseFloat(fromAmount) <= 0}
                  className="flex-1"
                >
                  Review
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step: Review & Confirm */}
          {step === 'review' && quote && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="pt-6 space-y-3">
                  <div className="text-center">
                    <div className="text-sm text-text-secondary">You send</div>
                    <div className="text-2xl font-bold text-foreground">{fromAmount} {fromToken.symbol}</div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowRightLeft className="w-5 h-5 text-primary" />
                  </div>

                  <div className="text-center">
                    <div className="text-sm text-text-secondary">You receive</div>
                    <div className="text-2xl font-bold text-success">
                      {(quote.toAmount / Math.pow(10, toToken.decimals)).toFixed(4)} {toToken.symbol}
                    </div>
                  </div>

                  <div className="border-t border-border pt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Min received</span>
                      <span className="text-foreground">{(quote.minReceived / Math.pow(10, toToken.decimals)).toFixed(4)} {toToken.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Network fee</span>
                      <span className="text-foreground">${gasFee}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep('amount')} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleConfirmSwap} isLoading={isLoading} className="flex-1">
                  {isLoading ? 'Processing...' : 'Confirm Swap'}
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step: Success */}
          {step === 'success' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-4">
              <div className="w-16 h-16 bg-success/20 rounded-full mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1">Swap Complete!</h3>
                <p className="text-sm text-text-secondary">
                  Your {fromToken.symbol} has been swapped for {toToken.symbol}
                </p>
              </div>
              <Button onClick={() => onOpenChange(false)} className="w-full">
                Done
              </Button>
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
