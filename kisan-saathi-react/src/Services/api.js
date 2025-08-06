// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const weatherService = {
  getWeatherData: async (location = 'Delhi, India') => {
    const response = await api.get(`/weather?location=${encodeURIComponent(location)}`);
    return response.data;
  }
};

export const diseaseService = {
  detectDisease: async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await api.post('/disease-detection', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
};

export const soilService = {
  getSoilData: async (sensorId = 'SOIL_001') => {
    const response = await api.get(`/soil-data?sensorId=${sensorId}`);
    return response.data;
  }
};

export default api;
