// src/components/SoilMonitor/SoilMonitor.js
import React, { useState, useEffect } from 'react';
import { soilService } from '../../Services/api';

const SoilMonitor = () => {
  const [selectedSensor, setSelectedSensor] = useState('SOIL_001');
  const [soilData, setSoilData] = useState({
    ph: '--',
    moisture: '--',
    temperature: '--',
    nutrients: '--'
  });
  const [loading, setLoading] = useState(false);

  const loadSoilData = async () => {
    setLoading(true);
    try {
      const data = await soilService.getSoilData(selectedSensor);
      setSoilData({
        ph: data.ph,
        moisture: data.moisture,
        temperature: data.temperature || '25°C',
        nutrients: data.nutrients
      });
    } catch (error) {
      console.error('Error loading soil data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSoilData();
  }, [selectedSensor]);

  return (
    <section className="soil-section" id="soil">
      <div className="container">
        <h2 className="section-title">Soil Parameter Monitoring</h2>
        <div className="soil-dashboard">
          <div className="sensor-controls">
            <select
              value={selectedSensor}
              onChange={(e) => setSelectedSensor(e.target.value)}
              className="sensor-select"
            >
              <option value="SOIL_001">Sensor 1 - Field A</option>
              <option value="SOIL_002">Sensor 2 - Field B</option>
              <option value="SOIL_003">Sensor 3 - Field C</option>
            </select>
            <button onClick={loadSoilData} className="btn-primary" disabled={loading}>
              <i className="fas fa-sync"></i>
              {loading ? 'Loading...' : 'Refresh Data'}
            </button>
          </div>
          <div className="soil-parameters">
            <div className="param-card">
              <h4>pH Level</h4>
              <div className="param-value">{soilData.ph}</div>
              <div className="param-status">Optimal</div>
            </div>
            <div className="param-card">
              <h4>Moisture</h4>
              <div className="param-value">{soilData.moisture}</div>
              <div className="param-status">Good</div>
            </div>
            <div className="param-card">
              <h4>Temperature</h4>
              <div className="param-value">{soilData.temperature}</div>
              <div className="param-status">Normal</div>
            </div>
            <div className="param-card">
              <h4>Nutrients</h4>
              <div className="param-value">{soilData.nutrients}</div>
              <div className="param-status">Good</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoilMonitor;
