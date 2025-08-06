// src/pages/Home/Home.js
import React from 'react';
import Hero from '../../components/Hero/Hero';
import DiseaseDetectionCard from '../../components/FeatureCard/DiseaseDetectionCard';
import WeatherCard from '../../components/FeatureCard/WeatherCard';
import CropAdvisoryCard from '../../components/FeatureCard/CropAdvisoryCard';
import MarketPricesCard from '../../components/FeatureCard/MarketPricesCard';
import SoilMonitor from '../../components/SoilMonitor/SoilMonitor';

const Home = () => {
  return (
    <div>
      <Hero />

      <section className="features-section" id="features">
        <div className="features-container">
          <DiseaseDetectionCard />
          <WeatherCard />
          <CropAdvisoryCard />
          <MarketPricesCard />
        </div>
      </section>

      <SoilMonitor />
    </div>
  );
};

export default Home; // Make sure this line exists
