let now = new Date();
console.log(now);

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let date = now.getDate();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let year = now.getFullYear();
let current = `${day}, ${month} ${date}`;
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = `${hours}:${minutes}`;
let currentDate = document.querySelector("h2");
currentDate.innerHTML = `${current}`;
let currentTime = document.querySelector("h3");
currentTime.innerHTML = `${time}`;

function showFah(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temp");
  temperatureElement.innerHTML = `${Math.round(21 * 1.8 + 32)}`;
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temp");
  temperatureElement.innerHTML = 21;
}

let fahrenheitLink = document.querySelector(".fah");
fahrenheitLink.addEventListener("click", showFah);

let celsiusLink = document.querySelector(".celsius");
celsiusLink.addEventListener("click", showCelsius);

function displayWeatherCondition(response) {
  console.log(response);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let currentTemp = document.querySelector(".current-temp");
  let temp = Math.round(response.data.main.temp);
  currentTemp.innerHTML = `${temp}`;

  let humidity = document.querySelector("#humidity-value");
  humidity.innerHTML = `${response.data.main.humidity}`;
  let wind = document.querySelector("#wind-value");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;

  let description = document.querySelector(".descriptor");
  description.innerHTML = `${response.data.weather[0].main}`;
}

function searchCity(currentCity) {
  let apiKey = "a867e25f2d83db579421a57fd8e937ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function typeCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#input-city").value;
  searchCity(currentCity);
}

let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", typeCity);

function showPosition(position) {
  let lat = `${position.coords.latitude}`;
  let lon = `${position.coords.longitude}`;
  let apiKey = "a867e25f2d83db579421a57fd8e937ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLoc = document.querySelector("#current-loc");
currentLoc.addEventListener("click", getCurrentPosition);

searchCity("Perth");
