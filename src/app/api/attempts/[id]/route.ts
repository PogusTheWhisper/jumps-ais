import { NextRequest, NextResponse } from 'next/server'
import { getAttempt } from '@/lib/db'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const attempt = await getAttempt(id)
  if (!attempt) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(attempt)
}
