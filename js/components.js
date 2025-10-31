// components.js - for components.html

// DIGITAL CLOCK
function updateClock() {
  const clock = document.getElementById("clock");
  if (!clock) return;
  const now = new Date();
  clock.textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);

// TIMER
let timerInterval;
let seconds = 0;
const timerDisplay = document.getElementById("timerDisplay");
const startTimer = document.getElementById("startTimer");
const stopTimer = document.getElementById("stopTimer");
const resetTimer = document.getElementById("resetTimer");

if (startTimer) {
  startTimer.addEventListener("click", () => {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
      seconds++;
      const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
      const secs = String(seconds % 60).padStart(2, "0");
      timerDisplay.textContent = `${mins}:${secs}`;
    }, 1000);
  });

  stopTimer.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
  });

  resetTimer.addEventListener("click", () => {
    clearInterval(timerInterval);
    timerInterval = null;
    seconds = 0;
    timerDisplay.textContent = "00:00";
  });
}

// CALCULATOR
const calcDisplay = document.getElementById("calcDisplay");
const buttons = document.querySelectorAll(".btn");
let calcInput = "";

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.textContent;
    if (value === "C") {
      calcInput = "";
      calcDisplay.value = "";
    } else if (value === "=") {
      try {
        calcDisplay.value = eval(calcInput) || "";
        calcInput = calcDisplay.value;
      } catch {
        calcDisplay.value = "Error";
        calcInput = "";
      }
    } else {
      calcInput += value;
      calcDisplay.value = calcInput;
    }
  });
});

// ===== Weather Component =====

const apiKey = "95bdd1e739c5293969183ddb6bb5a3f8"; 

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }

  getWeather(city);
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    alert(error.message);
  }
}

function displayWeather(data) {
  document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("temperature").textContent = `🌡️ ${data.main.temp.toFixed(1)}°C`;
  document.getElementById("description").textContent =
    data.weather[0].description.replace(/\b\w/g, c => c.toUpperCase());
}