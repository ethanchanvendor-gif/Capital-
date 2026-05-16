import { NextRequest, NextResponse } from 'next/server'
import { calculateSwapQuote, estimateGasFee } from '@/lib/swap-service'
import { getToken } from '@/lib/token-service'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { fromTokenId, toTokenId, fromAmount, slippage } = await request.json()

    // Validate inputs
    if (!fromTokenId || !toTokenId || !fromAmount || !slippage) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Verify tokens exist
    if (!getToken(fromTokenId) || !getToken(toTokenId)) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 400 }
      )
    }

    // Calculate quote
    const quote = calculateSwapQuote(fromTokenId, toTokenId, fromAmount, slippage)
    const gasFee = estimateGasFee(fromTokenId, toTokenId)

    return NextResponse.json({
      quote,
      gasFee,
      timestamp: Date.now(),
    })
  } catch (error) {
    console.error('Quote error:', error)
    return NextResponse.json(
      { error: 'Failed to calculate quote' },
      { status: 500 }
    )
  }
}
