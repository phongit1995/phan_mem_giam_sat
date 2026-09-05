export interface Env {
  CONFIG: KVNamespace
  ADMIN_PASSWORD?: string
}

export interface Codes {
  code1: string
  code2: string
}

const DEFAULTS: Codes = { code1: '1122', code2: '123890' }

export async function getCodes(env: Env): Promise<Codes> {
  const [code1, code2] = await Promise.all([
    env.CONFIG.get('code1'),
    env.CONFIG.get('code2'),
  ])
  return {
    code1: code1 ?? DEFAULTS.code1,
    code2: code2 ?? DEFAULTS.code2,
  }
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
    },
  })
}

export function isAdmin(request: Request, env: Env): boolean {
  const expected = env.ADMIN_PASSWORD
  if (!expected) return false
  const given = request.headers.get('x-admin-password') ?? ''
  return given === expected
}
