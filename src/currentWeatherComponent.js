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
        this.renderWeather();
    }

    renderLoading() {
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
        const locationSpan = document.createElement('span');
        locationSpan.classList.add('current-weather-location');
        locationSpan.textContent = this.weatherData.location.name;
        this.element.appendChild(locationSpan);

        const dateSpan = document.createElement('span');
        dateSpan.classList.add('current-weather-datetime');
        dateSpan.textContent = format(this.weatherData.weather.date, 'EEEE MMM. dd - HH:mm');
        this.element.appendChild(dateSpan);

        const weatherContentDiv = document.createElement('div');
        weatherContentDiv.classList.add('current-weather-content');

        const weatherHeader = document.createElement('span');
        weatherHeader.textContent = 'Weather';
        weatherHeader.classList.add('current-weather-content-header');
        weatherContentDiv.appendChild(weatherHeader);

        const tempHeader = document.createElement('span');
        tempHeader.textContent = 'Temperature';
        tempHeader.classList.add('current-weather-content-header');
        weatherContentDiv.appendChild(tempHeader);

        const feelsLikeHeader = document.createElement('span');
        feelsLikeHeader.textContent = 'Feels like';
        feelsLikeHeader.classList.add('current-weather-content-header');
        weatherContentDiv.appendChild(feelsLikeHeader);

        const humidityHeader = document.createElement('span');
        humidityHeader.textContent = 'Humidity';
        humidityHeader.classList.add('current-weather-content-header');
        weatherContentDiv.appendChild(humidityHeader);

        const currentWeatherCard = document.createElement('div');
        currentWeatherCard.classList.add('current-weather-card');
    
        const descSpan = document.createElement('span');
        descSpan.textContent = `${this.weatherData.weather.main} - ${this.weatherData.weather.description}`;
        currentWeatherCard.appendChild(descSpan);
    
        const tempSpan = document.createElement('span');
        tempSpan.textContent = `${this.weatherData.weather.temp}`;
        tempSpan.classList.add('temperature');
        currentWeatherCard.appendChild(tempSpan);
    
        const feelsLikeSpan = document.createElement('span');
        feelsLikeSpan.textContent = `${this.weatherData.weather.feels_like}`;
        feelsLikeSpan.classList.add('temperature');
        currentWeatherCard.appendChild(feelsLikeSpan);
    
        const humiditySpan = document.createElement('span');
        humiditySpan.textContent = this.weatherData.weather.humidity;
        currentWeatherCard.appendChild(humiditySpan);

        weatherContentDiv.appendChild(currentWeatherCard);
    
        this.element.appendChild(weatherContentDiv);
    }
}