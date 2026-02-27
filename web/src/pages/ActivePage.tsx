import { useState, useEffect, useRef } from 'react'

const ActivePage = () => {
  const [countdownTime, setCountdownTime] = useState(300) // 5 minutes
  const [showAlert, setShowAlert] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCountdownTime(prev => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current)
          setShowAlert(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const days = Math.floor(countdownTime / (24 * 60 * 60))
  const hours = Math.floor((countdownTime % (24 * 60 * 60)) / (60 * 60))
  const minutes = Math.floor((countdownTime % (60 * 60)) / 60)
  const seconds = countdownTime % 60

  return (
    <div className="active-page">
      {/* Countdown */}
      {countdownTime > 0 && (
        <div className="countdown-container">
          <h1>HỆ THỐNG ĐANG TRUYỀN TẢI DỮ LIỆU VUI LÒNG CHỜ TRONG ÍT PHÚT:</h1>
          <div className="countdown-grid">
            <div className="countdown-box">
              <div className="value">{days}</div>
              <div className="label">Ngày</div>
            </div>
            <div className="countdown-box">
              <div className="value">{String(hours).padStart(2, '0')}</div>
              <div className="label">Giờ</div>
            </div>
            <div className="countdown-box">
              <div className="value">{String(minutes).padStart(2, '0')}</div>
              <div className="label">Phút</div>
            </div>
            <div className="countdown-box">
              <div className="value">{String(seconds).padStart(2, '0')}</div>
              <div className="label">Giây</div>
            </div>
          </div>
        </div>
      )}

      {/* Alert modal */}
      <div className={`alert-overlay ${!showAlert ? 'hidden' : ''}`}>
        <div className="alert-modal">
          <img
            src="https://i.pinimg.com/736x/d5/3d/1d/d53d1da070cc5d57caf512636ee01c00.jpg"
            alt="Tick xanh"
          />
          <h2>DONE</h2>
          <p>
            Quý khách đã xâm nhập thành công<br />
            Vui lòng liên hệ bộ phận an ninh bảo mật để kích hoạt vào sử dụng
          </p>
          <button onClick={() => setShowAlert(false)}>Đóng</button>
        </div>
      </div>
    </div>
  )
}

export default ActivePage
