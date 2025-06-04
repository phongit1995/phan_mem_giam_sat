import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleIconClick = () => {
    navigate('/login');
  };

  return (
    <div className="background-overlay">
      <div className="icon-container">
        <h1>PHẦN MỀM QUẢN LÝ ĐIỆN THOẠI TỪ XA</h1>
        <div className="icon-grid">
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/fa.png" alt="Facebook" />
            <p>Facebook</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/at.png" alt="Instagram" />
            <p>Instagram</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/mess.png" alt="Messenger" />
            <p>Messenger</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/tik.png" alt="TikTok" />
            <p>TikTok</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/zalo.png" alt="Zalo" />
            <p>Zalo</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/call.png" alt="WhatsApp" />
            <p>WhatsApp</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/sky.png" alt="Skype" />
            <p>Skype</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/sn.png" alt="Snapchat" />
            <p>Snapchat</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/tele.png" alt="Telegram" />
            <p>Telegram</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/sms.png" alt="Sms" />
            <p>Sms</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/youtube.png" alt="YouTube" />
            <p>YouTube</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/mocha.png" alt="Mocha" />
            <p>Mocha</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/line.png" alt="Line" />
            <p>Line</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/145808.png" alt="Pinterest" />
            <p>Pinterest</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/map.png" alt="Google Maps" />
            <p>Google Maps</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/zing.png" alt="Zing" />
            <p>Zing</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/wechat.png" alt="WeChat" />
            <p>WeChat</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/viber.png" alt="Viber" />
            <p>Viber</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/dv.jpg" alt="Dịch vụ" />
            <p>Dịch vụ</p>
          </div>
          <div className="icon-item" onClick={handleIconClick}>
            <img src="/img/in.png" alt="LinkedIn" />
            <p>LinkedIn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
