const weatherForm = document.getElementById('weather-form');
const locationInput = document.getElementById('location');
const submitButton = document.getElementById('submit');
const weatherDataDiv = document.getElementById('weather-data');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = locationInput.value;
  const apiKey = '61011306d60da2ba7ffb5250488b4b25'; 
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location},CA&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        return response.json();
      }
    })
    .then(data => {
      const weatherData = data;
      const html = `
        <h2 id="city-name">${weatherData.name}, ${weatherData.sys.country}</h2>
        <p id="temperature">Temperature: ${weatherData.main.temp}°C</p>
        <p id="feels-like">Feels like: ${weatherData.main.feels_like}°C</p>
        <p id="humidity">Humidity: ${weatherData.main.humidity}%</p>
        <p id="wind-speed">Wind Speed: ${weatherData.wind.speed} m/s</p>
      `;
      weatherDataDiv.innerHTML = html;
    })
    .catch(error => {
      console.error('Failed to fetch data:', error);
      weatherDataDiv.innerHTML = 'Error: ' + error.message;
    });
});