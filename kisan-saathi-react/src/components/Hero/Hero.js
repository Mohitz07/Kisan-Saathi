// src/components/Hero/Hero.js
import React from 'react';

const Hero = () => {
  const scrollToFeatures = () => {
    document.getElementById('features').scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section className="hero-section" id="dashboard">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Smart Farming with AI Assistance</h1>
          <p>
            Kisan-Sathi empowers farmers with AI-driven insights for sustainable agriculture.
            Make data-informed decisions for better crop yields and farming practices.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={scrollToFeatures}>
              <i className="fas fa-chart-line"></i>
              Analyze Your Crop
            </button>
            <button className="btn-secondary">
              <i className="fas fa-book"></i>
              Knowledge Hub
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/image/farmer-with-mobile.jpeg" alt="Smart Farming" className="hero-img" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
