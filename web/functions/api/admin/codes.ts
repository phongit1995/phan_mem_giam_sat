import { getCodes, isAdmin, json, type Env } from '../../_lib'

// GET /api/admin/codes  (header x-admin-password) -> { code1, code2 }
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (!isAdmin(request, env)) return json({ error: 'unauthorized' }, 401)
  return json(await getCodes(env))
}

// PUT /api/admin/codes  (header x-admin-password) { code1, code2 } -> { ok: true, code1, code2 }
export const onRequestPut: PagesFunction<Env> = async ({ request, env }) => {
  if (!isAdmin(request, env)) return json({ error: 'unauthorized' }, 401)

  let body: { code1?: string; code2?: string }
  try {
    body = (await request.json()) as { code1?: string; code2?: string }
  } catch {
    return json({ error: 'invalid json' }, 400)
  }

  const code1 = String(body.code1 ?? '').trim()
  const code2 = String(body.code2 ?? '').trim()
  if (!code1 || !code2) return json({ error: 'Mã không được để trống' }, 400)
  if (code1.length > 64 || code2.length > 64) return json({ error: 'Mã quá dài' }, 400)

  await Promise.all([
    env.CONFIG.put('code1', code1),
    env.CONFIG.put('code2', code2),
  ])
  return json({ ok: true, code1, code2 })
}
