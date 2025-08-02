// src/main/resources/static/script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Kisan-Sathi application loaded successfully!');
    loadSoilData();
    setupImageUpload();
});

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({
        behavior: 'smooth'
    });
}

async function loadWeatherData() {
    const location = document.getElementById('locationInput').value || 'Delhi, India';
    const resultArea = document.getElementById('weatherResult');

    try {
        resultArea.innerHTML = '<div class="loading">Loading weather data...</div>';

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
}

function setupImageUpload() {
    const imageInput = document.getElementById('diseaseImageInput');
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const resultArea = document.getElementById('diseaseResult');
            resultArea.innerHTML = `
                <div class="image-preview">
                    <img src="${URL.createObjectURL(file)}" alt="Crop Image" style="max-width: 100%; height: 80px; object-fit: cover; border-radius: 4px;">
                    <button onclick="analyzeImage()" class="feature-btn" style="margin-top: 8px; font-size: 0.85rem;">
                        <i class="fas fa-search-plus"></i> Analyze
                    </button>
                </div>
            `;
        }
    });
}

async function analyzeImage() {
    const imageInput = document.getElementById('diseaseImageInput');
    const resultArea = document.getElementById('diseaseResult');

    if (!imageInput.files[0]) {
        alert('Please select an image first');
        return;
    }

    try {
        resultArea.innerHTML = '<div class="loading">Analyzing image...</div>';

        const formData = new FormData();
        formData.append('image', imageInput.files[0]);

        const response = await fetch('/api/disease-detection', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.status === 'success') {
            resultArea.innerHTML = `
                <div class="disease-analysis">
                    <div class="analysis-item">
                        <span class="label">Disease:</span>
                        <span class="value ${data.disease === 'Healthy Plant' ? 'healthy' : 'disease'}">${data.disease}</span>
                    </div>
                    <div class="analysis-item">
                        <span class="label">Confidence:</span>
                        <span class="value">${data.confidence}</span>
                    </div>
                    <div style="margin-top: 8px; font-size: 0.8rem;">
                        <strong>Treatment:</strong> ${data.treatment.substring(0, 60)}...
                    </div>
                </div>
            `;
        } else {
            resultArea.innerHTML = `<div class="error">${data.message}</div>`;
        }
    } catch (error) {
        console.error('Error analyzing image:', error);
        resultArea.innerHTML = '<div class="error">Failed to analyze image</div>';
    }
}

async function getCropAdvice() {
    const cropType = document.getElementById('cropSelect').value;
    const resultArea = document.getElementById('advisoryResult');

    if (!cropType) {
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

    const advisory = advisories[cropType];

    resultArea.innerHTML = `
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
    `;
}

async function getMarketPrices() {
    const crop = document.getElementById('marketCrop').value;
    const resultArea = document.getElementById('marketResult');

    if (!crop) {
        alert('Please select a crop');
        return;
    }

    const prices = {
        wheat: { current: '₹2,150/qt', trend: 'up', change: '+₹50' },
        rice: { current: '₹3,200/qt', trend: 'stable', change: '₹0' },
        onion: { current: '₹1,800/qt', trend: 'down', change: '-₹120' },
        potato: { current: '₹1,200/qt', trend: 'up', change: '+₹80' }
    };

    const priceInfo = prices[crop];
    const trendClass = priceInfo.trend === 'up' ? 'trend-up' : priceInfo.trend === 'down' ? 'trend-down' : 'trend-stable';

    resultArea.innerHTML = `
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
    `;
}

async function loadSoilData() {
    const sensorId = document.getElementById('sensorSelect').value;

    try {
        const response = await fetch(`/api/soil-data?sensorId=${sensorId}`);
        const data = await response.json();

        const paramCards = document.querySelectorAll('.param-card');

        paramCards[0].querySelector('.param-value').textContent = data.ph;
        paramCards[0].querySelector('.param-status').textContent = 'Optimal';

        paramCards[1].querySelector('.param-value').textContent = data.moisture;
        paramCards[1].querySelector('.param-status').textContent = 'Good';

        paramCards[2].querySelector('.param-value').textContent = data.temperature;
        paramCards[2].querySelector('.param-status').textContent = 'Normal';

        paramCards[3].querySelector('.param-value').textContent = 'Good';
        paramCards[3].querySelector('.param-status').textContent = `N:${data.nitrogen}`;

    } catch (error) {
        console.error('Error loading soil data:', error);
    }
}

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        if (this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
