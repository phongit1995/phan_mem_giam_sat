export interface Codes {
  code1: string // mã phần mềm khi đăng nhập
  code2: string // mã kích hoạt gói
}

export const DEFAULT_CODES: Codes = { code1: '1122', code2: '123890' }

const STORAGE_KEY = 'app_codes'
const FETCH_TIMEOUT_MS = 4000

let cached: Codes | null = null
let inflight: Promise<Codes> | null = null

function isCodes(v: unknown): v is Codes {
  if (!v || typeof v !== 'object') return false
  const o = v as Record<string, unknown>
  return typeof o.code1 === 'string' && o.code1 !== '' &&
    typeof o.code2 === 'string' && o.code2 !== ''
}

function readStorage(): Codes | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return isCodes(parsed) ? parsed : null
  } catch {
    return null
  }
}

function writeStorage(codes: Codes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(codes))
  } catch {
    /* ignore */
  }
}

/** Mã hiện có ngay lập tức: fetch mới nhất > localStorage > mặc định. */
export function getCodes(): Codes {
  return cached ?? readStorage() ?? DEFAULT_CODES
}

/**
 * Fetch mã từ server đúng 1 lần cho mỗi lần mở web.
 * Thành công: lưu vào bộ nhớ + localStorage. Thất bại: giữ mã đang có (getCodes()).
 * Gọi nhiều lần vẫn dùng chung 1 request.
 */
export function loadCodes(): Promise<Codes> {
  if (cached) return Promise.resolve(cached)
  if (inflight) return inflight

  inflight = (async () => {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS)
    try {
      const res = await fetch('/api/codes', { cache: 'no-store', signal: ctrl.signal })
      if (!res.ok) throw new Error(String(res.status))
      const data: unknown = await res.json()
      if (!isCodes(data)) throw new Error('bad payload')
      cached = { code1: data.code1.trim(), code2: data.code2.trim() }
      writeStorage(cached)
      return cached
    } catch {
      return getCodes()
    } finally {
      clearTimeout(timer)
      inflight = null
    }
  })()

  return inflight
}
