function formatDate(timestamp) {
  let currentDay = new Date(timestamp);
  let hours = currentDay.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDay.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let date = currentDay.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let year = currentDay.getFullYear();
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[currentDay.getMonth()];
  return `${date} /${month} /${year}  ${hours}:${minutes}`;
}
function currentTemp(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#weather-icon");
  let dateElement = document.querySelector("#date");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
}
function displayForecast(response) {
  console.log(response.data);
}

let apiKey = `88493d926515e36fa055dfe27bbb8ecd`;
let city = `Raasiku`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(currentTemp);

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `88493d926515e36fa055dfe27bbb8ecd`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemp);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

function searchCity(city) {
  let apiKey = `88493d926515e36fa055dfe27bbb8ecd`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function cityInput(event) {
  event.preventDefault();
  let city = document.querySelector("#text-input").value;
  searchCity(city);
}

function fahrenheitTemp(event) {
  event.preventDefault();
  let fahrTemperature = celsiusTemperature * 1.8 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrTemperature);
}

function celsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-city");
form.addEventListener("submit", cityInput);

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", fahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", celsiusTemp);
