'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

import { ArrowRightLeft, Calendar, DollarSign, TrendingUp } from 'lucide-react'

export default function SwapPage() {
  const [swapHistory] = useState([
    {
      id: '1',
      fromToken: 'USDC',
      toToken: 'ETH',
      fromAmount: 5000,
      toAmount: 2.04,
      rate: 2450.5,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'completed',
      fee: 2.5,
    },
    {
      id: '2',
      fromToken: 'ETH',
      toToken: 'SOL',
      fromAmount: 1,
      toAmount: 16.8,
      rate: 145.75,
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'completed',
      fee: 1.2,
    },
    {
      id: '3',
      fromToken: 'USDT',
      toToken: 'BTC',
      fromAmount: 10000,
      toAmount: 0.16,
      rate: 62500,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: 'completed',
      fee: 5.0,
    },
  ])

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
        <h1 className="text-3xl font-bold text-foreground mb-2">Swap History</h1>
        <p className="text-text-secondary">View all your token swap transactions</p>
      </motion.div>

      {/* Statistics */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={item}>
          <Card className="glassmorphism border-0 bg-glass">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
                  <ArrowRightLeft className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Total Swaps</p>
                  <p className="text-2xl font-bold text-foreground">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="glassmorphism border-0 bg-glass">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-secondary bg-opacity-10 rounded-lg">
                  <DollarSign className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Total Volume</p>
                  <p className="text-2xl font-bold text-foreground">$25K</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="glassmorphism border-0 bg-glass">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-success bg-opacity-10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-text-secondary">Total Fees</p>
                  <p className="text-2xl font-bold text-foreground">$8.70</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Swap History Table */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="space-y-4"
      >
        <h2 className="text-xl font-semibold text-foreground">Recent Swaps</h2>

        {swapHistory.length > 0 ? (
          <div className="space-y-3">
            {swapHistory.map((swap) => (
              <motion.div key={swap.id} variants={item}>
                <Card className="glassmorphism border-0 bg-glass hover:bg-glass-light transition">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      {/* Token Swap */}
                      <div>
                        <p className="text-text-secondary text-sm mb-1">Swap</p>
                        <div className="flex items-center gap-2">
                          <div className="font-semibold text-foreground">{swap.fromToken}</div>
                          <ArrowRightLeft className="w-4 h-4 text-primary" />
                          <div className="font-semibold text-foreground">{swap.toToken}</div>
                        </div>
                      </div>

                      {/* From Amount */}
                      <div>
                        <p className="text-text-secondary text-sm mb-1">From</p>
                        <p className="font-semibold text-foreground">{swap.fromAmount} {swap.fromToken}</p>
                      </div>

                      {/* To Amount */}
                      <div>
                        <p className="text-text-secondary text-sm mb-1">To</p>
                        <p className="font-semibold text-foreground">{swap.toAmount.toFixed(4)} {swap.toToken}</p>
                      </div>

                      {/* Rate */}
                      <div>
                        <p className="text-text-secondary text-sm mb-1">Rate</p>
                        <p className="font-semibold text-foreground">${swap.rate.toFixed(2)}</p>
                      </div>

                      {/* Fee */}
                      <div>
                        <p className="text-text-secondary text-sm mb-1">Fee</p>
                        <p className="font-semibold text-foreground">${swap.fee.toFixed(2)}</p>
                      </div>

                      {/* Date & Status */}
                      <div>
                        <p className="text-text-secondary text-sm mb-1">Date</p>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-text-secondary" />
                          <p className="font-semibold text-foreground text-sm">
                            {swap.timestamp.toLocaleDateString()}
                          </p>
                        </div>
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
              <ArrowRightLeft className="w-12 h-12 text-text-tertiary mb-4" />
              <p className="text-text-secondary">No swap history yet</p>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}
