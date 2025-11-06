console.log('✅ disease.js loaded');

function initDisease() {
    console.log('🚀 Initializing disease detection...');

    const uploadBtn = document.getElementById('diseaseUploadBtn');
    const fileInput = document.getElementById('diseaseFileInput');
    const resultArea = document.getElementById('diseaseResult');

    if (!uploadBtn || !fileInput || !resultArea) {
        console.error('❌ Required elements not found!');
        return;
    }

    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            resultArea.innerHTML = `
                <div class="error-card">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Please select a valid image file (JPG, PNG, etc.)</p>
                </div>
            `;
            return;
        }

        // Show loading animation
        resultArea.innerHTML = `
            <div class="loading-card">
                <div class="loader"></div>
                <p>🔍 Analyzing your crop image...</p>
                <p class="loading-subtext">Using AI to detect diseases and pests</p>
            </div>
        `;

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('/api/disease/detect', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            displayDiseaseResults(data, resultArea);

        } catch (error) {
            console.error('❌ Error:', error);
            resultArea.innerHTML = `
                <div class="error-card">
                    <i class="fas fa-times-circle"></i>
                    <p>Failed to analyze image</p>
                    <p class="error-details">${error.message}</p>
                </div>
            `;
        }
    });
}

function displayDiseaseResults(data, resultArea) {
    if (!data.result) {
        resultArea.innerHTML = `
            <div class="error-card">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Invalid API response</p>
            </div>
        `;
        return;
    }

    const cropSuggestions = data.result?.crop?.suggestions || [];
    const diseaseSuggestions = data.result?.disease?.suggestions || [];

    if (diseaseSuggestions.length === 0) {
        resultArea.innerHTML = `
            <div class="success-card">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Crop Looks Healthy!</h3>
                <p>No diseases or pests detected in your crop image.</p>
            </div>
        `;
        return;
    }

    const topDiseases = diseaseSuggestions.slice(0, 3);

    let html = '<div class="disease-results-modern">';

    // Crop info card
    if (cropSuggestions.length > 0) {
        const topCrop = cropSuggestions[0];
        const confidence = (topCrop.probability * 100).toFixed(1);
        html += `
            <div class="crop-info-card">
                <div class="crop-header">
                    <div class="crop-icon">🌾</div>
                    <div>
                        <h3>Detected Crop</h3>
                        <p class="crop-name">${topCrop.name}</p>
                        <p class="scientific-name">${topCrop.scientific_name || ''}</p>
                    </div>
                </div>
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${confidence}%"></div>
                    <span class="confidence-text">${confidence}% Confidence</span>
                </div>
            </div>
        `;
    }

    html += '<h3 class="results-title">⚠️ Disease/Pest Detection Results</h3>';

    topDiseases.forEach((disease, index) => {
        const probability = (disease.probability * 100).toFixed(1);
        const isHealthy = disease.name.toLowerCase().includes('healthy');
        const severityClass = probability > 70 ? 'high' : probability > 40 ? 'medium' : 'low';

        html += `
            <div class="disease-card-modern ${isHealthy ? 'healthy-card' : ''}" style="animation-delay: ${index * 0.1}s">
                <div class="disease-card-header">
                    <div class="disease-rank">${index + 1}</div>
                    <div class="disease-info">
                        <h4>${disease.name}</h4>
                        ${disease.scientific_name ? `<p class="scientific-name"><em>${disease.scientific_name}</em></p>` : ''}
                    </div>
                    <div class="confidence-badge severity-${severityClass}">
                        ${probability}%
                    </div>
                </div>

                ${disease.details?.description ? `
                    <div class="disease-section">
                        <div class="section-header">
                            <i class="fas fa-info-circle"></i>
                            <strong>Description</strong>
                        </div>
                        <p>${disease.details.description}</p>
                    </div>
                ` : ''}

                ${disease.details?.symptoms ? `
                    <div class="disease-section">
                        <div class="section-header">
                            <i class="fas fa-stethoscope"></i>
                            <strong>Symptoms</strong>
                        </div>
                        <p>${disease.details.symptoms}</p>
                    </div>
                ` : ''}

                ${disease.details?.treatment ? `
                    <div class="disease-section treatment-section">
                        <div class="section-header">
                            <i class="fas fa-medkit"></i>
                            <strong>Treatment Options</strong>
                        </div>
                        ${disease.details.treatment.biological ? `
                            <div class="treatment-option">
                                <span class="treatment-badge biological">🌱 Biological</span>
                                <p>${disease.details.treatment.biological}</p>
                            </div>
                        ` : ''}
                        ${disease.details.treatment.chemical ? `
                            <div class="treatment-option">
                                <span class="treatment-badge chemical">⚗️ Chemical</span>
                                <p>${disease.details.treatment.chemical}</p>
                            </div>
                        ` : ''}
                        ${disease.details.treatment.prevention ? `
                            <div class="treatment-option">
                                <span class="treatment-badge prevention">🛡️ Prevention</span>
                                <p>${disease.details.treatment.prevention}</p>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}

                ${disease.details?.severity ? `
                    <div class="severity-indicator severity-${severityClass}">
                        <i class="fas fa-exclamation-triangle"></i>
                        <strong>Severity:</strong> ${disease.details.severity}
                    </div>
                ` : ''}
            </div>
        `;
    });

    html += '</div>';
    resultArea.innerHTML = html;
}

// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDisease);
} else {
    initDisease();
}

export { initDisease };
