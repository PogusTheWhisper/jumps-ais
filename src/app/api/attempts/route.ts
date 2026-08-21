import { NextRequest, NextResponse } from 'next/server'
import { saveAttempt } from '@/lib/db'
import { OptKey } from '@/lib/data'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const id = await saveAttempt({
    track: body.track,
    entityId: body.entityId,
    entityName: body.entityName,
    entityType: body.entityType,
    entityLoc: body.entityLoc,
    optionSelected: body.optionSelected as OptKey | null,
    justification: body.justification || null,
    reflection: body.reflection || null,
  })
  return NextResponse.json({ id })
}
