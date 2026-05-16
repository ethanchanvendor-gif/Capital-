import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { planId, amount } = await request.json()

    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!planId || !amount) {
      return NextResponse.json(
        { error: 'Plan ID and amount are required' },
        { status: 400 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Verify user
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Get staking plan
    const { data: plan, error: planError } = await supabase
      .from('staking_plans')
      .select('*')
      .eq('id', planId)
      .single()

    if (planError || !plan) {
      return NextResponse.json(
        { error: 'Staking plan not found' },
        { status: 404 }
      )
    }

    // Validate amount
    const stakeAmount = parseFloat(amount)
    if (stakeAmount < plan.min_amount) {
      return NextResponse.json(
        {
          error: `Minimum stake amount is ${plan.min_amount}`,
        },
        { status: 400 }
      )
    }

    if (plan.max_amount && stakeAmount > plan.max_amount) {
      return NextResponse.json(
        {
          error: `Maximum stake amount is ${plan.max_amount}`,
        },
        { status: 400 }
      )
    }

    // Check available balance
    const { data: balance } = await supabase
      .from('wallet_balances')
      .select('*')
      .eq('user_id', user.id)
      .eq('asset', 'USDC')
      .single()

    const availableAmount = balance?.amount || 0
    if (stakeAmount > availableAmount) {
      return NextResponse.json(
        { error: 'Insufficient balance to stake' },
        { status: 400 }
      )
    }

    // Create staking position
    const unlockDate = new Date()
    unlockDate.setDate(unlockDate.getDate() + plan.lockup_period_days)

    const { data: position, error: positionError } = await supabase
      .from('staking_positions')
      .insert({
        user_id: user.id,
        plan_id: planId,
        amount: stakeAmount,
        unlock_at: unlockDate.toISOString(),
        status: 'active',
        earned_rewards: 0,
      })
      .select()
      .single()

    if (positionError) {
      return NextResponse.json(
        { error: 'Failed to create staking position' },
        { status: 500 }
      )
    }

    // Create transaction record
    await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        type: 'stake',
        amount: stakeAmount,
        status: 'completed',
        metadata: {
          plan_id: planId,
          position_id: position.id,
          unlock_date: unlockDate.toISOString(),
        },
      })

    // Update wallet balance
    if (balance) {
      const newAmount = availableAmount - stakeAmount
      await supabase
        .from('wallet_balances')
        .update({
          amount: newAmount,
          usd_value: newAmount * (balance.usd_value / availableAmount),
        })
        .eq('id', balance.id)
    }

    return NextResponse.json({
      success: true,
      position: {
        id: position.id,
        planId: position.plan_id,
        amount: position.amount,
        unlocksAt: position.unlock_at,
        estimatedRewards: (stakeAmount * plan.apy) / 100,
        status: position.status,
      },
      message: `Successfully staked ${stakeAmount} tokens. Your position will unlock on ${unlockDate.toLocaleDateString()}.`,
    })
  } catch (error) {
    console.error('[v0] Staking error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
