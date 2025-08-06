// src/components/FeatureCard/CropAdvisoryCard.js
import React, { useState } from 'react';

const CropAdvisoryCard = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [result, setResult] = useState('');

  const getCropAdvice = () => {
    if (!selectedCrop) {
      alert('Please select a crop type');
      return;
    }

    const advisories = {
      wheat: {
        season: 'Rabi Season',
        advice: 'Optimal sowing time approaching. Ensure proper soil preparation.',
        tips: 'Apply balanced fertilizers'
      },
      rice: {
        season: 'Kharif Season',
        advice: 'Monitor water levels carefully. Weather conditions favorable.',
        tips: 'Maintain 2-3cm water depth'
      },
      corn: {
        season: 'Kharif Season',
        advice: 'Good growing conditions. Monitor for pest attacks.',
        tips: 'Apply nitrogen in splits'
      },
      tomato: {
        season: 'Year Round',
        advice: 'Suitable for transplanting. Prepare beds with organic matter.',
        tips: 'Use drip irrigation'
      }
    };

    const advisory = advisories[selectedCrop];

    setResult(`
      <div class="crop-advisory">
        <div class="advisory-item">
          <span class="label">Season:</span>
          <span class="value">${advisory.season}</span>
        </div>
        <div style="margin: 8px 0; font-size: 0.8rem;">
          <strong>Advice:</strong> ${advisory.advice}
        </div>
        <div style="font-size: 0.8rem; color: var(--light-green);">
          <strong>Tip:</strong> ${advisory.tips}
        </div>
      </div>
    `);
  };

  return (
    <div className="feature-card advisory-card">
      <div className="feature-icon">
        <i className="fas fa-lightbulb"></i>
      </div>
      <h3>Crop Advisory</h3>
      <p>Receive personalized crop recommendations based on soil conditions and weather data.</p>
      <div className="feature-actions">
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="crop-select"
        >
          <option value="">Select Crop Type</option>
          <option value="wheat">Wheat</option>
          <option value="rice">Rice</option>
          <option value="corn">Corn</option>
          <option value="tomato">Tomato</option>
        </select>
        <button onClick={getCropAdvice} className="feature-btn">
          <i className="fas fa-search-plus"></i> Get Advice
        </button>
      </div>
      <div
        className="result-area"
        dangerouslySetInnerHTML={{ __html: result }}
      />
    </div>
  );
};

export default CropAdvisoryCard;
