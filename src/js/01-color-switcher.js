const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  };


const changeBgColor = () => {
    console.log('меняем цвет');
    document.body.style.backgroundColor = getRandomHexColor ();
};

startButtonOn = true;
let intervalId = null;

const startChangeColor = () => {
    if (startButtonOn) {
        startButtonOn = false;
        intervalId = setInterval(changeBgColor, 2000);
    }
}

const stopChangeColor = () => {
    if (!startButtonOn) {
        startButtonOn = true;
        clearInterval(intervalId);
    }
}

startButton.addEventListener('click', startChangeColor);
stopButton.addEventListener('click', stopChangeColor);
