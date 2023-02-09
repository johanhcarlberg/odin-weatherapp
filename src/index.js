import CurrentWeatherComponent from './currentWeatherComponent';
import ForecastComponent from './forecastComponent';
import './style.css';
import WeatherData from './weatherData';

const locationForm = document.querySelector('#location-form');
const locationInput = locationForm.querySelector('#location-input')
const locationError = document.querySelector('#location-error');
locationForm.addEventListener('submit', (e) => onLocationFormSubmit(e));

const weatherContentDiv = document.querySelector('.weather-content');
let currentWeatherEl = null;
let forecastEl = null;


(async () => {
    await getWeatherForLocation('Stockholm');
})();

async function getWeatherForLocation(location) {
    removeCurrentWeather();
    removeForecast();
    const weatherData = new WeatherData(location);
    addCurrentWeather(weatherData);
    addForecast(weatherData);

    await weatherData.init();
}

function addCurrentWeather(weatherData) {
    currentWeatherEl = new CurrentWeatherComponent(weatherData);
    weatherContentDiv.appendChild(currentWeatherEl);
}

function addForecast(weatherData) {
    forecastEl = new ForecastComponent(weatherData);
    weatherContentDiv.appendChild(forecastEl);
}

function removeCurrentWeather() {
    if (currentWeatherEl) {
        currentWeatherEl.remove();
    }
}

function removeForecast() {
    if (forecastEl) {
        forecastEl.remove();
    }
}

function onLocationFormSubmit(e) {
    e.preventDefault();
    locationError.textContent = '';
    const locationInputVal = locationInput.value;
    
    if (locationInputVal.length === 0) {
        locationError.textContent = 'Please enter a location';
        return;
    }

    (async () => {
        await getWeatherForLocation(locationInputVal)
        .catch((err) => {
            locationError.textContent = `Couldn't load weather data for "${locationInputVal}".`
        });
    })();
    
    
}