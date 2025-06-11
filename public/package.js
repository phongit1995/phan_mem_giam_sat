const FIXED_ACTIVATION_CODE = "Y3399";

function toggleCodeInput(button) {
  const codeInputDiv = button.nextElementSibling;
  codeInputDiv.classList.toggle('hidden');
}

function activateCode(button) {
  const input = button.previousElementSibling;
  if (input.value === FIXED_ACTIVATION_CODE) {
    const progressContainer = button.nextElementSibling;
    const progressBar = progressContainer.firstElementChild;
    const loadingText = progressContainer.nextElementSibling;
    const loadingPercentage = loadingText.querySelector('#loadingPercentage');

    progressContainer.classList.remove('hidden');
    loadingText.style.display = 'block';

    let width = 0;
    const interval = setInterval(() => {
      width += 2;
      progressBar.style.width = width + '%';
      loadingPercentage.textContent = width + '%';

      if (width >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          window.location.href = '/active';
        }, 500);
      }
    }, 100);
  } else {
    alert('Mã kích hoạt không đúng');
  }
}
