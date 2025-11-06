console.log('✅ schemesFetcher.js loaded');

// State data
const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

function initSchemesFetcher() {
    console.log('🚀 Initializing schemes fetcher...');

    const stateSelect = document.getElementById('stateSelect');
    const stateSearch = document.getElementById('stateSearch');
    const fetchBtn = document.getElementById('fetchSchemesBtn');
    const schemesBox = document.getElementById('schemesBox');
    const schemesContainer = document.getElementById('schemesContainer');

    if (!stateSelect || !stateSearch || !fetchBtn || !schemesContainer) {
        console.error('❌ Required elements not found');
        return;
    }

    console.log('✅ All elements found');

    // Populate state dropdown
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });

    // Search functionality
    stateSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const options = stateSelect.querySelectorAll('option');

        options.forEach(option => {
            if (option.value === '') return;
            const stateName = option.value.toLowerCase();
            option.style.display = stateName.includes(searchTerm) ? 'block' : 'none';
        });
    });

    // Fetch schemes button
    fetchBtn.addEventListener('click', async () => {
        const selectedState = stateSelect.value;

        if (!selectedState) {
            schemesContainer.innerHTML = `
                <div class="schemes-empty">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Please select a state to view schemes</p>
                </div>
            `;
            return;
        }

        console.log('Fetching schemes for:', selectedState);

        // Show loading
        schemesContainer.innerHTML = `
            <div class="loading">
                <div class="loader"></div>
                <p>Loading schemes for ${selectedState}...</p>
            </div>
        `;

        try {
            const response = await fetch(`/api/schemes/${encodeURIComponent(selectedState)}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const schemes = await response.json();
            displaySchemes(schemes, selectedState);

        } catch (error) {
            console.error('Error fetching schemes:', error);
            schemesContainer.innerHTML = `
                <div class="error">
                    <i class="fas fa-times-circle"></i>
                    <p>Failed to load schemes</p>
                    <p class="error-details">${error.message}</p>
                </div>
            `;
        }
    });
}

function displaySchemes(data, stateName) {
    const schemesContainer = document.getElementById('schemesContainer');

    // Parse if data is string
    if (typeof data === 'string') {
        data = JSON.parse(data);
    }

    const schemes = data.schemes || [];

    if (!schemes || schemes.length === 0) {
        schemesContainer.innerHTML = `
            <div class="schemes-empty">
                <i class="fas fa-inbox"></i>
                <p>No schemes found for ${stateName}</p>
            </div>
        `;
        return;
    }

    let html = `
        <div class="schemes-result-header">
            <h3>Available Schemes for ${stateName}</h3>
            <p>Found ${schemes.length} scheme(s)</p>
        </div>
    `;

    schemes.forEach(scheme => {
        html += `
            <div class="scheme-card">
                <h4>${scheme.title || 'Untitled Scheme'}</h4>
                <p>${scheme.description || 'No description available'}</p>

                ${scheme.link ? `
                    <div class="scheme-link">
                        <a href="${scheme.link}" target="_blank" rel="noopener noreferrer" class="scheme-btn">
                            <i class="fas fa-external-link-alt"></i> Learn More
                        </a>
                    </div>
                ` : ''}

                <div class="scheme-meta">
                    <span class="scheme-tag">Government Scheme</span>
                </div>
            </div>
        `;
    });

    schemesContainer.innerHTML = html;
}


// Auto-initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSchemesFetcher);
} else {
    initSchemesFetcher();
}

export { initSchemesFetcher };
