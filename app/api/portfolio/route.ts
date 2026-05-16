import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
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

    // Get portfolio
    const { data: portfolio, error: portfolioError } = await supabase
      .from('portfolio')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (portfolioError && portfolioError.code !== 'PGRST116') {
      return NextResponse.json(
        { error: 'Failed to fetch portfolio' },
        { status: 500 }
      )
    }

    // Get wallet balances
    const { data: balances } = await supabase
      .from('wallet_balances')
      .select('*')
      .eq('user_id', user.id)

    // Get active stakes
    const { data: stakes } = await supabase
      .from('staking_positions')
      .select('*, staking_plans(*)')
      .eq('user_id', user.id)
      .eq('status', 'active')

    // Calculate totals
    const totalValue = balances?.reduce((sum, b) => sum + (b.usd_value || 0), 0) || 0
    const totalStaked = stakes?.reduce((sum, s) => sum + parseFloat(s.amount), 0) || 0
    const totalEarned = stakes?.reduce((sum, s) => sum + parseFloat(s.earned_rewards), 0) || 0

    const portfolioData = portfolio || {
      user_id: user.id,
      total_value: totalValue,
      total_invested: totalValue + totalStaked,
      total_earned: totalEarned,
      total_staked: totalStaked,
      allocation: [],
    }

    return NextResponse.json({
      success: true,
      portfolio: {
        ...portfolioData,
        balances: balances || [],
        stakes: stakes || [],
        summary: {
          total_assets: balances?.length || 0,
          active_positions: stakes?.length || 0,
          total_earning: (totalEarned / 365).toFixed(2), // Daily earning estimate
        },
      },
    })
  } catch (error) {
    console.error('[v0] Portfolio error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
