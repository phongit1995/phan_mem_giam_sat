
const iconItems = document.querySelectorAll('.icon-item');

iconItems.forEach(item => {
  item.addEventListener('click', () => {
    // Chuyển hướng khi click
    window.location.href = "/login";
  });
});

