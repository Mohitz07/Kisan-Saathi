// src/main/resources/static/js/weather.js
export function initWeather() {
  const input = document.getElementById('locationInput');
  const resultArea = document.getElementById('weatherResult');
  const btn = document.getElementById('weatherFetchBtn');

  if (!input || !resultArea || !btn) return;

  btn.addEventListener('click', async () => {
    const location = input.value || 'Delhi, India';
    resultArea.innerHTML = '<div class="loading">Loading weather data...</div>';

    try {
      const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
      const data = await response.json();

      resultArea.innerHTML = `
        <div class="weather-display">
          <div class="weather-main">
            <h4>${data.location}</h4>
            <div class="temp">${data.temperature}</div>
            <div class="condition">${data.condition}</div>
          </div>
          <div class="weather-details">
            <div class="detail-item">
              <span class="label">Humidity:</span>
              <span class="value">${data.humidity}</span>
            </div>
            <div class="detail-item">
              <span class="label">Wind:</span>
              <span class="value">${data.windSpeed}</span>
            </div>
          </div>
        </div>
      `;
    } catch (error) {
      console.error('Error loading weather data:', error);
      resultArea.innerHTML = '<div class="error">Failed to load weather data</div>';
    }
  });
}
