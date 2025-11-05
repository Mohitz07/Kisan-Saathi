console.log('✅ Market.js: File loaded');

document.addEventListener("DOMContentLoaded", () => {
    const marketBtn = document.getElementById("marketBtn");
    const marketResult = document.getElementById("marketResult");
    const marketCrop = document.getElementById("marketCrop");
    const locationInput = document.getElementById("locationInput");

    marketBtn.addEventListener("click", async () => {
        const crop = marketCrop.value;
        const location = locationInput.value.trim();

        if (!crop) {
            marketResult.innerHTML = "<p>Please select a crop.</p>";
            return;
        }

        if (!location) {
            marketResult.innerHTML = "<p>Please enter a location.</p>";
            return;
        }

        marketResult.innerHTML = '<p>Loading prices...</p>';
        try {
            const response = await fetch('/api/market/get-prices', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ crop, location })
            });

            if (response.ok) {
                const result = await response.json();
                marketResult.innerHTML = result.prices; // Render HTML directly
            } else {
                marketResult.innerHTML = "<p>Error: " + await response.text() + "</p>";
            }
        } catch (error) {
            marketResult.innerHTML = "<p>Network error: " + error.message + "</p>";
        }
    });
});
