// src/components/FeatureCard/DiseaseDetectionCard.js
import React, { useState } from 'react';
import { diseaseService } from '../../Services/api';

const DiseaseDetectionCard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setResult(`
        <div class="image-preview">
          <img src="${URL.createObjectURL(file)}" alt="Crop Image" style="max-width: 100%; height: 80px; object-fit: cover; border-radius: 4px;">
        </div>
      `);
    }
  };

  const analyzeImage = async () => {
    if (!selectedFile) {
      alert('Please select an image first');
      return;
    }

    setLoading(true);
    try {
      const data = await diseaseService.detectDisease(selectedFile);

      setResult(`
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
            <strong>Recommendation:</strong> ${data.recommendation}
          </div>
        </div>
      `);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setResult('<div class="error">Failed to analyze image</div>');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feature-card disease-card">
      <div className="feature-icon">
        <i className="fas fa-leaf"></i>
      </div>
      <h3>Disease Detection</h3>
      <p>Upload crop images for AI-powered disease identification and treatment recommendations.</p>
      <div className="feature-actions">
        <input
          type="file"
          id="diseaseImageInput"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleFileSelect}
        />
        <button
          onClick={() => document.getElementById('diseaseImageInput').click()}
          className="feature-btn"
        >
          <i className="fas fa-camera"></i> Upload Image
        </button>
        {selectedFile && (
          <button onClick={analyzeImage} className="feature-btn" disabled={loading}>
            <i className="fas fa-search-plus"></i>
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        )}
      </div>
      <div
        className="result-area"
        dangerouslySetInnerHTML={{ __html: result || '' }}
      />
    </div>
  );
};

export default DiseaseDetectionCard;
