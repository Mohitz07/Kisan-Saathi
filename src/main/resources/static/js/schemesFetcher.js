const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir",
    "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

// Populate state dropdown
function populateStates() {
    const stateSelect = document.getElementById("stateSelect");
    indianStates.forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });
}

// Filter states in dropdown based on search input
function filterStates() {
    const searchInput = document.getElementById("stateSearch").value.toLowerCase();
    const stateSelect = document.getElementById("stateSelect");
    stateSelect.innerHTML = '<option value="">Select State</option>';

    const filteredStates = indianStates.filter(state => state.toLowerCase().includes(searchInput));
    filteredStates.forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });
    // Force refresh dropdown (optional, for some browsers)
    stateSelect.dispatchEvent(new Event('change'));
}

// Fetch schemes from backend (Spring Boot SchemeController)
async function fetchSchemes(state) {
    try {
        const response = await fetch('/api/schemes/fetch', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ state: state })
        });
        const data = await response.json();
        return data.schemes || [];
    } catch (e) {
        console.error('Error fetching schemes:', e);
        return [];
    }
}

// Display schemes on the page
function displaySchemes(schemes) {
    const schemesBox = document.getElementById("schemesBox");
    const schemesContainer = document.getElementById("schemesContainer");
    const selectedState = document.getElementById("selectedState");
    const state = document.getElementById("stateSelect").value;
    selectedState.textContent = state;

    schemesBox.style.display = "block";
    if (schemes.length > 0) {
        schemesContainer.innerHTML = "";
        schemes.forEach(scheme => {
            const card = document.createElement("div");
            card.className = "scheme-card";
            card.innerHTML = `
                <h3>${scheme.title}</h3>
                <p>${scheme.description}</p>
                <a href="${scheme.link}" target="_blank">Learn More</a>
            `;
            schemesContainer.appendChild(card);
        });
    } else {
        schemesContainer.innerHTML = '<p>No schemes found for this state.</p>';
    }
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    populateStates();
    document.getElementById("stateSearch").addEventListener("input", filterStates);
    document.getElementById("fetchSchemesBtn").addEventListener("click", async () => {
        const state = document.getElementById("stateSelect").value;
        if (!state) {
            alert("Please select a state");
            return;
        }
        const schemes = await fetchSchemes(state);
        displaySchemes(schemes);
    });
});
