import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
let timerId = null;
let updateSelectedDates = null;
let timerTime = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    updateSelectedDates = selectedDates[0].getTime();
    checkDate(updateSelectedDates);
  },
};

startBtn.addEventListener('click', startTimer);

flatpickr('#datetime-picker', options);

function checkDate(updateSelectedDates) {
  if (updateSelectedDates > Date.now()) {
    startBtn.disabled = false;
  } else {
    Notiflix.Notify.failure('Please choose a date in the future');
    startBtn.disabled = true;
  }
}

function startTimer() {
  if (
    daysEl.textContent !== '00' ||
    hoursEl.textContent !== '00' ||
    minutesEl.textContent !== '00' ||
    secondsEl.textContent !== '00'
  ) {
    clearInterval(timerId);
    timerId = setInterval(runTimer, 1000, updateSelectedDates);
  } else {
    timerId = setInterval(runTimer, 1000, updateSelectedDates);
  }
}

function runTimer(updateSelectedDates) {
  timerTime = updateSelectedDates - Date.now();
  const time = convertMs(timerTime);
  renderTimer(time);
  stopTimer();
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function renderTimer(time) {
  daysEl.textContent = String(time.days).padStart(2, '0');
  hoursEl.textContent = String(time.hours).padStart(2, '0');
  minutesEl.textContent = String(time.minutes).padStart(2, '0');
  secondsEl.textContent = String(time.seconds).padStart(2, '0');
}

function stopTimer() {
  if (
    daysEl.textContent === '00' &&
    hoursEl.textContent === '00' &&
    minutesEl.textContent === '00' &&
    secondsEl.textContent === '00'
  ) {
    clearInterval(timerId);
    Notiflix.Report.failure('TIME IS OVER', 'TIME IS OVER', 'Close');
  }
}
