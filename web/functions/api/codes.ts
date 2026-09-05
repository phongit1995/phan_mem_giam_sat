import { getCodes, json, type Env } from '../_lib'

// GET /api/codes -> { code1, code2 }  (public, web fetch 1 lần khi mở trang)
export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  return json(await getCodes(env))
}
