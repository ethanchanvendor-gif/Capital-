import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(_request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    // Get all active staking plans
    const { data: plans, error } = await supabase
      .from('staking_plans')
      .select('*')
      .eq('is_active', true)
      .order('apy', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch staking plans' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      plans: plans || [],
    })
  } catch (error) {
    console.error('[v0] Staking plans error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
