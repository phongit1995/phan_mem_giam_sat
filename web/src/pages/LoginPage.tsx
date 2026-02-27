import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const FIXED_PASS = 'HT3399'

const seedingData = [
  '0901.234.xxx', '0902.345.xxx', '0903.456.xxx',
  '0904.567.xxx', '0905.678.xxx', '0906.789.xxx',
  '0907.890.xxx', '0908.901.xxx', '0909.123.xxx',
  '0910.234.xxx', '0911.345.xxx', '0912.456.xxx',
  '0913.567.xxx', '0914.678.xxx', '0915.789.xxx',
  '0916.890.xxx', '0917.901.xxx', '0918.123.xxx',
  '0919.234.xxx', '0920.345.xxx', '0921.456.xxx',
  '0922.567.xxx', '0923.678.xxx', '0924.789.xxx',
  '0925.890.xxx', '0926.901.xxx', '0927.123.xxx',
  '0928.234.xxx', '0929.345.xxx', '0930.456.xxx',
]

interface CountryCode {
  value: string
  label: string
}

const countryCodes: CountryCode[] = [
  { value: '+84', label: 'Việt Nam (+84)' },
  { value: '+1', label: 'Mỹ (+1)' },
  { value: '+44', label: 'Anh (+44)' },
  { value: '+81', label: 'Nhật Bản (+81)' },
  { value: '+82', label: 'Hàn Quốc (+82)' },
  { value: '+86', label: 'Trung Quốc (+86)' },
  { value: '+61', label: 'Úc (+61)' },
  { value: '+33', label: 'Pháp (+33)' },
  { value: '+49', label: 'Đức (+49)' },
  { value: '+39', label: 'Ý (+39)' },
  { value: '+7', label: 'Nga (+7)' },
  { value: '+34', label: 'Tây Ban Nha (+34)' },
  { value: '+46', label: 'Thụy Điển (+46)' },
  { value: '+41', label: 'Thụy Sĩ (+41)' },
  { value: '+90', label: 'Thổ Nhĩ Kỳ (+90)' },
  { value: '+971', label: 'UAE (+971)' },
  { value: '+91', label: 'Ấn Độ (+91)' },
  { value: '+62', label: 'Indonesia (+62)' },
  { value: '+60', label: 'Malaysia (+60)' },
  { value: '+65', label: 'Singapore (+65)' },
  { value: '+66', label: 'Thái Lan (+66)' },
  { value: '+64', label: 'New Zealand (+64)' },
  { value: '+55', label: 'Brazil (+55)' },
  { value: '+54', label: 'Argentina (+54)' },
  { value: '+57', label: 'Colombia (+57)' },
  { value: '+52', label: 'Mexico (+52)' },
  { value: '+358', label: 'Phần Lan (+358)' },
  { value: '+47', label: 'Na Uy (+47)' },
  { value: '+48', label: 'Ba Lan (+48)' },
  { value: '+351', label: 'Bồ Đào Nha (+351)' },
  { value: '+386', label: 'Slovenia (+386)' },
  { value: '+381', label: 'Serbia (+381)' },
  { value: '+357', label: 'Síp (Cyprus) (+357)' },
  { value: '+30', label: 'Hy Lạp (+30)' },
  { value: '+45', label: 'Đan Mạch (+45)' },
  { value: '+32', label: 'Bỉ (+32)' },
]

const LoginPage = () => {
  const navigate = useNavigate()
  const [phoneCode, setPhoneCode] = useState('+84')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [softwareCode, setSoftwareCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Seeding scroll effect
  useEffect(() => {
    const lineHeight = 22
    const totalLines = seedingData.length

    const timer = setInterval(() => {
      setScrollTop(prev => {
        const next = prev - lineHeight
        if (Math.abs(next) >= lineHeight * totalLines) {
          return 0
        }
        return next
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleLogin = () => {
    if (!phoneNumber.trim() || !softwareCode.trim()) {
      alert('Vui lòng nhập đầy đủ thông tin!')
      return
    }
    if (softwareCode !== FIXED_PASS) {
      alert('Mã phần mềm (pass) không đúng!')
      return
    }

    // Show loading and redirect
    setIsLoading(true)
    setProgress(0)

    let percent = 0
    const totalTime = 5000
    const steps = 100
    const intervalTime = totalTime / steps

    intervalRef.current = setInterval(() => {
      percent++
      setProgress(percent)

      if (percent >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        navigate('/package')
      }
    }, intervalTime)
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>UY TÍN - CHUYÊN NGHIỆP - BẢO MẬT</h2>
        <h1>ĐĂNG NHẬP HỆ THỐNG</h1>

        {/* Icons */}
        <div className="login-icons">
          <img src="https://i.pinimg.com/236x/20/35/96/20359662fcd835fa8637bdee18ad6697.jpg" alt="Telegram" />
          <img src="https://i.pinimg.com/236x/af/af/3d/afaf3d4a4f52a929ef28ed9c704240fa.jpg" alt="Zalo" />
          <img src="https://i.pinimg.com/236x/aa/99/b6/aa99b649154c1025ff11776a70309d24.jpg" alt="Messenger" />
        </div>

        {/* Phone input */}
        <div className="form-group">
          <label htmlFor="phoneCode">Số điện thoại cần theo dõi:</label>
          <select
            id="phoneCode"
            value={phoneCode}
            onChange={e => setPhoneCode(e.target.value)}
          >
            {countryCodes.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <input
            type="text"
            id="phoneNumber"
            placeholder="Nhập số điện thoại"
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Software code */}
        <div className="form-group">
          <label htmlFor="softwareCode">Mã phần mềm (pass)</label>
          <input
            type="password"
            id="softwareCode"
            placeholder="Nhập mã phần mềm"
            value={softwareCode}
            onChange={e => setSoftwareCode(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleLogin}>
          ĐĂNG NHẬP
        </button>

        {/* Seeding scroll area */}
        <div className="seeding">
          <ul style={{ top: scrollTop + 'px' }}>
            {seedingData.map((number, index) => (
              <li key={index}>
                Tài khoản: {number} - Đã Kích Hoạt Thành Công
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Loading overlay */}
      <div className={`loading-overlay ${!isLoading ? 'hidden' : ''}`}>
        <div className="loading-content">
          <div className="progress-container">
            <div className="progress-bar" style={{ width: progress + '%' }} />
          </div>
          <div className="progress-text">{progress}%</div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
