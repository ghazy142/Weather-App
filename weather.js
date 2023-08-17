    document.addEventListener('DOMContentLoaded', function () {
        const weatherTable = document.createElement('table');
        // Function to display the weather information
        function displayWeather(location, weather) {
        // Create a weather table
        weatherTable.innerHTML = `
            <caption id='cap'>This is the weather for ${location} for the next three days</caption>
            <thead id='hod'>
            <tr>
                <th><i class="fa-solid fa-location-dot"></i> Location</th>
                <th><i class="fa-regular fa-calendar"></i> Date</th>
                <th><i class="fa-solid fa-temperature-three-quarters"></i> Temperature (°C)</th>
                <th><i class="fa-solid fa-temperature-arrow-up"></i> Condition</th>
            </tr>
            </thead>
            <tbody id'bod'>
            <tr>
                <td ></td>
                <td>${weather[0].date}</td>
                <td>${weather[0].day.avgtemp_c}°C</td>
                <td><img src="${weather[0].day.condition.icon}" alt="${weather[0].day.condition.text}"></td>
            </tr>
            <tr>
                <td id='loc'> ${location}</td>
                <td>${weather[1].date}</td>
                <td>${weather[1].day.avgtemp_c}°C</td>
                <td><img src="${weather[1].day.condition.icon}" alt="${weather[1].day.condition.text}"></td>
            </tr>
            <tr>
                <td></td>
                <td>${weather[2].date}</td>
                <td>${weather[2].day.avgtemp_c}°C</td>
                <td><img src="${weather[2].day.condition.icon}" alt="${weather[2].day.condition.text}"></td>
            </tr>
            <tr>
                <td></td>
                <td>${weather[3].date}</td>
                <td>${weather[3].day.avgtemp_c}°C</td>
                <td><img src="${weather[3].day.condition.icon}" alt="${weather[3].day.condition.text}"></td>
            </tr>
            </tbody>
        `;
    
        // Clear any existing weather information
        const existingWeatherTable = document.getElementById('weatherTable');
        if (existingWeatherTable) {
            existingWeatherTable.remove();
        }
    
        // Append the weather table to the main element
        const mainElement = document.querySelector('main');
        mainElement.appendChild(weatherTable);
        }
    
        //API key
        const apiKey = 'ff82a42fb16145b0946204114230708';
        const baseUrl = 'https://api.weatherapi.com/v1/forecast.json';
    
        // Function to fetch the default weather for London
        function fetchDefaultWeather() {
        fetch(`${baseUrl}?key=${apiKey}&q=London&days=4`)
            .then(response => response.json())
            .then(data => {
            const forecast = data.forecast.forecastday;
            displayWeather('London', forecast);
            })
            .catch(error => {
            console.log('An error occurred while fetching the default weather:', error);
            });
        }
    
        // Fetch the default weather for London initially
        fetchDefaultWeather();
    
        // Function to fetch weather for a location
        function fetchWeather(location) {
        // Clear any existing weather information
        const existingWeatherTable = document.getElementById('weatherTable');
        if (existingWeatherTable) {
            existingWeatherTable.remove();
        }
    
        fetch(`${baseUrl}?key=${apiKey}&q=${location}&days=4`)
            .then(response => response.json())
            .then(data => {
            if (data.error) {
                console.log('An error occurred:', data.error.message);
                return;
            }
    
            const forecast = data.forecast.forecastday;
            displayWeather(location, forecast);
            })
            .catch(error => {
            console.log('An error occurred while fetching the weather:', error);
            });
        }
    
        // Find button
        const findButton = document.getElementById('findButton');
    
        // Event listener for the find button
        findButton.addEventListener('click', function () {
        const locationInput = document.getElementById('locationInput');
        const location = locationInput.value;
        fetchWeather(location);
        });
    
        // Function to clear the default weather for London
        function clearDefaultWeather() {
        const existingWeatherTable = document.getElementById('weatherTable');
        if (existingWeatherTable) {
            existingWeatherTable.remove();
        }
        }
    
        // Event listener to clear the default weather when the user clicks the find button
        findButton.addEventListener('click', clearDefaultWeather);
    });