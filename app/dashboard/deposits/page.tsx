'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { ArrowDownLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react'

const depositData = [
  {
    id: 'dep_abc1234',
    amount: 5000,
    asset: 'USDC',
    network: 'ethereum',
    status: 'confirmed',
    transactionHash: '0x1234...5678',
    date: '2024-01-15T10:30:00Z',
    confirmations: 12,
  },
  {
    id: 'dep_def5678',
    amount: 2500,
    asset: 'ETH',
    network: 'ethereum',
    status: 'confirmed',
    transactionHash: '0x8765...4321',
    date: '2024-01-14T15:45:00Z',
    confirmations: 8,
  },
  {
    id: 'dep_ghi9012',
    amount: 10000,
    asset: 'USDC',
    network: 'solana',
    status: 'pending',
    transactionHash: null,
    date: '2024-01-13T09:15:00Z',
    confirmations: 0,
  },
]

const statusColors: Record<string, { bg: string; text: string; icon: any }> = {
  confirmed: {
    bg: 'bg-success bg-opacity-10',
    text: 'text-success',
    icon: CheckCircle,
  },
  pending: {
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

export default function DepositsPage() {
  const [_selectedDeposit, setSelectedDeposit] = useState<string | null>(null)

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

  const totalDeposited = depositData.reduce((sum, d) => sum + d.amount, 0)
  const confirmedCount = depositData.filter(d => d.status === 'confirmed').length

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
              <ArrowDownLeft className="w-8 h-8 text-primary" />
              Deposits
            </h1>
            <p className="text-text-secondary">Manage your deposits and transaction history</p>
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
                Total Deposited
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">${totalDeposited.toLocaleString()}</div>
              <p className="text-xs text-text-secondary mt-1">{depositData.length} transactions</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="glassmorphism border-0 bg-glass">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">
                Confirmed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{confirmedCount}</div>
              <p className="text-xs text-text-secondary mt-1">Successfully verified</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="glassmorphism border-0 bg-glass">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-secondary">
                Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{depositData.filter(d => d.status === 'pending').length}</div>
              <p className="text-xs text-text-secondary mt-1">Awaiting confirmation</p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Deposits List */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
      >
        <Card className="glassmorphism border-0 bg-glass">
          <CardHeader>
            <CardTitle>Deposit History</CardTitle>
            <CardDescription>All your deposits and their status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {depositData.map((deposit) => {
                const StatusIcon = statusColors[deposit.status].icon
                return (
                  <motion.div
                    key={deposit.id}
                    variants={item}
                    onClick={() => setSelectedDeposit(deposit.id)}
                    className="p-4 bg-card-dark rounded-lg border border-border hover:border-primary transition cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-3 rounded-lg ${statusColors[deposit.status].bg}`}>
                          <StatusIcon className={`w-5 h-5 ${statusColors[deposit.status].text}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-foreground">
                              ${deposit.amount.toLocaleString()} {deposit.asset}
                            </p>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[deposit.status].bg} ${statusColors[deposit.status].text}`}>
                              {deposit.status}
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary">
                            {deposit.network} • {new Date(deposit.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {deposit.transactionHash && (
                          <a
                            href={`#${deposit.transactionHash}`}
                            className="text-xs text-primary hover:underline font-mono"
                          >
                            {deposit.transactionHash}
                          </a>
                        )}
                        {deposit.status === 'pending' && (
                          <p className="text-xs text-text-secondary">
                            {deposit.confirmations} confirmations
                          </p>
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
