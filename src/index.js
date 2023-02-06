import './style.css';
import { getWeather, getLocationFromString } from './weather';

console.log('script.js loaded');

const locationForm = document.querySelector('#location-form');
const locationInput = locationForm.querySelector('#location-input')
const locationError = document.querySelector('#location-error');
locationForm.addEventListener('submit', (e) => onLocationFormSubmit(e));

(async () => {
    await getWeatherForLocation('Stockholm');
})();

async function getWeatherForLocation(location) {
    const locations = await getLocationFromString(location)
    .catch((err) => {
        console.log(err);
    });
    const weather = await getWeather(locations[0].lat, locations[0].lon)
    .catch((err) => {

    })
    console.log(weather);
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
            locationError.textContent = "Couldn't find weather for searched location";
        });
    })();
    
    
}