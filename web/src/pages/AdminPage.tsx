import { useEffect, useState, type FormEvent } from 'react'
import { fetchCodes, saveCodes, type Codes } from '../lib/api'

const SESSION_KEY = 'admin_password'

function readSession(): string {
  try {
    return sessionStorage.getItem(SESSION_KEY) ?? ''
  } catch {
    return ''
  }
}

function writeSession(pw: string) {
  try {
    if (pw) sessionStorage.setItem(SESSION_KEY, pw)
    else sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}

const AdminPage = () => {
  // Mật khẩu đang thử / đang dùng. Rỗng = chưa đăng nhập.
  const [password, setPassword] = useState(readSession)
  const [authed, setAuthed] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [codes, setCodes] = useState<Codes>({ code1: '', code2: '' })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'ok' | 'error'; text: string } | null>(null)

  const loading = password !== '' && !authed

  // Mỗi khi có mật khẩu mới: kiểm tra với server bằng cách tải mã hiện tại.
  useEffect(() => {
    if (!password) return
    let cancelled = false
    fetchCodes(password)
      .then(data => {
        if (cancelled) return
        setCodes(data)
        setAuthed(true)
        writeSession(password)
      })
      .catch((err: unknown) => {
        if (cancelled) return
        const msg = err instanceof Error && err.message === 'unauthorized'
          ? 'Mật khẩu không đúng!'
          : 'Không kết nối được máy chủ. Thử lại sau.'
        setMessage({ type: 'error', text: msg })
        setAuthed(false)
        setPassword('')
        writeSession('')
      })
    return () => {
      cancelled = true
    }
  }, [password])

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    const pw = passwordInput.trim()
    if (!pw) return
    setMessage(null)
    setPassword(pw)
  }

  const handleLogout = () => {
    setPassword('')
    setAuthed(false)
    setPasswordInput('')
    setCodes({ code1: '', code2: '' })
    writeSession('')
  }

  const handleSave = async (e: FormEvent) => {
    e.preventDefault()
    const next = { code1: codes.code1.trim(), code2: codes.code2.trim() }
    if (!next.code1 || !next.code2) {
      setMessage({ type: 'error', text: 'Mã không được để trống!' })
      return
    }
    setSaving(true)
    setMessage(null)
    try {
      const saved = await saveCodes(password, next)
      setCodes(saved)
      setMessage({ type: 'ok', text: 'Đã lưu. Mã mới có hiệu lực ngay.' })
    } catch (err) {
      if (err instanceof Error && err.message === 'unauthorized') {
        handleLogout()
        setMessage({ type: 'error', text: 'Phiên hết hạn, vui lòng đăng nhập lại.' })
      } else {
        setMessage({ type: 'error', text: err instanceof Error ? err.message : 'Lưu thất bại.' })
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="login-page admin-page">
      <div className="login-container admin-container">
        <h1>QUẢN TRỊ</h1>

        {!authed ? (
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="adminPassword">Mật khẩu admin</label>
              <input
                type="password"
                id="adminPassword"
                placeholder="Nhập mật khẩu"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                autoFocus
                disabled={loading}
              />
            </div>
            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? 'ĐANG KIỂM TRA...' : 'ĐĂNG NHẬP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label htmlFor="code1">Mã 1 (mã phần mềm khi đăng nhập)</label>
              <input
                type="text"
                id="code1"
                value={codes.code1}
                onChange={e => setCodes({ ...codes, code1: e.target.value })}
                disabled={saving}
                autoComplete="off"
              />
            </div>
            <div className="form-group">
              <label htmlFor="code2">Mã 2 (mã kích hoạt gói)</label>
              <input
                type="text"
                id="code2"
                value={codes.code2}
                onChange={e => setCodes({ ...codes, code2: e.target.value })}
                disabled={saving}
                autoComplete="off"
              />
            </div>
            <button className="login-btn" type="submit" disabled={saving}>
              {saving ? 'ĐANG LƯU...' : 'LƯU'}
            </button>
            <button className="login-btn admin-logout" type="button" onClick={handleLogout}>
              ĐĂNG XUẤT
            </button>
          </form>
        )}

        {message && (
          <p className={`admin-message ${message.type}`}>{message.text}</p>
        )}
      </div>
    </div>
  )
}

export default AdminPage
