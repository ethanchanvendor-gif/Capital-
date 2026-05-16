import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { amount, asset, network, walletAddress } = await request.json()

    // Get user ID from token
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Validate input
    if (!amount || !asset || !network || !walletAddress) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Verify user from token
    const { data: { user }, error: userError } = await supabase.auth.getUser(token)

    if (userError || !user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Create deposit record
    const { data: deposit, error: depositError } = await supabase
      .from('deposits')
      .insert({
        user_id: user.id,
        amount: parseFloat(amount),
        asset,
        network,
        wallet_address: walletAddress,
        status: 'pending',
        metadata: {
          created_from: 'web',
          timestamp: new Date().toISOString(),
        },
      })
      .select()
      .single()

    if (depositError) {
      return NextResponse.json(
        { error: 'Failed to create deposit' },
        { status: 500 }
      )
    }

    // Create transaction record
    await supabase
      .from('transactions')
      .insert({
        user_id: user.id,
        type: 'deposit',
        amount: parseFloat(amount),
        status: 'pending',
        metadata: {
          asset,
          network,
          deposit_id: deposit.id,
        },
      })

    return NextResponse.json({
      success: true,
      deposit: {
        id: deposit.id,
        amount: deposit.amount,
        asset: deposit.asset,
        network: deposit.network,
        status: deposit.status,
        wallet_address: deposit.wallet_address,
        created_at: deposit.created_at,
      },
      message: 'Deposit initiated. Send funds to the wallet address above.',
    })
  } catch (error) {
    console.error('[v0] Deposit error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
