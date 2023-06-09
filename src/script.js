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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="weather-forecast-day">${formatDay(forecastDay.dt)}
          </div>
          <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              width="42"
            />
          <div class="weather-forecast-temps">
                  <span class="weather-forecast-temp-max"> ${Math.round(
                    forecastDay.temp.max
                  )}° </span>
                  <span class="weather-forecast-temp-min"> ${Math.round(
                    forecastDay.temp.min
                  )}° </span>
          </div>
      </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "a867e25f2d83db579421a57fd8e937ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  console.log(response);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;
  let currentTemp = document.querySelector(".current-temp");

  celsiusTemperature = response.data.main.temp;

  let temp = Math.round(celsiusTemperature);
  currentTemp.innerHTML = `${temp}`;

  let humidity = document.querySelector("#humidity-value");
  humidity.innerHTML = `${response.data.main.humidity}`;
  let wind = document.querySelector("#wind-value");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;

  let description = document.querySelector(".descriptor");
  description.innerHTML = `${response.data.weather[0].main}`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  getForecast(response.data.coord);
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

function showFah(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  temperatureElement.innerHTML = `${Math.round(
    (celsiusTemperature * 9) / 5 + 32
  )}`;
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fah");
fahrenheitLink.addEventListener("click", showFah);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

let celsiusTemperature = null;

let currentLoc = document.querySelector("#current-loc");
currentLoc.addEventListener("click", getCurrentPosition);

searchCity("Perth");
