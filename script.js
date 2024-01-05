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
  city_and_country_el.textContent = `${data.location.name}, ${data.location.country}`;
  temperature_el.textContent = `${data.current.temp_c}°C`;
  conditions_el.textContent = data.current.condition.text;
  visibility_el.textContent = `Visibility: ${data.current.vis_km}km`;
}

function fetchWeather(lat, lng) {
  const api_key = "002298bf9e744f20a96141611240101";
  const example_url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${lat},${lng}`;

  fetch(example_url)
    .then((response) => response.json())
    .then(updateWeather)
    .catch((error) => console.error(`Error: ${error}`));
}

navigator.geolocation.getCurrentPosition((position) => {
  lat = position.coords.latitude;
  lng = position.coords.longitude;

  fetchWeather(lat, lng);
});

function read_more() {
  read_more_btn_el.style.display = "none";
  read_more_container.style.display = "block";

  const wind_direction =
    api_data.current.wind_dir === "W"
      ? "West"
      : api_data.current.wind_dir === "S"
      ? "South"
      : api_data.current.wind_dir === "E"
      ? "East"
      : api_data.current.wind_dir === "N"
      ? "North"
      : "";

  // displaying the 'read-more' data
  // Format should be wind speed then direction (eg: 2km south)
  wind_speed_direction_el.textContent = `Wind: ${api_data.current.wind_kph}km ${wind_direction}`;
  precipitation_el.textContent = `${
    api_data.current.precip_mm == 0
      ? "Precipitation: None"
      : api_data.current.precip_mm + "mm"
  }`;
}

read_more_btn_el.addEventListener("click", read_more);
