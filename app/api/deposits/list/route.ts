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

    // Get deposits
    const { data: deposits, error } = await supabase
      .from('deposits')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch deposits' },
        { status: 500 }
      )
    }

    // Calculate stats
    const totalDeposited = deposits.reduce((sum, d) => sum + parseFloat(d.amount), 0)
    const pendingCount = deposits.filter(d => d.status === 'pending').length
    const confirmedCount = deposits.filter(d => d.status === 'confirmed').length

    return NextResponse.json({
      success: true,
      deposits,
      stats: {
        total_deposited: totalDeposited,
        pending_count: pendingCount,
        confirmed_count: confirmedCount,
        total_count: deposits.length,
      },
    })
  } catch (error) {
    console.error('[v0] Get deposits error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
