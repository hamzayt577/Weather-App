"use strict";

const city_and_country_el = document.getElementById("location");
const temperature_el = document.getElementById("temperature");
const conditions_el = document.getElementById("conditions");
const visibility_el = document.getElementById("visibility");

const read_more_btn_el = document.getElementById("read-more-btn");
const read_more_container = document.getElementById("read-more-container");
const highest_temp_el = document.getElementById("highest-temp");
const lowest_temp_el = document.getElementById("lowest-temp");
const wind_speed_direction_el = document.getElementById("wind-speed-direction");
const precipitation_el = document.getElementById("precipitation");

const search_container = document.getElementById("search-container");
const city_search_input = document.getElementById("city-search");
const city_search_btn_el = document.getElementById("search-btn");

let lat;
let lng;
let api_data; // Variable to store the API data

function updateWeather(data) {
  console.log(data);
  api_data = data; // Save the API data globally

  // displaying the weather info
  displayWeatherInfo(data);
}

function fetchWeather(lat, lng) {
  const api_key = "002298bf9e744f20a96141611240101";
  const example_url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${lat},${lng}`;

  fetchData(example_url, updateWeather);
}

function displayWeatherInfo(data) {
  city_and_country_el.textContent = `${data.location.name}, ${data.location.country}`;
  temperature_el.textContent = `${data.current.temp_c}°C`;
  conditions_el.textContent = data.current.condition.text;
  visibility_el.textContent = `Visibility: ${data.current.vis_km}km`;
}

function read_more() {
  read_more_btn_el.style.display = "none";
  read_more_container.style.display = "block";

  const wind_direction = getWindDirection(api_data.current.wind_dir);

  // displaying the 'read-more' data
  displayReadMoreData(wind_direction);
}

function fetchData(url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then(callback)
    .catch((error) => console.error(`Error: ${error}`));
}

function getWindDirection(direction) {
  switch (direction) {
    case "W":
      return "West";
    case "S":
      return "South";
    case "E":
      return "East";
    case "N":
      return "North";
    default:
      return "";
  }
}

function displayReadMoreData(wind_direction) {
  wind_speed_direction_el.textContent = `Wind: ${api_data.current.wind_kph}km ${wind_direction}`;
  precipitation_el.textContent = `${
    api_data.current.precip_mm == 0
      ? "Precipitation: None"
      : api_data.current.precip_mm + "mm"
  }`;
}

// Ensure that the event listener is added after the document is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  read_more_btn_el.addEventListener("click", read_more);

  // Get user's location and fetch weather data
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    fetchWeather(lat, lng);
  });
});
