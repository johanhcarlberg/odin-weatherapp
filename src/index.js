import CurrentWeatherComponent from './currentWeatherComponent';
import './style.css';
import { getWeather, getLocationFromString, getWeatherForecast } from './weather';
import WeatherData from './weatherData';

console.log('script.js loaded');

const locationForm = document.querySelector('#location-form');
const locationInput = locationForm.querySelector('#location-input')
const locationError = document.querySelector('#location-error');
locationForm.addEventListener('submit', (e) => onLocationFormSubmit(e));

const weatherContentDiv = document.querySelector('.weather-content');
const forecastDiv = document.querySelector('.weather-forecast');
let currentWeatherEl = null;


(async () => {
    await getWeatherForLocation('Stockholm');
})();

async function getWeatherForLocation(location) {
    removeCurrentWeather();
    const weatherData = new WeatherData(location);
    addCurrentWeather(weatherData);

    await weatherData.init();
    const forecastLoadingDiv = document.createElement('div');
    forecastLoadingDiv.classList.add('loading');
    forecastLoadingDiv.textContent = 'Loading forecast...';
    forecastDiv.appendChild(forecastLoadingDiv);
}

function addCurrentWeather(weatherData) {
    currentWeatherEl = new CurrentWeatherComponent(weatherData);
    weatherContentDiv.appendChild(currentWeatherEl);
}

function removeCurrentWeather() {
    if (currentWeatherEl) {
        currentWeatherEl.remove();
    }
}

function onLocationFormSubmit(e) {
    e.preventDefault();
    locationError.textContent = '';
    const locationInputVal = locationInput.value;
    console.log(locationInputVal);
    if (locationInputVal.length === 0) {
        locationError.textContent = 'Please enter a location';
        return;
    }

    (async () => {
        await getWeatherForLocation(locationInputVal)
        .catch((err) => {
            console.log(err);
        });
    })();
    
    
}