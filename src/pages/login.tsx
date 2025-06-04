import React, { useState, useEffect, useRef } from 'react';
import './../assets/main.css';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  // State for form inputs
  const [phoneCode, setPhoneCode] = useState<string>("+84");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [softwareCode, setSoftwareCode] = useState<string>("");
  const navigate = useNavigate();
  
  // State for loading and progress
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  
  // Ref for the seeding container
  const seedingBoxRef = useRef<HTMLUListElement>(null);
  
  // Seeding data
  const seedingData = [
    "0901.234.xxx",
    "0902.345.xxx",
    "0903.456.xxx",
    "0904.567.xxx",
    "0905.678.xxx",
    "0906.789.xxx",
    "0907.890.xxx",
    "0908.901.xxx",
    "0909.123.xxx",
    "0910.234.xxx",
    "0911.345.xxx",
    "0912.456.xxx",
    "0913.567.xxx",
    "0914.678.xxx",
    "0915.789.xxx",
    "0916.890.xxx",
    "0917.901.xxx",
    "0918.123.xxx",
    "0919.234.xxx",
    "0920.345.xxx",
    "0921.456.xxx",
    "0922.567.xxx",
    "0923.678.xxx",
    "0924.789.xxx",
    "0925.890.xxx",
    "0926.901.xxx",
    "0927.123.xxx",
    "0928.234.xxx",
    "0929.345.xxx",
    "0930.456.xxx"
  ];

  // Effect for seeding animation
  useEffect(() => {
    const seedingItems = seedingData.map(number => 
      `<li>Tài khoản: ${number} - Đã Kích Hoạt Thành Công</li>`
    ).join('');
    
    if (seedingBoxRef.current) {
      seedingBoxRef.current.innerHTML = seedingItems;
      
      let currentTop = 0;
      const lineHeight = 22;
      const totalLines = seedingData.length;
      
      const interval = setInterval(() => {
        if (seedingBoxRef.current) {
          currentTop -= lineHeight;
          if (Math.abs(currentTop) >= lineHeight * totalLines) {
            currentTop = 0;
          }
          seedingBoxRef.current.style.top = `${currentTop}px`;
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, []);

  // Handle form input changes
  const handlePhoneCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPhoneCode(e.target.value);
  };
  
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };
  
  const handleSoftwareCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSoftwareCode(e.target.value);
  };
  
  // Handle login
  const handleLogin = () => {
    if (!phoneNumber.trim() || !softwareCode.trim()) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    
    const FIXED_PASS = "111222";
    if (softwareCode !== FIXED_PASS) {
      alert("Mã phần mềm (pass) không đúng!");
      return;
    }
    
    // Start loading animation
    setIsLoading(true);
    setProgress(0);
    
    const totalTime = 5000;
    const steps = 100;
    const intervalTime = totalTime / steps;
    
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        navigate("/package");
      }
    }, intervalTime);
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
        <select 
          id="phoneCode" 
          value={phoneCode}
          onChange={handlePhoneCodeChange}
        >
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
        <input 
          type="text" 
          id="phoneNumber" 
          placeholder="Nhập số điện thoại" 
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="softwareCode">Mã phần mềm (pass)</label>
        <input 
          type="password" 
          id="softwareCode" 
          placeholder="Nhập mã phần mềm" 
          value={softwareCode}
          onChange={handleSoftwareCodeChange}
        />
      </div>

      <button className="login-btn" onClick={handleLogin}>ĐĂNG NHẬP</button>

      {/* Khu vực seeding với hiệu ứng cuộn */}
      <div className="seeding" id="seedingContainer">
        <ul ref={seedingBoxRef}></ul>
      </div>

      {/* Overlay loading (che toàn màn hình) */}
      <div className="loading-overlay" style={{ visibility: isLoading ? 'visible' : 'hidden' }}>
        <div className="loading-content">
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text">{progress}%</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
