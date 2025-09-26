import { getDatabase, ref, get, query, limitToLast } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export function initSoil(db) {
  // Fetch soil advice from backend and display in a styled box
  async function fetchSoilAdvice(n, p, k) {
    const requestBody = { nitrogen: n, phosphorus: p, potassium: k };
    try {
      const response = await fetch('/api/gemini/advice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const adviceText = await response.text();
      let adviceContainer = document.getElementById('soilAdviceResult');

      if (!adviceContainer) {
        adviceContainer = document.createElement('div');
        adviceContainer.id = 'soilAdviceResult';
        document.querySelector('.soil-dashboard').appendChild(adviceContainer);
      }

      // Clear previous content
      adviceContainer.innerHTML = '';

      // Create and style the advice box using CSS class
      const adviceBox = document.createElement('div');
      adviceBox.classList.add('advice-box');
      adviceBox.textContent = adviceText;

      adviceContainer.appendChild(adviceBox);

      // Save advice text for voice assistance button
      adviceContainer.dataset.adviceText = adviceText;

    } catch (error) {
      console.error('Error fetching soil advice:', error);
      let adviceContainer = document.getElementById('soilAdviceResult');
      if (!adviceContainer) {
        adviceContainer = document.createElement('div');
        adviceContainer.id = 'soilAdviceResult';
        document.querySelector('.soil-dashboard').appendChild(adviceContainer);
      }
      adviceContainer.textContent = "Could not fetch advice. Please try again.";
      adviceContainer.dataset.adviceText = '';
    }
  }

  // Voice assistance function to speak the advice text in Hindi
  // Track current utterance and speaking state
  let speechUtterance = null;
  let isSpeaking = false;

  function speakAdvice() {
    const adviceContainer = document.getElementById('soilAdviceResult');
    if (!adviceContainer || !adviceContainer.dataset.adviceText) {
      alert('No advice to speak. Please refresh data first.');
      return;
    }

    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        speechSynthesis.cancel();
        isSpeaking = false;
        return;
      }

      speechUtterance = new SpeechSynthesisUtterance(adviceContainer.dataset.adviceText);
      speechUtterance.lang = 'hi-IN';

      speechUtterance.onstart = () => { isSpeaking = true; };
      speechUtterance.onend = () => { isSpeaking = false; };
      speechUtterance.onerror = () => { isSpeaking = false; };

      speechSynthesis.speak(speechUtterance);
    } else {
      alert('Speech synthesis not supported in this browser.');
    }
  }
document.getElementById('voiceAssistBtn')?.addEventListener('click', speakAdvice);


  // Load soil data from Firebase and trigger advice fetching
  async function loadSoilData() {
    try {
      const snapshot = await get(query(ref(db, "/npk/readings"), limitToLast(1)));
      if (snapshot.exists()) {
        const dataObj = Object.values(snapshot.val())[0];
        const paramCards = document.querySelectorAll('.param-card');

        const n = dataObj.N ?? null;
        const p = dataObj.P ?? null;
        const k = dataObj.K ?? null;

        if (paramCards[0]) {
          paramCards[0].querySelector('.param-value').textContent = n ?? "--";
          paramCards[0].querySelector('.param-status').textContent = "Updated";
        }
        if (paramCards[1]) {
          paramCards[1].querySelector('.param-value').textContent = p ?? "--";
          paramCards[1].querySelector('.param-status').textContent = "Updated";
        }
        if (paramCards[2]) {
          paramCards[2].querySelector('.param-value').textContent = k ?? "--";
          paramCards[2].querySelector('.param-status').textContent = "Updated";
        }

        let adviceContainer = document.getElementById('soilAdviceResult');
        if (!adviceContainer) {
          adviceContainer = document.createElement('div');
          adviceContainer.id = 'soilAdviceResult';
          document.querySelector('.soil-dashboard').appendChild(adviceContainer);
        }
        adviceContainer.textContent = "Generating advice...";

        if (n !== null && p !== null && k !== null) {
          fetchSoilAdvice(n, p, k);
        } else {
          adviceContainer.textContent = "Soil data incomplete for advice.";
          adviceContainer.dataset.adviceText = '';
        }
      }
    } catch (err) {
      console.error("Firebase read error:", err);
      let adviceContainer = document.getElementById('soilAdviceResult');
      if (adviceContainer) adviceContainer.textContent = "Error loading soil data.";
    }
  }

  // Attach event listeners to buttons
  document.getElementById('soilRefreshBtn')?.addEventListener('click', loadSoilData);
  document.getElementById('voiceAssistBtn')?.addEventListener('click', speakAdvice);

  loadSoilData();
}
