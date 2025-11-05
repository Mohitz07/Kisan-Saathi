console.log('✅ Advisory.js: File loaded');

export function initAdvisorySystem() {
    console.log('✅ Advisory.js: initAdvisorySystem called');

    // Wait for elements to be available
    const checkElements = setInterval(() => {
        const queryInput = document.getElementById('advisoryQuery');
        const submitBtn = document.getElementById('submitQuery');
        const responseContent = document.getElementById('responseContent');
        const cropSelect = document.getElementById('cropSelect');

        console.log('🔍 Checking elements...');
        console.log('   advisoryQuery:', queryInput ? 'FOUND' : 'NOT FOUND');
        console.log('   submitQuery:', submitBtn ? 'FOUND' : 'NOT FOUND');
        console.log('   responseContent:', responseContent ? 'FOUND' : 'NOT FOUND');
        console.log('   cropSelect:', cropSelect ? 'FOUND' : 'NOT FOUND');

        if (queryInput && submitBtn && responseContent && cropSelect) {
            clearInterval(checkElements);
            setupAdvisorySystem(queryInput, submitBtn, responseContent, cropSelect);
        }
    }, 500);
}

function setupAdvisorySystem(queryInput, submitBtn, responseContent, cropSelect) {
    console.log('✅ Advisory.js: All elements found, setting up system');

    submitBtn.addEventListener('click', async () => {
        console.log('✅ Advisory.js: Submit button clicked');

        const query = queryInput.value.trim();
        const selectedCrop = cropSelect.value;

        if (!query) {
            console.log('❌ Advisory.js: Empty query');
            responseContent.innerHTML = '<div class="alert-error"><i class="fas fa-exclamation-triangle"></i> कृपया प्रश्न दर्ज करें</div>';
            return;
        }

        // Determine which API endpoint to use based on query content
        const useCropSpecific = shouldUseCropSpecificEndpoint(query);
        const apiUrl = useCropSpecific ?
            '/api/crop-advisory/get-crop-advice' :
            '/api/crop-advisory/get-general-advice';

        console.log('✅ Advisory.js: Using API endpoint:', apiUrl);
        console.log('✅ Advisory.js: Selected crop:', selectedCrop);

        // Show loading
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        responseContent.innerHTML = '<div class="loading-response"><i class="fas fa-robot fa-spin"></i><p>AI result is generating...</p></div>';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: query,
                    cropType: selectedCrop || 'general',
                    nitrogen: 25.0,
                    phosphorus: 20.0,
                    potassium: 30.0
                })
            });

            console.log('✅ Advisory.js: API response status:', response.status);

            if (response.ok) {
                const result = await response.json();
                console.log('Advisory Response Data:', result);
                let advice = result.advice || "No advice generated.";
                // Handle newlines
                advice = advice.replace(/\\n/g, '\n');

                const cropTag = selectedCrop ? `<span class="context-tag">${selectedCrop}</span>` : '';
                responseContent.innerHTML = `
                    <div class="gemini-response">
                        <div class="response-meta">
                            <span class="response-source">
                                <i class="fas fa-robot"></i>
                                ${cropTag}
                            </span>
                        </div>
                        <div class="response-text">
                            <p>${advice.replace(/\n/g, '</p><p>')}</p>
                        </div>
                    </div>
                `;
                console.log('Injected HTML:', responseContent.innerHTML);
            } else {
                const errorText = await response.text();
                responseContent.innerHTML = `<div class="error-response"><i class="fas fa-exclamation-triangle"></i> ${errorText}</div>`;
            }

        } catch (error) {
            console.error('❌ Advisory.js: Network error:', error);
            responseContent.innerHTML = `<div class="error-response"><i class="fas fa-wifi-slash"></i> नेटवर्क त्रुटि: ${error.message}</div>`;
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Get Result';
        }
    });

    // Enter key support
    queryInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitBtn.click();
        }
    });

    console.log('✅ Advisory.js: Event listeners setup complete');
}

function shouldUseCropSpecificEndpoint(query) {
    // ... your existing code
}

function setCropQuery(crop, query) {
    document.getElementById('cropSelect').value = crop;
    document.getElementById('advisoryQuery').value = query;
}
