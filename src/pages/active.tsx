import React, { useState, useEffect } from 'react';
import './../assets/style-package.css'; // Using the same style file as package.tsx

const Active: React.FC = () => {
  const [countdownTime, setCountdownTime] = useState<number>(300); // 5 minutes in seconds
  const [showAlert, setShowAlert] = useState<boolean>(false);

  // Load Tailwind CSS
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Countdown timer effect
  useEffect(() => {
    // Skip if already at 0
    if (countdownTime <= 0) return;

    const timer = setInterval(() => {
      setCountdownTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setShowAlert(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countdownTime]);

  // Calculate time units
  const days = Math.floor(countdownTime / (24 * 60 * 60));
  const hours = Math.floor((countdownTime % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((countdownTime % (60 * 60)) / 60);
  const seconds = countdownTime % 60;

  // Format numbers to have leading zeros
  const formatNumber = (num: number): string => num.toString().padStart(2, '0');

  return (
    <div 
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('https://i.pinimg.com/736x/34/84/52/3484528fb79435d441d90b46c7794cf1.jpg')" }}
    >
      {/* Countdown timer */}
      {!showAlert && (
        <div className="text-center text-white">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">HỆ THỐNG ĐANG TRUYỀN TẢI DỮ LIỆU VUI LÒNG CHỜ TRONG ÍT PHÚT:</h1>
          <div className="flex justify-center space-x-2 md:space-x-4">
            <div className="bg-teal-600 p-4 rounded-lg">
              <div className="text-2xl md:text-4xl font-bold">{days}</div>
              <div className="text-sm md:text-lg">Ngày</div>
            </div>
            <div className="bg-teal-600 p-4 rounded-lg">
              <div className="text-2xl md:text-4xl font-bold">{formatNumber(hours)}</div>
              <div className="text-sm md:text-lg">Giờ</div>
            </div>
            <div className="bg-teal-600 p-4 rounded-lg">
              <div className="text-2xl md:text-4xl font-bold">{formatNumber(minutes)}</div>
              <div className="text-sm md:text-lg">Phút</div>
            </div>
            <div className="bg-teal-600 p-4 rounded-lg">
              <div className="text-2xl md:text-4xl font-bold">{formatNumber(seconds)}</div>
              <div className="text-sm md:text-lg">Giây</div>
            </div>
          </div>
        </div>
      )}

      {/* Alert message */}
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
            <img 
              src="https://i.pinimg.com/736x/d5/3d/1d/d53d1da070cc5d57caf512636ee01c00.jpg" 
              alt="Tick xanh" 
              className="w-32 h-32 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">DONE</h2>
            <p className="text-lg mb-4">Quý khách đã xâm nhập thành công<br/>Vui lòng liên hệ bộ phận an ninh bảo mật để kích hoạt vào sử dụng</p>
            <button 
              className="mt-2 px-4 py-2 bg-gray-200 rounded"
              onClick={() => setShowAlert(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Active;
