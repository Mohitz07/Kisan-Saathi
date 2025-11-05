export function initWeather() {
  const input = document.getElementById('locationInput');
  const resultArea = document.getElementById('weatherResult');
  const btn = document.getElementById('weatherFetchBtn');

  if (!input || !resultArea || !btn) return;

  // Using the provided weatherstack API key
  const API_KEY = 'ece501b47721614d40f469d275979b50';

  btn.addEventListener('click', async () => {
    const location = input.value.trim();

    // Validate location input
    if (!location) {
      resultArea.innerHTML = '<div class="error">Please enter a location</div>';
      return;
    }

    resultArea.innerHTML = '<div class="loading">Loading weather data...</div>';

    try {
      // Using weatherstack.com API with the provided endpoint format
      const response = await fetch(`http://api.weatherstack.com/forecast?access_key=${API_KEY}&query=${encodeURIComponent(location)}&units=m`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Check if API returned an error
      if (data.success === false) {
        throw new Error(data.error.info);
      }

      // Extract current weather data
      const current = data.current;
      const locationData = data.location;
      const weatherIcon = current.weather_icons ? current.weather_icons[0] : '';

      // Format the temperature with degree symbol
      const temperature = `${current.temperature}°C`;

      resultArea.innerHTML = `
        <div class="weather-display">
          <div class="weather-main">
            <h4>${locationData.name}, ${locationData.country}</h4>
            <div class="temp">${temperature}</div>
            <div class="condition">${current.weather_descriptions[0]}</div>
            ${weatherIcon ? `<img src="${weatherIcon}" alt="${current.weather_descriptions[0]}" class="weather-icon"/>` : ''}
          </div>
          <div class="weather-details">
            <div class="detail-item">
              <span class="label">Feels like:</span>
              <span class="value">${current.feelslike}°C</span>
            </div>
            <div class="detail-item">
              <span class="label">Humidity:</span>
              <span class="value">${current.humidity}%</span>
            </div>
            <div class="detail-item">
              <span class="label">Wind:</span>
              <span class="value">${current.wind_speed} km/h</span>
            </div>
            <div class="detail-item">
              <span class="label">Pressure:</span>
              <span class="value">${current.pressure} hPa</span>
            </div>
            <div class="detail-item">
              <span class="label">Visibility:</span>
              <span class="value">${current.visibility} km</span>
            </div>
          </div>
          <div class="weather-meta">
            <div class="detail-item">
              <span class="label">Updated:</span>
              <span class="value">${locationData.localtime}</span>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Error loading weather data:', error);
      resultArea.innerHTML = `<div class="error">Failed to load weather data: ${error.message}</div>`;
    }
  });
}
