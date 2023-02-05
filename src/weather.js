const API_KEY = process.env.API_KEY;
const GEO_API_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function getLocationFromString(location) {
    const query = `${GEO_API_URL}?q=${location}&appid=${API_KEY}`;
    const response = await fetch(query);
    const result = await response.json();
    return result;
}

export async function getWeather(lat, lon) {
    const query = `${WEATHER_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    const response = await fetch(query);
    const result = await response.json();
    return result;
}