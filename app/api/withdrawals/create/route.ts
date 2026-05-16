import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { amount, asset, network, toWalletAddress } = await request.json()

    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Validate input
    if (!amount || !asset || !network || !toWalletAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // Check available balance
    const { data: balance } = await supabase
      .from('wallet_balances')
      .select('*')
      .eq('user_id', user.id)
      .eq('asset', asset)
      .single()

    const availableAmount = balance?.amount || 0
    if (parseFloat(amount) > availableAmount) {
      return NextResponse.json(
        { error: 'Insufficient balance' },
        { status: 400 }
      )
    }

    // Create withdrawal record
    const { data: withdrawal, error: withdrawalError } = await supabase
      .from('withdrawals')
      .insert({
        user_id: user.id,
        amount: parseFloat(amount),
        asset,
        network,
        to_wallet_address: toWalletAddress,
        status: 'pending',
        fee: parseFloat(amount) * 0.001, // 0.1% fee
        metadata: {
          created_from: 'web',
          timestamp: new Date().toISOString(),
        },
      })
      .select()
      .single()

    if (withdrawalError) {
      return NextResponse.json(
        { error: 'Failed to create withdrawal' },
        { status: 500 }
      )
    }

    // Create transaction record
    await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        type: 'withdrawal',
        amount: parseFloat(amount),
        status: 'pending',
        metadata: {
          asset,
          network,
          withdrawal_id: withdrawal.id,
        },
      })

    return NextResponse.json({
      success: true,
      withdrawal: {
        id: withdrawal.id,
        amount: withdrawal.amount,
        asset: withdrawal.asset,
        network: withdrawal.network,
        status: withdrawal.status,
        fee: withdrawal.fee,
        to_wallet_address: withdrawal.to_wallet_address,
        created_at: withdrawal.created_at,
      },
      message: 'Withdrawal initiated. It will be processed shortly.',
    })
  } catch (error) {
    console.error('[v0] Withdrawal error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
