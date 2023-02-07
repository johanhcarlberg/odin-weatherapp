export default class ForecastComponent {
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('weather-forecast');
        const title = document.createElement('h3');
        title.textContent = 'Weather Forecast';
        this.element.appendChild(title);
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
}