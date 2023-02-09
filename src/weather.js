const APPID = process.env.APPID;
const GEO_API_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const BASE_API_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_API_URL = `${BASE_API_URL}/weather`;
const FORECAST_API_URL = `${BASE_API_URL}/forecast`

export async function getLocationFromString(location) {
    const query = `${GEO_API_URL}?q=${location}&appid=${APPID}`;
    const response = await fetch(query, {mode: 'cors'});
    if (!response.ok) {
        throw new Error('Error fetching location data');
    }
    const result = await response.json();
    return result;
}

export async function getWeather(lat, lon) {
    const query = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${APPID}`;
    const response = await fetch(query, {mode: 'cors'});
    if (!response.ok) {
        throw new Error('Error fetching weather data');
    }
    const result = await response.json();
    return result;
}

export async function getWeatherForecast(lat, lon) {
    const query = `${FORECAST_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${APPID}`;
    const response = await fetch(query, {mode: 'cors'});
    if (!response.ok) {
        throw new Error('Error fetching weather forecast data');
    }
    const result = await response.json();
    return result;
}