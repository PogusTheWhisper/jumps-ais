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

function getRedis() {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) return null
  const { Redis } = require('@upstash/redis')
  return new Redis({ url, token })
}

// In-memory fallback for local dev without KV
declare global {
  // eslint-disable-next-line no-var
  var _thaiternMem: Map<string, Attempt> | undefined
}
if (!global._thaiternMem) global._thaiternMem = new Map()
const mem = global._thaiternMem

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
  const id = crypto.randomUUID()
  const attempt: Attempt = {
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
  }

  const redis = getRedis()
  if (redis) {
    await redis.set(`attempt:${id}`, JSON.stringify(attempt), { ex: 60 * 60 * 24 * 30 })
  } else {
    mem.set(id, attempt)
  }
  return id
}

export async function getAttempt(id: string): Promise<Attempt | null> {
  const redis = getRedis()
  if (redis) {
    const raw = await redis.get(`attempt:${id}`)
    if (!raw) return null
    return typeof raw === 'string' ? JSON.parse(raw) : raw
  }
  return mem.get(id) ?? null
}
