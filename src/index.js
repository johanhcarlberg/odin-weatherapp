const { getWeather, getLocationFromString } = require("./weather");

console.log('script.js loaded');

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