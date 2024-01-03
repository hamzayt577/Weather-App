"use strict";

const city_and_country_el = document.getElementById("location");
const temperature_el = document.getElementById("temperature");
const conditions_el = document.getElementById("conditions");
const visibility_el = document.getElementById("visibility");

let lat;
let lng;

function updateWeather(data) {
  console.log(data);

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
