// src/components/Header/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <i className="fas fa-seedling"></i>
          <span className="logo-text">Kisan-Sathi</span>
        </div>
        <nav className="nav-menu">
          <button onClick={() => scrollToSection('dashboard')} className="nav-item active">
            Dashboard
          </button>
          <button onClick={() => scrollToSection('features')} className="nav-item">
            Weather
          </button>
          <button onClick={() => scrollToSection('features')} className="nav-item">
            Disease Detection
          </button>
          <button onClick={() => scrollToSection('soil')} className="nav-item">
            Soil Monitor
          </button>
          <button onClick={() => scrollToSection('features')} className="nav-item">
            Market Prices
          </button>
          <div
            className="dropdown"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <span className="nav-item dropdown-toggle">
              More <i className="fas fa-chevron-down"></i>
            </span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={() => scrollToSection('advisory')}>Crop Advisory</button>
                <button onClick={() => scrollToSection('analytics')}>Analytics</button>
                <button onClick={() => scrollToSection('settings')}>Settings</button>
              </div>
            )}
          </div>
        </nav>
        <div className="header-right">
          <div className="language-selector">
            <i className="fas fa-globe"></i>
            <span>EN</span>
          </div>
          <button className="login-btn">Login</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
