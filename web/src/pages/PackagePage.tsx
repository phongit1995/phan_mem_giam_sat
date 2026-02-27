import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const FIXED_ACTIVATION_CODE = 'Y3399'

interface PackageCardProps {
  title: string
}

const PackageCard = ({ title }: PackageCardProps) => {
  const navigate = useNavigate()
  const [showInput, setShowInput] = useState(false)
  const [code, setCode] = useState('')
  const [showProgress, setShowProgress] = useState(false)
  const [showLoadingText, setShowLoadingText] = useState(false)
  const [progress, setProgress] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const handleToggle = () => {
    setShowInput(!showInput)
  }

  const handleActivate = () => {
    if (code === FIXED_ACTIVATION_CODE) {
      setShowProgress(true)
      setShowLoadingText(true)

      let width = 0
      intervalRef.current = setInterval(() => {
        width += 2
        setProgress(width)

        if (width >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current)
          setTimeout(() => {
            navigate('/active')
          }, 500)
        }
      }, 100)
    } else {
      alert('Mã kích hoạt không đúng')
    }
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return (
    <div className="package-card">
      <h2 className="fancy-frame">{title}</h2>
      <br />
      <button className="btn-register" onClick={handleToggle}>
        Đăng Ký Ngay
      </button>
      <div className={`code-input-area ${!showInput ? 'hidden' : ''}`}>
        <input
          type="password"
          placeholder="Nhập mã"
          value={code}
          onChange={e => setCode(e.target.value)}
        />
        <button className="btn-activate" onClick={handleActivate}>
          Kích Hoạt
        </button>
        <div className={`pkg-progress-container ${!showProgress ? 'hidden' : ''}`}>
          <div className="pkg-progress-bar" style={{ width: progress + '%' }} />
        </div>
        <div className={`pkg-loading-text ${showLoadingText ? 'visible' : ''}`}>
          Loading: <span>{progress}%</span>
        </div>
      </div>
    </div>
  )
}

const packages = [
  'MUA GÓI THUÊ BAO 1 NĂM',
  'MUA GÓI THUÊ BAO 2 NĂM',
  'MUA GÓI THUÊ BAO 5 NĂM',
  'MUA GÓI THUÊ BAO VĨNH VIỄN',
]

const PackagePage = () => {
  return (
    <div className="package-page">
      <div className="text-center">
        <h1>ĐĂNG KÝ GÓI THUÊ BAO CẬP NHẬP DỮ LIỆU</h1>
        <div className="package-list">
          {packages.map((pkg, index) => (
            <PackageCard key={index} title={pkg} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default PackagePage
