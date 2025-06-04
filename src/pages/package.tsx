import React, { useEffect, useState } from 'react';
import './../assets/style-package.css';

// Note: To use Tailwind CSS in a React app:
// 1. Option 1: Install via npm: npm install -D tailwindcss postcss autoprefixer
//    Then configure tailwind.config.js and import in your main CSS file
// 2. Option 2: Add the CDN script to public/index.html:
//    <script src="https://cdn.tailwindcss.com"></script>

// Package component for subscription packages
const Package: React.FC = () => {
  // Fixed activation code as specified in the JavaScript
  const FIXED_ACTIVATION_CODE = "123890";
  
  // Define subscription plans
  const plans = [
    { id: 1, name: 'MUA GÓI THUÊ BAO 1 NĂM' },
    { id: 2, name: 'MUA GÓI THUÊ BAO 2 NĂM' },
    { id: 3, name: 'MUA GÓI THUÊ BAO 5 NĂM' },
    { id: 4, name: 'MUA GÓI THUÊ BAO VĨNH VIỄN' },
  ];

  // State to track which plan has its input visible
  const [visibleInputs, setVisibleInputs] = useState<Record<number, boolean>>({});
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});
  const [progressValues, setProgressValues] = useState<Record<number, number>>({});
  const [codeInputs, setCodeInputs] = useState<Record<number, string>>({});
  
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.tailwindcss.com';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // cleanup khi rời page
    };
  }, []);

  // Toggle code input visibility
  const toggleCodeInput = (planId: number) => {
    setVisibleInputs(prev => ({
      ...prev,
      [planId]: !prev[planId]
    }));
  };

  // Handle code input change
  const handleCodeInputChange = (planId: number, value: string) => {
    setCodeInputs(prev => ({
      ...prev,
      [planId]: value
    }));
  };

  // Activate code function - updated to match provided JavaScript
  const activateCode = (planId: number) => {
    const enteredCode = codeInputs[planId] || '';
    
    if (enteredCode === FIXED_ACTIVATION_CODE) {
      // Set loading state to true for this plan
      setLoadingStates(prev => ({
        ...prev,
        [planId]: true
      }));
      
      // Reset progress
      setProgressValues(prev => ({
        ...prev,
        [planId]: 0
      }));

      // Simulate progress with setInterval - match JavaScript timing and increment
      let width = 0;
      const interval = setInterval(() => {
        width += 2; // Increment by 2% each time
        
        setProgressValues(prev => ({
          ...prev,
          [planId]: width
        }));

        if (width >= 100) {
          clearInterval(interval);
          // Redirect after 500ms delay like in the original JavaScript
          setTimeout(() => {
            window.location.href = 'https://active.giamsat88.com/';
          }, 500);
        }
      }, 100); // Run every 100ms as in the original code
    } else {
      alert('Mã kích hoạt không đúng');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-6">ĐĂNG KÝ GÓI GÓI THUÊ BAO CẬP NHẬP DỮ LIỆU</h1>

        <div className="space-y-4">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="fancy-frame mb-2">{plan.name}</h2>
              <button
                className="bg-purple-500 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out hover:bg-purple-700"
                onClick={() => toggleCodeInput(plan.id)}
              >
                Đăng Ký Ngay
              </button>
              
              {visibleInputs[plan.id] && (
                <div className="mt-2">
                  <input
                    type="password"
                    placeholder="Nhập mã"
                    className="border border-gray-300 rounded py-2 px-4 mb-2 text-black"
                    value={codeInputs[plan.id] || ''}
                    onChange={(e) => handleCodeInputChange(plan.id, e.target.value)}
                  />
                  <button
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded transition-colors duration-300 ease-in-out hover:bg-green-700"
                    onClick={() => activateCode(plan.id)}
                  >
                    Kích Hoạt
                  </button>
                  
                  {loadingStates[plan.id] && (
                    <>
                      <div className="mt-4 w-full bg-gray-300 rounded">
                        <div 
                          className="bg-green-500 h-4 rounded" 
                          style={{ width: `${progressValues[plan.id] || 0}%` }}
                        ></div>
                      </div>
                      <div className="loading-text mt-2">
                        Loading: <span id="loadingPercentage">{progressValues[plan.id] || 0}%</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Package;
