import Swal from 'sweetalert2'

const dateSelectorRef = document.querySelector("#date-selector");

const startButton = document.querySelector("[data-start]");

startButton.setAttribute("disabled", true);

const refs = {
  daysEl: document.querySelector("[data-days]"),
  hoursEl: document.querySelector("[data-hours]"),
  minutesEl: document.querySelector("[data-minutes]"),
  secondsEl: document.querySelector("[data-seconds]"),
}

let intervalId = null;
let currentDate = 0;
let choosenDate = 0;
let gapTime = 0;

function startTimer() {
  currentDate = Date.now();
  gapTime = choosenDate - currentDate;

  if (gapTime > 0) {
      intervalId = setInterval(() => {
          currentDate = Date.now();
          gapTime = choosenDate - currentDate;
          let { days, hours, minutes, seconds } = convertMs(gapTime);

          if (gapTime >= 0) {
            refs.daysEl.textContent = pad(days);
            refs.hoursEl.textContent = pad(hours);
            refs.minutesEl.textContent = pad(minutes);
            refs.secondsEl.textContent = pad(seconds);

          } else {
              clearInterval(intervalId);
          }

      }, 1000)
  };
};

startButton.addEventListener("click", startTimer);

function inputTimer(e) {
  currentDate = Date.now();
  choosenDate = Date.parse(e.target.value);
  gapTime = choosenDate - currentDate;

  if (gapTime < 0) {
    new Swal({
      text: 'Please choose a date in the future',
    });
  } else {
    startButton.removeAttribute("disabled", true);
  };
};

function clearInt() {
  clearInterval(intervalId);
};

function pad(value) {
  return String(value).padStart(2, '0');
};

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

dateSelectorRef.addEventListener("input", inputTimer);
dateSelectorRef.addEventListener("click", clearInt);