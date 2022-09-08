import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/material_orange.css";

// библиотека notiflix
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  startBtn:document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
}

let selectedDatetime = null;

// объект параметров flatpickr
const datetimePicker = {
  enableTime: true, 
  time_24hr: true, 
  defaultDate: new Date(),  
  minuteIncrement: 1, 

 
  onReady() {
    refs.startBtn.setAttribute('disabled', true);
  },

  // функция при закрытии календаря
  onClose(selectedDates) {
    selectedDatetime = selectedDates[0].getTime();

    if (selectedDatetime <= Date.now()) {
      Notify.failure('Please choose a date in the future'); // notiflix notify
      refs.startBtn.setAttribute('disabled', true);
      this.open();
      return
    }

    if (refs.startBtn.hasAttribute('disabled')) {
      Notify.success('Everything is OK. You can get started countdown'); // notiflix notify
      refs.startBtn.removeAttribute('disabled')
    }
  },
};

refs.startBtn.addEventListener('click', onStartBtnClick);

// инициализация flatpickr
flatpickr('#datetime-picker', datetimePicker);

function onStartBtnClick() {
  refs.startBtn.setAttribute('disabled', true);

  const intervalId = setInterval(() => {
    if ((selectedDatetime - Date.now()) < 0) {
      clearInterval(intervalId);
      return;
      }

    const timeToSelectedDate = convertMsIntoDatetime(selectedDatetime - Date.now());
    OutputCountdown(timeToSelectedDate);
  }, 1000)
}

function convertMsIntoDatetime(milliseconds) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(milliseconds / day);
  // Remaining hours
  const hours = Math.floor((milliseconds % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((milliseconds % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((milliseconds % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}


function OutputCountdown({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}