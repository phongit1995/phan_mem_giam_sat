// Mảng chứa toàn bộ các số seeding hợp lý hơn
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

// Sau khi trang tải xong, ta bắt đầu xử lý
window.onload = function() {
  loadSeeding();
};

// Hàm loadSeeding(): tạo các thẻ <li> cho từng dòng seeding
function loadSeeding() {
  const seedingBox = document.getElementById('seedingBox');

  // Tạo <li> cho từng số trong seedingData
  seedingData.forEach(number => {
      const li = document.createElement('li');
      li.textContent = `Tài khoản: ${number} - Đã Kích Hoạt Thành Công`;
      seedingBox.appendChild(li);
  });

  // Bắt đầu chạy hiệu ứng cuộn
  startScrolling();
}

// startScrolling(): thiết lập vòng lặp cuộn
function startScrolling() {
  const seedingBox = document.getElementById('seedingBox');
  let currentTop = 0;
  const lineHeight = 22; // Điều chỉnh chiều cao mỗi dòng cho phù hợp với mobile
  const totalLines = seedingData.length;
  const scrollInterval = 1000;

  function scrollStep() {
      currentTop -= lineHeight;
      if (Math.abs(currentTop) >= lineHeight * totalLines) {
          currentTop = 0;
      }
      seedingBox.style.top = currentTop + "px";
  }

  setInterval(scrollStep, scrollInterval);
}

// Hàm login(): kiểm tra pass, nếu đúng => hiển thị loading 5s => chuyển trang
function login() {
  const phoneCode = document.getElementById('phoneCode').value;
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const softwareCode = document.getElementById('softwareCode').value.trim();

  if (!phoneNumber || !softwareCode) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
  }

  const FIXED_PASS = "111222";
  if (softwareCode !== FIXED_PASS) {
      alert("Mã phần mềm (pass) không đúng!");
      return;
  }

  showLoadingAndRedirect();
}

// Hàm hiển thị overlay loading và đếm từ 0% đến 100% trong 5s
function showLoadingAndRedirect() {
  const overlay = document.getElementById('loadingOverlay');
  overlay.style.visibility = 'visible';

  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');

  let percent = 0;
  const totalTime = 5000;
  const steps = 100;
  const intervalTime = totalTime / steps;

  const interval = setInterval(() => {
      percent++;
      progressBar.style.width = percent + '%';
      progressText.textContent = percent + '%';

      if (percent >= 100) {
          clearInterval(interval);
          window.location.href = "/package";
      }
  }, intervalTime);
}