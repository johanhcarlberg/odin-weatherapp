import { toDate } from "date-fns";
import { getLocationFromString, getWeather, getWeatherForecast } from "./weather";

export default class WeatherData {
    constructor(location) {
        this.location = {};
        this.location.name = location;
        this.weather = {};
        this.listeners = {};
    }

    addListener(listener, callback) {
        if (!this.listeners[listener]) {
            this.listeners[listener] = [];
        }

        if (typeof callback === 'function')
        {
            this.listeners[listener].push(callback);
        }
    }

    removeListener(listener, callback) {
        if (!this.listeners[listener]) {
            return;
        }

        this.listeners[listener] = this.listeners[listener].filter((item) => item !== callback);
    }

    emit(listener) {
        if (!this.listeners[listener]) {
            return;
        }

        for (let callback of this.listeners[listener]) {
            if (typeof callback === 'function') {
                callback();
            }
        }
    }

    async init() {
        const locations = await getLocationFromString(this.location.name)
        .catch((err) => {
            console.log(err);
        });
        this.location.country = locations[0].country;
        this.location.lat = locations[0].lat;
        this.location.lon = locations[0].lon;
        
        const [weather, forecast] = await Promise.all([
            getWeather(this.location.lat, this.location.lon),
            getWeatherForecast(this.location.lat, this.location.lon)
        ]);
        const date = new Date(weather.dt * 1000);
        this.weather.date = date;
        Object.assign(this.weather,weather.main,weather.weather[0]);
        this.forecast = forecast.list;
        console.log(this);
        this.emit('onLoad');
    }
}