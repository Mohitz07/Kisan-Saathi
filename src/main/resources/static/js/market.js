// src/main/resources/static/js/market.js
export function initMarket() {
  const select = document.getElementById('marketCrop');
  const btn = document.getElementById('marketBtn');
  const resultArea = document.getElementById('marketResult');

  if (!select || !btn || !resultArea) return;

  const prices = {
    wheat: { current: '₹2,150/qt', trend: 'up',     change: '+₹50'  },
    rice:  { current: '₹3,200/qt', trend: 'stable', change: '₹0'    },
    onion: { current: '₹1,800/qt', trend: 'down',   change: '-₹120' },
    potato:{ current: '₹1,200/qt', trend: 'up',     change: '+₹80'  }
  };

  btn.addEventListener('click', () => {
    const crop = select.value;
    if (!crop) {
      alert('Please select a crop');
      return;
    }
    const info = prices[crop];
    const trendClass =
      info.trend === 'up' ? 'trend-up' :
      info.trend === 'down' ? 'trend-down' : 'trend-stable';

    resultArea.innerHTML = `
      <div class="market-prices">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div style="font-size:1.1rem;font-weight:600;">${info.current}</div>
          <div class="price-change ${trendClass}" style="font-size:0.85rem;">
            <i class="fas fa-arrow-${info.trend === 'up' ? 'up' : info.trend === 'down' ? 'down' : 'right'}"></i>
            ${info.change}
          </div>
        </div>
        <div class="info-item" style="margin-top:8px;">
          <span class="label">Trend:</span>
          <span class="value ${trendClass}">${info.trend.toUpperCase()}</span>
        </div>
      </div>
    `;
  });
}
