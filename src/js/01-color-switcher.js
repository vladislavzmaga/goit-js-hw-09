const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;

startBtn.disabled = false;

startBtn.addEventListener('click', onUpdateBodyBackground);
stopBtn.addEventListener('click', stopUpdateBodyColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onUpdateBodyBackground() {
  startBtn.disabled = true;
  timerId = setInterval(onBodyBackground, 1000);
}

function onBodyBackground() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function stopUpdateBodyColor() {
  startBtn.disabled = false;
  clearInterval(timerId);
}
