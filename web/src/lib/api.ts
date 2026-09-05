import type { Codes } from './codes'

export type { Codes }

function adminHeaders(password: string): HeadersInit {
  return {
    'content-type': 'application/json',
    'x-admin-password': password,
  }
}

/** Lấy mã hiện tại. Ném lỗi 'unauthorized' nếu sai mật khẩu admin. */
export async function fetchCodes(password: string): Promise<Codes> {
  const res = await fetch('/api/admin/codes', { headers: adminHeaders(password) })
  if (res.status === 401) throw new Error('unauthorized')
  if (!res.ok) throw new Error(`fetch codes failed: ${res.status}`)
  return (await res.json()) as Codes
}

/** Lưu mã mới. */
export async function saveCodes(password: string, codes: Codes): Promise<Codes> {
  const res = await fetch('/api/admin/codes', {
    method: 'PUT',
    headers: adminHeaders(password),
    body: JSON.stringify(codes),
  })
  if (res.status === 401) throw new Error('unauthorized')
  const data = (await res.json()) as Partial<Codes> & { error?: string }
  if (!res.ok) throw new Error(data.error ?? `save failed: ${res.status}`)
  return { code1: data.code1 ?? codes.code1, code2: data.code2 ?? codes.code2 }
}
