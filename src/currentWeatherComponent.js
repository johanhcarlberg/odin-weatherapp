import { format } from "date-fns";

export default class CurrentWeatherComponent {
    constructor(weatherData) {
        this.element = document.createElement('div');
        this.element.classList.add('weather-current');
        const title = document.createElement('h3');
        title.textContent = 'Current Weather';
        this.element.appendChild(title);

        this.renderLoading();
        this.weatherData = weatherData;
        this.weatherData.addListener('onLoad', () => this.onWeatherDataLoad());

        return this.element;
    }

    onWeatherDataLoad() {
        console.log('CurrentWeatherComponent weatherData loaded');
        this.renderWeather();
    }

    renderLoading() {
        console.log(this.element);
        const weatherContent = this.element.querySelector('.current-weather-content');
        if (weatherContent) {
            weatherContent.remove();
        }

        const currentWeatherLoadingDiv = document.createElement('div');
        currentWeatherLoadingDiv.classList.add('loading');
        currentWeatherLoadingDiv.textContent = 'Loading weather...';
        this.element.appendChild(currentWeatherLoadingDiv);
    }

    renderWeather() {
        const loadingDiv = this.element.querySelector('.loading');
        if (loadingDiv) {
            loadingDiv.remove();
        } 
        const dateSpan = document.createElement('span');
        dateSpan.classList.add('current-weather-datetime');
        dateSpan.textContent = format(this.weatherData.weather.date, 'EEEE MMM. dd - HH:mm');
        this.element.appendChild(dateSpan);

        const weatherContentDiv = document.createElement('div');
        weatherContentDiv.classList.add('current-weather-content');
    
        const descSpan = document.createElement('span');
        descSpan.textContent = `${this.weatherData.weather.main} - ${this.weatherData.weather.description}`;
        weatherContentDiv.appendChild(descSpan);
    
        const tempDiv = document.createElement('div');
        tempDiv.classList.add('temperatures');
        weatherContentDiv.appendChild(tempDiv);
        const tempSpan = document.createElement('span');
        tempSpan.textContent = `Temperature: ${this.weatherData.weather.temp}`;
        tempDiv.appendChild(tempSpan);
    
        const tempMaxSpan = document.createElement('span');
        tempMaxSpan.textContent = `Maximum: ${this.weatherData.weather.temp_max}`;
        tempDiv.appendChild(tempMaxSpan);
    
        const tempMinSpan = document.createElement('span');
        tempMinSpan.textContent = `Minimum: ${this.weatherData.weather.temp_min}`;
        tempDiv.appendChild(tempMinSpan);
    
        const feelsLikeSpan = document.createElement('span');
        feelsLikeSpan.textContent = `Feels like: ${this.weatherData.weather.feels_like}`;
        tempDiv.appendChild(feelsLikeSpan);
    
        const humiditySpan = document.createElement('span');
        humiditySpan.textContent = this.weatherData.weather.humidity;
        weatherContentDiv.appendChild(humiditySpan);
    
        this.element.appendChild(weatherContentDiv);
    }
}