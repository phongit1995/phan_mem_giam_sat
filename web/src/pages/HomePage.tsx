import { useNavigate } from 'react-router-dom'

interface AppIcon {
  src: string
  alt: string
}

const icons: AppIcon[] = [
  { src: '/img/fa.png', alt: 'Facebook' },
  { src: '/img/at.png', alt: 'Instagram' },
  { src: '/img/mess.png', alt: 'Messenger' },
  { src: '/img/tik.png', alt: 'TikTok' },
  { src: '/img/zalo.png', alt: 'Zalo' },
  { src: '/img/call.png', alt: 'WhatsApp' },
  { src: '/img/sky.png', alt: 'Skype' },
  { src: '/img/sn.png', alt: 'Snapchat' },
  { src: '/img/tele.png', alt: 'Telegram' },
  { src: '/img/sms.png', alt: 'Sms' },
  { src: '/img/youtube.png', alt: 'YouTube' },
  { src: '/img/mocha.png', alt: 'Mocha' },
  { src: '/img/line.png', alt: 'Line' },
  { src: '/img/145808.png', alt: 'Pinterest' },
  { src: '/img/map.png', alt: 'Google Maps' },
  { src: '/img/zing.png', alt: 'Zing' },
  { src: '/img/wechat.png', alt: 'WeChat' },
  { src: '/img/viber.png', alt: 'Viber' },
  { src: '/img/dv.jpg', alt: 'Dịch vụ' },
  { src: '/img/in.png', alt: 'LinkedIn' },
]

const HomePage = () => {
  const navigate = useNavigate()

  const handleIconClick = () => {
    navigate('/login')
  }

  return (
    <div className="home-page">
      <div className="background-overlay">
        <div className="icon-container">
          <h1>PHẦN MỀM QUẢN LÝ ĐIỆN THOẠI TỪ XA</h1>
          <div className="icon-grid">
            {icons.map((icon, index) => (
              <div
                key={index}
                className="icon-item"
                onClick={handleIconClick}
              >
                <img src={icon.src} alt={icon.alt} />
                <p>{icon.alt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
