import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let userData = null;
let intervalId = null;
let deltaTime;

startBtn.addEventListener('click', timerStart);
startBtn.disable = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userData = selectedDates[0];
        if (selectedDates[0] <= Date.now()) {
            Notiflix.Notify.warning('Please choose a date in the future');
            
            startBtn.disable = true;
            // alert("Please choose a date in the future");
            timerStop()
        }
        startBtn.disable = false;
  },
};
flatpickr(input, options);

function timerStart() {
    const startTime = userData.getTime();
     console.log(deltaTime);
    intervalId = setInterval(() => {
        deltaTime = startTime - Date.now();
        const timeComponents = convertMs(deltaTime);
       
        const { days, hours, minutes, seconds } = timeComponents;
        dataDays.textContent = `${days}`;
        dataHours.textContent = `${hours}`;
        dataMinutes.textContent = `${minutes}`;
        dataSeconds.textContent = `${seconds}`;
        timerStop();
    }, 1000);
    startBtn.disable = true;
    input.disable = true;
};
function timerStop() {
    if (deltaTime <= 0) {
        clearInterval(intervalId);
    };
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}