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
        const forecastList = document.createElement('ul');
        forecastList.classList.add('forecast-list');
        const forecastListHeaders = document.createElement('li');
        const dateHeader = document.createElement('span');
        dateHeader.textContent = 'Date';
        forecastListHeaders.appendChild(dateHeader);

        const tempHeader = document.createElement('span');
        tempHeader.textContent = 'Temperature (max, min)';
        forecastListHeaders.appendChild(tempHeader);

        forecastList.appendChild(forecastListHeaders);
        for (let key of Object.keys(forecastPerDay)) {
            const listItem = document.createElement('li');
            listItem.classList.add('forecast-card');

            const dateDiv = document.createElement('div');
            dateDiv.textContent = key;
            dateDiv.classList.add('forecast-date');
            listItem.appendChild(dateDiv);

            const tempDiv = document.createElement('div');
            tempDiv.classList.add('forecast-temperature');

            const maxTempSpan = document.createElement('span');
            const maxTemp = this.getMaxTemp(forecastPerDay[key].map((item) => item.main.temp_max));
            maxTempSpan.textContent = maxTemp;
            tempDiv.appendChild(maxTempSpan);
            
            const minTempSpan = document.createElement('span');
            const minTemp = this.getMinTemp(forecastPerDay[key].map((item) => item.main.temp_min));
            minTempSpan.textContent = minTemp;
            tempDiv.appendChild(minTempSpan);

            listItem.appendChild(tempDiv);

            forecastList.appendChild(listItem);
            const forecastTable = this.createHourForecast(forecastPerDay[key]);
            listItem.addEventListener('click', () => {
                forecastTable.classList.toggle('hidden');
            })
            listItem.appendChild(forecastTable);
        }
        forecastContentDiv.appendChild(forecastList);

        this.element.appendChild(forecastContentDiv);
    }

    createHourForecast(day) {
        console.log(day);
        const hourForecastTable = document.createElement('table');
        hourForecastTable.classList.add('hour-forecast');

        const headerRow = document.createElement('tr');

        const timeHeader = document.createElement('th');
        timeHeader.textContent = 'Time';
        headerRow.appendChild(timeHeader);

        
        const tempHeader = document.createElement('th');
        tempHeader.textContent = "Temperature";
        headerRow.appendChild(tempHeader);

        const feelsLikeHeader = document.createElement('th');
        feelsLikeHeader.textContent = "Feels like";
        headerRow.appendChild(feelsLikeHeader);

        const humidityHeader = document.createElement('th');
        humidityHeader.textContent = "Humidity";
        headerRow.appendChild(humidityHeader);

        hourForecastTable.appendChild(headerRow);

        
        for (let weatherObj of day) {
            const forecastRow = document.createElement('tr');

            const timeCell = document.createElement('td');
            timeCell.classList.add('cell-time');
            timeCell.textContent = weatherObj.dt_txt;
            forecastRow.appendChild(timeCell);

            const tempCell = document.createElement('td');
            tempCell.textContent = weatherObj.main.temp;
            tempCell.classList.add('cell-temp');
            forecastRow.appendChild(tempCell);

            const feelsLikeCell = document.createElement('td');
            feelsLikeCell.textContent = weatherObj.main.feels_like;
            feelsLikeCell.classList.add('cell-temp');
            forecastRow.appendChild(feelsLikeCell);

            const humidityCell = document.createElement('td');
            humidityCell.textContent = weatherObj.main.humidity;
            humidityCell.classList.add('cell-humidity');
            forecastRow.appendChild(humidityCell);

            hourForecastTable.appendChild(forecastRow);
        }

        hourForecastTable.classList.add('hidden');
        return hourForecastTable;
    }

    getMaxTemp(temperatures) {
        return temperatures.sort((a, b) => {
            return b - a;
        })[0];
    }

    getMinTemp(temperatures) {
        return temperatures.sort((a, b) => {
            return a - b;
        })[0];
    }
}