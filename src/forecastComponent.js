export default class ForecastComponent {
    constructor() {
        this.element = document.createElement('div');
        this.element.classList.add('weather-forecast');
        const title = document.createElement('h3');
        title.textContent = 'Weather Forecast';
        this.element.appendChild(title);
    }
}