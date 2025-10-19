// js/translation.js
class LanguageManager {
    constructor() {
        this.translations = {
            en: {
                header: {
                    dashboard: 'Dashboard',
                    weather: 'Weather',
                    disease: 'Disease Detection',
                    soil: 'Soil Monitor',
                    market: 'Market Prices',
                    more: 'More',
                    settings: 'Settings',
                    cropAdvisory: 'Crop Advisory',
                    analytics: 'Analytics'
                },
                hero: {
                    title: 'Smart Farming with AI Assistance',
                    subtitle: 'Kisan-Sathi empowers farmers with AI-driven insights for sustainable agriculture. Make data-informed decisions for better crop yields and farming practices.',
                    analyze: 'Analyze Your Crop',
                    knowledge: 'Knowledge Hub'
                },
                features: {
                    disease: {
                        title: 'Disease Detection',
                        desc: 'Upload crop images for AI-powered disease identification and treatment recommendations.',
                        upload: 'Upload Image'
                    },
                    weather: {
                        title: 'Weather Forecast',
                        desc: 'Get real-time weather updates and 7-day forecasts for informed farming decisions.',
                        get: 'Get Weather',
                        placeholder: 'Enter location'
                    },
                    advisory: {
                        title: 'Crop Advisory',
                        desc: 'Receive personalized crop recommendations based on soil conditions and weather data.',
                        get: 'Get Advice',
                        select: 'Select Crop Type'
                    },
                    market: {
                        title: 'Market Prices',
                        desc: 'Track current market prices for various crops and plan an effective selling strategy.',
                        check: 'Check Prices',
                        select: 'Select Crop'
                    }
                },
                soil: {
                    title: 'Soil Parameter Monitoring',
                    refresh: 'Refresh Data',
                    voice: 'Voice Assistance',
                    nitrogen: 'Nitrogen (N)',
                    phosphorous: 'Phosphorous (P)',
                    potassium: 'Potassium (K)',
                    loading: 'Loading...',
                    advice: 'Your soil advice will appear here.'
                }
            },
            hi: {
                header: {
                    dashboard: 'डैशबोर्ड',
                    weather: 'मौसम',
                    disease: 'रोग का पता लगाना',
                    soil: 'मिट्टी निगरानी',
                    market: 'बाजार की कीमतें',
                    more: 'अधिक',
                    settings: 'सेटिंग्स',
                    cropAdvisory: 'फसल सलाह',
                    analytics: 'विश्लेषण'
                },
                hero: {
                    title: 'एआई सहायता के साथ स्मार्ट खेती',
                    subtitle: 'किसान-साथी स्थायी कृषि के लिए किसानों को एआई-संचालित अंतर्दृष्टि प्रदान करता है। बेहतर फसल उपज और खेती के अभ्यास के लिए डेटा-सूचित निर्णय लें।',
                    analyze: 'अपनी फसल का विश्लेषण करें',
                    knowledge: 'ज्ञान केंद्र'
                },
                features: {
                    disease: {
                        title: 'रोग का पता लगाना',
                        desc: 'एआई-संचालित रोग पहचान और उपचार सिफारिशों के लिए फसल छवियां अपलोड करें।',
                        upload: 'छवि अपलोड करें'
                    },
                    weather: {
                        title: 'मौसम पूर्वानुमान',
                        desc: 'जागरूक खेती के निर्णय के लिए वास्तविक समय मौसम अद्यतन और 7-दिवसीय पूर्वानुमान प्राप्त करें।',
                        get: 'मौसम प्राप्त करें',
                        placeholder: 'स्थान दर्ज करें'
                    },
                    advisory: {
                        title: 'फसल सलाह',
                        desc: 'मिट्टी की स्थिति और मौसम डेटा के आधार पर व्यक्तिगत फसल अनुशंसाएं प्राप्त करें।',
                        get: 'सलाह प्राप्त करें',
                        select: 'फसल प्रकार चुनें'
                    },
                    market: {
                        title: 'बाजार की कीमतें',
                        desc: 'विभिन्न फसलों के लिए वर्तमान बाजार मूल्य ट्रैक करें और एक प्रभावी बिक्री रणनीति की योजना बनाएं।',
                        check: 'कीमतें देखें',
                        select: 'फसल चुनें'
                    }
                },
                soil: {
                    title: 'मिट्टी पैरामीटर निगरानी',
                    refresh: 'डेटा ताज़ा करें',
                    voice: 'ध्वनि सहायता',
                    nitrogen: 'नाइट्रोजन (एन)',
                    phosphorous: 'फॉस्फोरस (पी)',
                    potassium: 'पोटैशियम (के)',
                    loading: 'लोड हो रहा है...',
                    advice: 'आपकी मिट्टी सलाह यहां दिखाई देगी।'
                }
            },
            mr: {
                header: {
                    dashboard: 'डॅशबोर्ड',
                    weather: 'हवामान',
                    disease: 'आजार निदान',
                    soil: 'मृदा निरीक्षण',
                    market: 'बाजार भाव',
                    more: 'अधिक',
                    settings: 'सेटिंग्स',
                    cropAdvisory: 'पिक सल्लाह',
                    analytics: 'विश्लेषण'
                },
                hero: {
                    title: 'एआय सहायतेसह स्मार्ट शेती',
                    subtitle: 'किसान-साथी शाश्वत शेतीसाठी किसांना एआय-संचालित अंतर्दृष्टी प्रदान करते. चांगले पीक उत्पादन आणि शेतीच्या पद्धतीसाठी डेटावर आधारित निर्णय घ्या.',
                    analyze: 'तुमच्या पिकाचे विश्लेषण करा',
                    knowledge: 'ज्ञान केंद्र'
                },
                features: {
                    disease: {
                        title: 'आजार निदान',
                        desc: 'एआय-संचालित रोग ओळख आणि उपचार शिफारसीसाठी फळांच्या छायाचित्रांचे अपलोड करा.',
                        upload: 'छायाचित्र अपलोड करा'
                    },
                    weather: {
                        title: 'हवामान अंदाज',
                        desc: 'माहितीपूर्वक शेतीच्या निर्णयांसाठी वास्तविक वेळ हवामान अद्यतने आणि 7-दिवसांचा अंदाज मिळवा.',
                        get: 'हवामान मिळवा',
                        placeholder: 'स्थान द्या'
                    },
                    advisory: {
                        title: 'पिक सल्लाह',
                        desc: 'मृदा स्थिती आणि हवामान डेटावर आधारित वैयक्तिकृत पिकांच्या शिफारसी प्राप्त करा.',
                        get: 'सल्ला मिळवा',
                        select: 'पिक प्रकार निवडा'
                    },
                    market: {
                        title: 'बाजार भाव',
                        desc: 'विविध पिकांसाठी चालू बाजार भाव ट्रॅक करा आणि प्रभावी विक्री रणनीती आखा.',
                        check: 'भाव पहा',
                        select: 'पिक निवडा'
                    }
                },
                soil: {
                    title: 'मृदा पॅरामीटर निरीक्षण',
                    refresh: 'डेटा ताजे करा',
                    voice: 'ध्वनी सहाय्य',
                    nitrogen: 'नायट्रोजन (एन)',
                    phosphorous: 'फॉस्फरस (पी)',
                    potassium: 'पोटॅशियम (के)',
                    loading: 'लोड होत आहे...',
                    advice: 'तुमच्या मातीची सूचना इथे दिसेल.'
                }
            }
        };

        this.currentLanguage = localStorage.getItem('preferredLanguage') || 'en';
    }

    // Initialize language manager
    init() {
        this.wrapButtonText();
        this.updateLanguage(this.currentLanguage);
        this.setupLanguageSelector();
    }

    // Add span wrappers to button text for easier targeting
    wrapButtonText() {
        const buttons = document.querySelectorAll('button, .nav-item, .feature-btn');
        buttons.forEach(btn => {
            if (!btn.querySelector('.btn-text') && !btn.classList.contains('nav-item') && !btn.classList.contains('feature-btn')) {
                const text = btn.textContent.trim();
                if (text) {
                    btn.innerHTML = `<span class="btn-text">${text}</span>`;
                }
            }
        });

        // Wrap nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            if (!item.querySelector('.nav-text')) {
                const text = item.textContent.trim();
                if (text && !item.querySelector('i')) {
                    item.innerHTML = `<span class="nav-text">${text}</span>`;
                }
            }
        });

        // Wrap feature card text
        document.querySelectorAll('.feature-card h3, .feature-card p').forEach(el => {
            if (!el.querySelector('.card-text')) {
                const text = el.textContent.trim();
                if (text) {
                    el.innerHTML = `<span class="card-text">${text}</span>`;
                }
            }
        });
    }

    // Setup language selector
    setupLanguageSelector() {
        const selector = document.getElementById('languageSelect');
        if (selector) {
            selector.value = this.currentLanguage;
            selector.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }
    }

    // Change language
    changeLanguage(lang) {
        this.currentLanguage = lang;
        this.updateLanguage(lang);
        localStorage.setItem('preferredLanguage', lang);
    }

    // Update all text elements
    updateLanguage(lang) {
        const t = this.translations[lang];

        // Update html lang attribute
        document.documentElement.setAttribute('lang', lang);

        // Update header navigation
        this.updateText('[href="#dashboard"] .nav-text', t.header.dashboard);
        this.updateText('[href="#weather"] .nav-text', t.header.weather);
        this.updateText('[href="#disease"] .nav-text', t.header.disease);
        this.updateText('[href="#soil"] .nav-text', t.header.soil);
        this.updateText('[href="#market"] .nav-text', t.header.market);

        // Update dropdown
        this.updateText('.dropdown-menu a[href="#advisory"] .nav-text', t.header.cropAdvisory);
        this.updateText('.dropdown-menu a[href="#analytics"] .nav-text', t.header.analytics);
        this.updateText('.dropdown-menu a[href="#settings"] .nav-text', t.header.settings);

        // Update dropdown toggle
        const toggle = document.querySelector('.dropdown-toggle');
        if (toggle) {
            const icon = toggle.querySelector('i');
            toggle.innerHTML = `<span class="nav-text">${t.header.more}</span> `;
            if (icon) toggle.appendChild(icon);
        }

        // Update hero section
        this.updateText('.hero-content h1', t.hero.title);
        this.updateText('.hero-content p', t.hero.subtitle);
        this.updateText('#analyzeCropBtn .btn-text', t.hero.analyze);
        this.updateText('.btn-secondary .btn-text', t.hero.knowledge);

        // Update features section
        this.updateText('#disease .feature-card h3 .card-text', t.features.disease.title);
        this.updateText('#disease .feature-card p .card-text', t.features.disease.desc);
        this.updateText('#diseaseUploadBtn .btn-text', t.features.disease.upload);

        this.updateText('#weather .feature-card h3 .card-text', t.features.weather.title);
        this.updateText('#weather .feature-card p .card-text', t.features.weather.desc);
        this.updateText('#weatherFetchBtn .btn-text', t.features.weather.get);
        this.updateElement('#locationInput', 'placeholder', t.features.weather.placeholder);

        this.updateText('#advisory .feature-card h3 .card-text', t.features.advisory.title);
        this.updateText('#advisory .feature-card p .card-text', t.features.advisory.desc);
        this.updateText('#advisoryBtn .btn-text', t.features.advisory.get);
        this.updateElement('#cropSelect option[value=""]', 'textContent', t.features.advisory.select);

        this.updateText('#market .feature-card h3 .card-text', t.features.market.title);
        this.updateText('#market .feature-card p .card-text', t.features.market.desc);
        this.updateText('#marketBtn .btn-text', t.features.market.check);
        this.updateElement('#marketCrop option[value=""]', 'textContent', t.features.market.select);

        // Update soil section
        this.updateText('.soil-section .section-title', t.soil.title);
        this.updateText('#soilRefreshBtn .btn-text', t.soil.refresh);
        this.updateText('#voiceAssistBtn .btn-text', t.soil.voice);

        this.updateText('.param-card:nth-child(1) h4', t.soil.nitrogen);
        this.updateText('.param-card:nth-child(2) h4', t.soil.phosphorous);
        this.updateText('.param-card:nth-child(3) h4', t.soil.potassium);

        document.querySelectorAll('.param-status').forEach(el => {
            el.textContent = t.soil.loading;
        });

        this.updateElement('#soilAdviceResult', 'textContent', t.soil.advice);
    }

    // Helper to update text content
    updateText(selector, text) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (el.querySelector('.btn-text') || el.querySelector('.nav-text') || el.querySelector('.card-text')) {
                const span = el.querySelector('.btn-text') || el.querySelector('.nav-text') || el.querySelector('.card-text');
                if (span) span.textContent = text;
            } else {
                el.textContent = text;
            }
        });
    }

    // Helper to update element properties
    updateElement(selector, property, value) {
        const element = document.querySelector(selector);
        if (element) {
            element[property] = value;
        }
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
    window.languageManager.init();
});
