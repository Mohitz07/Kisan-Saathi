// src/components/FeatureCard/MarketPricesCard.js
import React, { useState } from 'react';

const MarketPricesCard = () => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [result, setResult] = useState('');

  const getMarketPrices = () => {
    if (!selectedCrop) {
      alert('Please select a crop');
      return;
    }

    const prices = {
      wheat: { current: '₹2,150/qt', trend: 'up', change: '+₹50' },
      rice: { current: '₹3,200/qt', trend: 'stable', change: '₹0' },
      onion: { current: '₹1,800/qt', trend: 'down', change: '-₹120' },
      potato: { current: '₹1,200/qt', trend: 'up', change: '+₹80' }
    };

    const priceInfo = prices[selectedCrop];
    const trendClass = priceInfo.trend === 'up' ? 'trend-up' : priceInfo.trend === 'down' ? 'trend-down' : 'trend-stable';

    setResult(`
      <div class="market-prices">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-size: 1.1rem; font-weight: 600;">${priceInfo.current}</div>
          <div class="price-change ${trendClass}" style="font-size: 0.85rem;">
            <i class="fas fa-arrow-${priceInfo.trend === 'up' ? 'up' : priceInfo.trend === 'down' ? 'down' : 'right'}"></i>
            ${priceInfo.change}
          </div>
        </div>
        <div class="info-item" style="margin-top: 8px;">
          <span class="label">Trend:</span>
          <span class="value ${trendClass}">${priceInfo.trend.toUpperCase()}</span>
        </div>
      </div>
    `);
  };

  return (
    <div className="feature-card market-card">
      <div className="feature-icon">
        <i className="fas fa-chart-line"></i>
      </div>
      <h3>Market Prices</h3>
      <p>Track current market prices for various crops and plan your selling strategy effectively.</p>
      <div className="feature-actions">
        <select
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
          className="crop-select"
        >
          <option value="">Select Crop</option>
          <option value="wheat">Wheat</option>
          <option value="rice">Rice</option>
          <option value="onion">Onion</option>
          <option value="potato">Potato</option>
        </select>
        <button onClick={getMarketPrices} className="feature-btn">
          <i className="fas fa-rupee-sign"></i> Check Prices
        </button>
      </div>
      <div
        className="result-area"
        dangerouslySetInnerHTML={{ __html: result }}
      />
    </div>
  );
};

export default MarketPricesCard;
