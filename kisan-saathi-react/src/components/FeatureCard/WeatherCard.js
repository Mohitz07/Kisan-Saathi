// src/components/FeatureCard/WeatherCard.js
import React, { useState } from 'react';
import { weatherService } from '../../Services/api';

const WeatherCard = () => {
  const [location, setLocation] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const loadWeatherData = async () => {
    const searchLocation = location || 'Delhi, India';
    setLoading(true);

    try {
      setResult('<div class="loading">Loading weather data...</div>');
      const data = await weatherService.getWeatherData(searchLocation);

      setResult(`
        <div class="weather-display">
          <div class="weather-main">
            <h4>${searchLocation}</h4>
            <div class="temp">${data.temperature}</div>
            <div class="condition">${data.status}</div>
          </div>
          <div class="weather-details">
            <div class="detail-item">
              <span class="label">Humidity:</span>
              <span class="value">${data.humidity}</span>
            </div>
            <div class="detail-item">
              <span class="label">Status:</span>
              <span class="value">${data.status}</span>
            </div>
          </div>
        </div>
      `);
    } catch (error) {
      console.error('Error loading weather data:', error);
      setResult('<div class="error">Failed to load weather data</div>');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feature-card weather-card">
      <div className="feature-icon">
        <i className="fas fa-cloud-sun"></i>
      </div>
      <h3>Weather Forecast</h3>
      <p>Get real-time weather updates and 7-day forecasts for informed farming decisions.</p>
      <div className="feature-actions">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="location-input"
        />
        <button onClick={loadWeatherData} className="feature-btn" disabled={loading}>
          <i className="fas fa-search"></i>
          {loading ? 'Loading...' : 'Get Weather'}
        </button>
      </div>
      <div
        className="result-area"
        dangerouslySetInnerHTML={{ __html: result }}
      />
    </div>
  );
};

export default WeatherCard;
