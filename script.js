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

const update_weather = function (data) {
  console.log(data);
  api_data = data; // Save the API data globally

  // displaying the weather info
  display_weather_info(data);
};

const fetch_weather = function (lat, lng) {
  const api_key = "002298bf9e744f20a96141611240101";
  const request_url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${lat},${lng}`;

  fetch_data(request_url, update_weather);
};

const display_weather_info = function (data) {
  city_and_country_el.textContent = `${data.location.name}, ${data.location.country}`;
  temperature_el.textContent = `${data.current.temp_c}°C`;
  conditions_el.textContent = data.current.condition.text;
  visibility_el.textContent = `Visibility: ${data.current.vis_km}km`;
};

const read_more = function () {
  read_more_btn_el.style.display = "none";
  read_more_container.style.display = "block";

  const wind_direction = get_wind_direction(api_data.current.wind_dir);

  // displaying the 'read-more' data
  display_read_more_data(wind_direction);
};

const fetch_data = function (url, callback) {
  fetch(url)
    .then((response) => response.json())
    .then(callback)
    .catch((error) => console.error(`Error: ${error}`));
};

const get_wind_direction = function (direction) {
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
};

const display_read_more_data = function (wind_direction) {
  wind_speed_direction_el.textContent = `Wind: ${api_data.current.wind_kph}km ${wind_direction}`;
  precipitation_el.textContent = `${
    api_data.current.precip_mm == 0
      ? "Precipitation: None"
      : `Precipitation: ${api_data.current.precip_mm}mm`
  }`;
};

const get_city_data = function () {
  let formatted_search_value =
    city_search_input.value.charAt(0).toUpperCase() +
    city_search_input.value.slice(1).toLowerCase();
  const api_key = "002298bf9e744f20a96141611240101";
  const request_url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${formatted_search_value}`;

  fetch_data(request_url, update_weather);
};

// Ensure that the event listener is added after the document is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  read_more_btn_el.addEventListener("click", read_more);

  // Get user's location and fetch weather data
  navigator.geolocation.getCurrentPosition((position) => {
    lat = position.coords.latitude;
    lng = position.coords.longitude;

    fetch_weather(lat, lng);
  });
});

const display_search_results = function () {
  if (city_search_input.value === "") return;

  const formatte_city =
    city_search_input.value.charAt(0).toUpperCase() +
    city_search_input.value.slice(1).toLowerCase();

  get_city_data(formatte_city);
  display_read_more_data(api_data.current.wind_dir);
};

city_search_btn_el.addEventListener("click", display_search_results);
