import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './../assets/main.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const seedingBoxRef = useRef<HTMLUListElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [seedingData] = useState<string[]>([
    "Người dùng +84987***456 đã đăng nhập thành công",
    "Người dùng +84912***789 đã đăng nhập thành công",
    "Người dùng +84903***123 đã đăng nhập thành công",
    "Người dùng +84976***234 đã đăng nhập thành công",
    "Người dùng +84933***567 đã đăng nhập thành công",
    "Người dùng +84965***890 đã đăng nhập thành công",
    "Người dùng +84909***321 đã đăng nhập thành công",
    "Người dùng +84977***654 đã đăng nhập thành công",
    "Người dùng +84922***987 đã đăng nhập thành công",
    "Người dùng +84955***210 đã đăng nhập thành công",
    "Người dùng +84901***543 đã đăng nhập thành công",
    "Người dùng +84988***876 đã đăng nhập thành công",
  ]);

  // Hiệu ứng cuộn seeding
  useEffect(() => {
    if (!seedingBoxRef.current) return;

    // Tạo các phần tử li cho seedingBox
    seedingData.forEach(text => {
      const li = document.createElement('li');
      li.textContent = text;
      seedingBoxRef.current?.appendChild(li);
    });

    let position = 0;
    const totalHeight = seedingBoxRef.current.scrollHeight;
    const visibleHeight = 200; // Chiều cao của container

    // Hàm cuộn
    const scrollSeeding = () => {
      if (!seedingBoxRef.current) return;
      
      position += 1;
      if (position > totalHeight - visibleHeight) {
        position = 0;
      }
      
      seedingBoxRef.current.style.top = `-${position}px`;
    };

    // Thiết lập interval cho hiệu ứng cuộn
    const interval = setInterval(scrollSeeding, 50);
    
    return () => clearInterval(interval);
  }, [seedingData]);

  // Xử lý đăng nhập
  const handleLogin = () => {
    const loadingOverlay = document.getElementById('loadingOverlay');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (loadingOverlay && progressBar && progressText) {
      // Hiển thị overlay
      loadingOverlay.style.visibility = 'visible';
      
      // Thiết lập tiến trình
      let currentProgress = 0;
      setProgress(0);
      
      const progressInterval = setInterval(() => {
        currentProgress += 1;
        setProgress(currentProgress);
        
        progressBar.style.width = `${currentProgress}%`;
        progressText.textContent = `${currentProgress}%`;
        
        if (currentProgress >= 100) {
          clearInterval(progressInterval);
          // Chuyển hướng sau khi hoàn thành
          setTimeout(() => {
            loadingOverlay.style.visibility = 'hidden';
            navigate('/active'); // Chuyển đến trang active
          }, 500);
        }
      }, 30);
    }
  };

  return (
    <div className="container">
      {/* Dòng chữ trên cùng */}
      <h2>UY TÍN - CHUYÊN NGHIỆP - BẢO MẬT</h2>
      <h1>ĐĂNG NHẬP HỆ THỐNG</h1>

      {/* Các biểu tượng */}
      <div className="icons">
        <img src="https://i.pinimg.com/236x/20/35/96/20359662fcd835fa8637bdee18ad6697.jpg" alt="Telegram" />
        <img src="https://i.pinimg.com/236x/af/af/3d/afaf3d4a4f52a929ef28ed9c704240fa.jpg" alt="Zalo" />
        <img src="https://i.pinimg.com/236x/aa/99/b6/aa99b649154c1025ff11776a70309d24.jpg" alt="Messenger" />
      </div>

      {/* Form nhập số điện thoại và mã phần mềm */}
      <div className="form-group">
        <label htmlFor="phoneCode">Số điện thoại cần theo dõi:</label>
        <select id="phoneCode">
          <option value="+84">Việt Nam (+84)</option>
          <option value="+1">Mỹ (+1)</option>
          <option value="+44">Anh (+44)</option>
          <option value="+81">Nhật Bản (+81)</option>
          <option value="+82">Hàn Quốc (+82)</option>
          <option value="+86">Trung Quốc (+86)</option>
          <option value="+61">Úc (+61)</option>
          <option value="+33">Pháp (+33)</option>
          <option value="+49">Đức (+49)</option>
          <option value="+39">Ý (+39)</option>
          <option value="+7">Nga (+7)</option>
          <option value="+34">Tây Ban Nha (+34)</option>
          <option value="+46">Thụy Điển (+46)</option>
          <option value="+41">Thụy Sĩ (+41)</option>
          <option value="+90">Thổ Nhĩ Kỳ (+90)</option>
          <option value="+971">UAE (+971)</option>
          <option value="+91">Ấn Độ (+91)</option>
          <option value="+62">Indonesia (+62)</option>
          <option value="+60">Malaysia (+60)</option>
          <option value="+65">Singapore (+65)</option>
          <option value="+66">Thái Lan (+66)</option>
          <option value="+64">New Zealand (+64)</option>
          <option value="+55">Brazil (+55)</option>
          <option value="+54">Argentina (+54)</option>
          <option value="+57">Colombia (+57)</option>
          <option value="+52">Mexico (+52)</option>
          <option value="+358">Phần Lan (+358)</option>
          <option value="+47">Na Uy (+47)</option>
          <option value="+48">Ba Lan (+48)</option>
          <option value="+351">Bồ Đào Nha (+351)</option>
          <option value="+386">Slovenia (+386)</option>
          <option value="+381">Serbia (+381)</option>
          <option value="+357">Síp (Cyprus) (+357)</option>
          <option value="+30">Hy Lạp (+30)</option>
          <option value="+45">Đan Mạch (+45)</option>
          <option value="+32">Bỉ (+32)</option>
        </select>
        <input type="text" id="phoneNumber" placeholder="Nhập số điện thoại" />
      </div>

      <div className="form-group">
        <label htmlFor="softwareCode">Mã phần mềm (pass)</label>
        <input type="password" id="softwareCode" placeholder="Nhập mã phần mềm" />
      </div>

      <button className="login-btn" onClick={handleLogin}>ĐĂNG NHẬP</button>

      {/* Khu vực seeding với hiệu ứng cuộn */}
      <div className="seeding" id="seedingContainer">
        <ul id="seedingBox" ref={seedingBoxRef}></ul>
      </div>

      {/* Overlay loading (che toàn màn hình) */}
      <div className="loading-overlay" id="loadingOverlay">
        <div className="loading-content">
          <div className="progress-container">
            <div className="progress-bar" id="progressBar" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text" id="progressText">{progress}%</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
