// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



const dateSelectedField = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("button[data-start]");

let userSelectedDate = null;
btnStart.disabled = true;
let countDownInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    if (selectedDate <= now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      btnStart.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      btnStart.disabled = false;
    }
  },
};

 
flatpickr("#datetime-picker", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
btnStart.addEventListener("click", startCountDown);

function startCountDown() {
    btnStart.disabled = true;
    dateSelectedField.disabled = true;
  
  countDownInterval = setInterval(() => {
    const now = new Date();
    const deltaTime = userSelectedDate - now;
    if (deltaTime <= 0) {
      clearInterval(countDownInterval);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      dateSelectedField.disabled = false;
      return;
    }
    const time = convertMs(deltaTime);
    updateTimerDisplay(time);
  }, 1000);
}
function updateTimerDisplay({ days, hours, minutes, seconds }) {
  document.querySelector('span[data-days]').textContent = addLeadingZero(days);
  document.querySelector('span[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('span[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('span[data-seconds]').textContent = addLeadingZero(seconds);
}











