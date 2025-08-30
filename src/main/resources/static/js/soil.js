// soil.js
import { getDatabase, ref, get, query, limitToLast } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

export function initSoil(db) {
  async function loadSoilData() {
    try {
      const snapshot = await get(query(ref(db, "/npk/readings"), limitToLast(1)));
      console.log("Raw Snapshot:", snapshot.val());

      if (snapshot.exists()) {
        const dataObj = Object.values(snapshot.val())[0];
        console.log("Firebase Data:", dataObj);

        const paramCards = document.querySelectorAll('.param-card');

        // order: K, N, P
        if (paramCards[0]) {
          paramCards[0].querySelector('.param-value').textContent = dataObj.K ?? "--";
          paramCards[0].querySelector('.param-status').textContent = "Updated";
        }
        if (paramCards[1]) {
          paramCards[1].querySelector('.param-value').textContent = dataObj.N ?? "--";
          paramCards[1].querySelector('.param-status').textContent = "Updated";
        }
        if (paramCards[2]) {
          paramCards[2].querySelector('.param-value').textContent = dataObj.P ?? "--";
          paramCards[2].querySelector('.param-status').textContent = "Updated";
        }
      }
    } catch (err) {
      console.error("Firebase read error:", err);
    }
  }

  document.getElementById('soilRefreshBtn')?.addEventListener('click', loadSoilData);
  loadSoilData();
}
