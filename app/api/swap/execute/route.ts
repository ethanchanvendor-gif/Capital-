import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { fromTokenId, toTokenId, fromAmount, slippage, quote } = await request.json()

    // Validate swap quote
    if (!fromTokenId || !toTokenId || !fromAmount || !quote) {
      return NextResponse.json(
        { error: 'Invalid swap parameters' },
        { status: 400 }
      )
    }

    // Get auth header
    const token = request.headers.get('Authorization')
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    )

    // Verify user from token
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token.replace('Bearer ', ''))

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Create swap transaction record
    const { data: swapData, error: swapError } = await supabase
      .from('swaps')
      .insert({
        user_id: user.id,
        from_token: fromTokenId,
        to_token: toTokenId,
        from_amount: fromAmount,
        to_amount: quote.toAmount,
        rate: quote.toAmount / (fromAmount * Math.pow(10, 6)), // Mock calculation
        fee: quote.fee,
        price_impact: quote.priceImpact,
        slippage: slippage,
        status: 'completed',
        transaction_hash: `0x${Math.random().toString(16).slice(2)}`,
      })
      .select()

    if (swapError) {
      console.error('Swap error:', swapError)
      return NextResponse.json(
        { error: 'Failed to record swap' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      swap: swapData?.[0],
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error('Execute swap error:', error)
    return NextResponse.json(
      { error: 'Failed to execute swap' },
      { status: 500 }
    )
  }
}
