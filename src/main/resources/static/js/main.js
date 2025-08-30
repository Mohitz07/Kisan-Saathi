// src/main/resources/static/js/main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

import { initWeather } from './weather.js';
import { initDisease } from './disease.js';
import { initSoil } from './soil.js';
import { initMarket } from './market.js';
import { initNav } from './nav.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('Kisan-Sathi application loaded successfully!');

  // ✅ Initialize Firebase once here
  const firebaseConfig = {
    apiKey: "AIzaSyBJDbA_ZUE_Ks-lpbwj_U4ifVUWTguVgYQ",
    authDomain: "soilparameters-98211.firebaseapp.com",
    databaseURL: "https://soilparameters-98211-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "soilparameters-98211",
    storageBucket: "soilparameters-98211.appspot.com",
    messagingSenderId: "xxxx",
    appId: "xxxx"
  };

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  // ✅ Pass db to modules that need Firebase
  initNav();
  initSoil(db);
  initWeather();
  initDisease();
  initMarket();
});
