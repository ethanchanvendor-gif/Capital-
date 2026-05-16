'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, Clock, CheckCircle, AlertCircle } from 'lucide-react'

const withdrawalData = [
  {
    id: 'wdl_xyz9876',
    amount: 3000,
    asset: 'USDC',
    network: 'ethereum',
    status: 'completed',
    toAddress: '0x1234...5678',
    fee: 3,
    transactionHash: '0xabcd...efgh',
    date: '2024-01-12T14:20:00Z',
  },
  {
    id: 'wdl_pqr6543',
    amount: 1500,
    asset: 'ETH',
    network: 'ethereum',
    status: 'completed',
    toAddress: '0x8765...4321',
    fee: 0.01,
    transactionHash: '0xijkl...mnop',
    date: '2024-01-11T11:45:00Z',
  },
  {
    id: 'wdl_uvw2109',
    amount: 5000,
    asset: 'USDC',
    network: 'solana',
    status: 'processing',
    toAddress: 'Uj...xyz',
    fee: 5,
    transactionHash: null,
    date: '2024-01-10T08:30:00Z',
  },
]

const statusColors: Record<string, { bg: string; text: string; icon: any }> = {
  completed: {
    bg: 'bg-success bg-opacity-10',
    text: 'text-success',
    icon: CheckCircle,
  },
  processing: {
    bg: 'bg-warning bg-opacity-10',
    text: 'text-warning',
    icon: Clock,
  },
  failed: {
    bg: 'bg-error bg-opacity-10',
    text: 'text-error',
    icon: AlertCircle,
  },
}

export default function WithdrawalsPage() {
  const [_selectedWithdrawal, setSelectedWithdrawal] = useState<string | null>(null)

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

  const totalWithdrawn = withdrawalData.reduce((sum, w) => sum + w.amount, 0)
  const totalFees = withdrawalData.reduce((sum, w) => sum + w.fee, 0)
  const completedCount = withdrawalData.filter(w => w.status === 'completed').length

  return (
    <div className="flex-1 p-6 lg:p-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2 mb-2">
              <ArrowUpRight className="w-8 h-8 text-primary" />
              Withdrawals
            </h1>
            <p className="text-text-secondary">Track your withdrawal transactions and history</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={item}>
          <Card className="glassmorphism border-0 bg-glass">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">
                Total Withdrawn
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${totalWithdrawn.toLocaleString()}</div>
              <p className="text-xs text-text-secondary mt-1">{withdrawalData.length} transactions</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="glassmorphism border-0 bg-glass">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">
                Total Fees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-error">${totalFees.toFixed(2)}</div>
              <p className="text-xs text-text-secondary mt-1">Estimated from withdrawals</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="glassmorphism border-0 bg-glass">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{completedCount}</div>
              <p className="text-xs text-text-secondary mt-1">Successful transfers</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Withdrawals List */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Card className="glassmorphism border-0 bg-glass">
          <CardHeader>
            <CardTitle>Withdrawal History</CardTitle>
            <CardDescription>All your withdrawals and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {withdrawalData.map((withdrawal) => {
                const StatusIcon = statusColors[withdrawal.status].icon
                return (
                  <motion.div
                    key={withdrawal.id}
                    variants={item}
                    onClick={() => setSelectedWithdrawal(withdrawal.id)}
                    className="p-4 bg-card-dark rounded-lg border border-border hover:border-primary transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-3 rounded-lg ${statusColors[withdrawal.status].bg}`}>
                          <StatusIcon className={`w-5 h-5 ${statusColors[withdrawal.status].text}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-foreground">
                              ${withdrawal.amount.toLocaleString()} {withdrawal.asset}
                            </p>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[withdrawal.status].bg} ${statusColors[withdrawal.status].text}`}>
                              {withdrawal.status}
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary">
                            {withdrawal.network} • {new Date(withdrawal.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-text-tertiary mb-1">
                          Fee: ${withdrawal.fee.toFixed(2)}
                        </p>
                        {withdrawal.transactionHash && (
                          <a
                            href={`#${withdrawal.transactionHash}`}
                            className="text-xs text-primary hover:underline font-mono"
                          >
                            {withdrawal.transactionHash}
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
