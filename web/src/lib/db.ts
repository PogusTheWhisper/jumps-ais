import { OptKey } from './data'

export interface Attempt {
  id: string
  track: string
  entity_id: string
  entity_name: string
  entity_type: string
  entity_loc: string
  option_selected: string | null
  justification: string | null
  reflection: string | null
  created_at: string
}

// In-memory fallback — use globalThis singleton so dev hot-reload and
// different Next.js module instances share the same Map
declare global {
  // eslint-disable-next-line no-var
  var _thaiternMem: Map<string, Attempt> | undefined
}
if (!global._thaiternMem) global._thaiternMem = new Map()
const mem = global._thaiternMem

function usePostgres() {
  return !!process.env.POSTGRES_URL
}

export async function saveAttempt(data: {
  track: string
  entityId: string
  entityName: string
  entityType: string
  entityLoc: string
  optionSelected: OptKey | null
  justification: string | null
  reflection: string | null
}): Promise<string> {
  if (usePostgres()) {
    const { sql } = await import('@vercel/postgres')
    const { rows } = await sql`
      INSERT INTO attempts (track, entity_id, entity_name, entity_type, entity_loc, option_selected, justification, reflection)
      VALUES (${data.track}, ${data.entityId}, ${data.entityName}, ${data.entityType}, ${data.entityLoc},
              ${data.optionSelected}, ${data.justification}, ${data.reflection})
      RETURNING id
    `
    return rows[0].id as string
  }

  const id = crypto.randomUUID()
  mem.set(id, {
    id,
    track: data.track,
    entity_id: data.entityId,
    entity_name: data.entityName,
    entity_type: data.entityType,
    entity_loc: data.entityLoc,
    option_selected: data.optionSelected,
    justification: data.justification,
    reflection: data.reflection,
    created_at: new Date().toISOString(),
  })
  return id
}

export async function getAttempt(id: string): Promise<Attempt | null> {
  if (usePostgres()) {
    const { sql } = await import('@vercel/postgres')
    const { rows } = await sql`SELECT * FROM attempts WHERE id = ${id}`
    return (rows[0] as Attempt) ?? null
  }
  return mem.get(id) ?? null
}

export async function initDb() {
  if (!usePostgres()) return
  const { sql } = await import('@vercel/postgres')
  await sql`
    CREATE TABLE IF NOT EXISTS attempts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      track TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      entity_name TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_loc TEXT NOT NULL,
      option_selected TEXT,
      justification TEXT,
      reflection TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}
