// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



const dateSelectionField = document.querySelector("#datetime-picker");
const btnStart = document.querySelector("#data-start");

let userSelectedDate = null;
let timerInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDay = new Date();

    if (selectedDate <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      btnStart.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      btnStart = false;
    }
    },
  };

 
flatpickr("#datetime-picker", options);

btnStart.addEventListener('clikc', () => {
  btnStart.disabled = true;
  dateSelectionField.disabled = true;
}

