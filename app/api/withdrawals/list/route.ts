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

    // Get withdrawals
    const { data: withdrawals, error } = await supabase
      .from('withdrawals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch withdrawals' },
        { status: 500 }
      )
    }

    // Calculate stats
    const totalWithdrawn = withdrawals.reduce((sum, w) => sum + parseFloat(w.amount), 0)
    const pendingCount = withdrawals.filter(w => w.status === 'pending' || w.status === 'processing').length
    const completedCount = withdrawals.filter(w => w.status === 'completed').length

    return NextResponse.json({
      success: true,
      withdrawals,
      stats: {
        total_withdrawn: totalWithdrawn,
        pending_count: pendingCount,
        completed_count: completedCount,
        total_count: withdrawals.length,
      },
    })
  } catch (error) {
    console.error('[v0] Get withdrawals error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
