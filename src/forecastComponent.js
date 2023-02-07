export default class ForecastComponent {
    constructor(weatherData) {
        this.element = document.createElement('div');
        this.element.classList.add('weather-forecast');
        const title = document.createElement('h3');
        title.textContent = 'Weather Forecast';
        this.element.appendChild(title);

        this.renderLoading();
        this.weatherData = weatherData;
        this.weatherData.addListener('onLoad', () => this.onWeatherDataLoad());

        return this.element;
    }

    onWeatherDataLoad() {
        console.log('ForecastComponent weatherData loaded');
        this.renderForecast();
    }

    renderLoading() {
        const forecastContent = this.element.querySelector('.forecast-content');
        if (forecastContent) {
            forecastContent.remove();
        }

        const forecastLoadingDiv = document.createElement('div');
        forecastLoadingDiv.classList.add('loading');
        forecastLoadingDiv.textContent = 'Loading forecast...';
        this.element.appendChild(forecastLoadingDiv);
    }

    renderForecast() {
        const loadingDiv = this.element.querySelector('.loading');
        if (loadingDiv) {
            loadingDiv.remove();
        } 

        const forecastContentDiv = document.createElement('div');
        forecastContentDiv.classList.add('forecast-content');

        const forecastPerDay = {};
        for (let forecastItem of this.weatherData.forecast) {
            const itemDate = forecastItem.dt_txt.split(' ')[0];
            if (!forecastPerDay[itemDate]) {
                forecastPerDay[itemDate] = [];
            }
            forecastPerDay[itemDate].push(forecastItem);
        }
        console.log(forecastPerDay);
        const forecastList = document.createElement('ul');
        for (let key of Object.keys(forecastPerDay)) {
            const listItem = document.createElement('li');
            listItem.textContent = key;
            forecastList.appendChild(listItem);
        }
        forecastContentDiv.appendChild(forecastList);

        this.element.appendChild(forecastContentDiv);
    }
}