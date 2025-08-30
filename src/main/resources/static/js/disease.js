// src/main/resources/static/js/disease.js
export function initDisease() {
  const imageInput = document.getElementById('diseaseImageInput');
  const uploadBtn = document.getElementById('diseaseUploadBtn');
  const resultArea = document.getElementById('diseaseResult');

  if (!imageInput || !uploadBtn || !resultArea) return;

  uploadBtn.addEventListener('click', () => imageInput.click());

  imageInput.addEventListener('change', () => {
    const file = imageInput.files && imageInput.files;
    if (!file) return;

    resultArea.innerHTML = `
      <div class="image-preview">
        <img src="${URL.createObjectURL(file)}" alt="Crop Image" style="max-width:100%;height:80px;object-fit:cover;border-radius:4px;">
        <button class="feature-btn analyze-btn" style="margin-top:8px;font-size:0.85rem;">
          <i class="fas fa-search-plus"></i> Analyze
        </button>
      </div>
    `;

    const analyzeBtn = resultArea.querySelector('.analyze-btn');
    if (analyzeBtn) {
      analyzeBtn.addEventListener('click', () => analyzeImage(file, resultArea));
    }
  });
}

async function analyzeImage(file, resultArea) {
  if (!file) {
    alert('Please select an image first');
    return;
  }
  try {
    resultArea.innerHTML = '<div class="loading">Analyzing image...</div>';

    const formData = new FormData();
    formData.append('image', file);

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
          <div style="margin-top:8px;font-size:0.8rem;">
            <strong>Treatment:</strong> ${String(data.treatment || '').substring(0, 60)}...
          </div>
        </div>
      `;
    } else {
      resultArea.innerHTML = `<div class="error">${data.message || 'Failed to analyze image'}</div>`;
    }
  } catch (error) {
    console.error('Error analyzing image:', error);
    resultArea.innerHTML = '<div class="error">Failed to analyze image</div>';
  }
}
