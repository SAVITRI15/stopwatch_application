let startTime, intervalId;
let elapsedTime = 0;
let isRunning = false;

const display = document.getElementById("display");
const laps = document.getElementById("laps");

function formatTime(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");
  const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, "0");
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateTime() {
  const now = Date.now();
  elapsedTime = now - startTime;
  display.textContent = formatTime(elapsedTime);
}

document.getElementById("start").addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 10);
    isRunning = true;
  }
});

document.getElementById("pause").addEventListener("click", () => {
  if (isRunning) {
    clearInterval(intervalId);
    isRunning = false;
  }
});

document.getElementById("reset").addEventListener("click", () => {
  clearInterval(intervalId);
  elapsedTime = 0;
  isRunning = false;
  display.textContent = "00:00:00";
  laps.innerHTML = "";
});

document.getElementById("lap").addEventListener("click", () => {
  if (isRunning) {
    const li = document.createElement("li");
    li.textContent = formatTime(elapsedTime);
    laps.appendChild(li);
  }
});
