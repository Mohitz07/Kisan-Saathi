class LanguageManager {
    constructor() {
        this.translations = {
            en: {
                nav: {
                    dashboard: 'Dashboard',
                    weather: 'Weather',
                    disease: 'Disease Detection',
                    soil: 'Soil Monitor',
                    market: 'Market Prices',
                    schemes: 'Schemes Fetcher',
                    advisory: 'AI Agro Advisory',
                    analytics: 'Analytics',
                    more: 'More',
                    settings: 'Settings'
                },
                image: {
                    upload: 'Upload Image',
                    analysis: 'Image Analysis',
                    result: 'Analysis Result'
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
                        desc: 'Get real-time weather updates.',
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
                nav: {
                    dashboard: 'डैशबोर्ड',
                    weather: 'मौसम',
                    disease: 'रोग का पता लगाना',
                    soil: 'मिट्टी निगरानी',
                    market: 'बाजार की कीमतें',
                    schemes: 'योजना खोजना',
                    advisory: 'एआई कृषि सलाह',
                    analytics: 'विश्लेषण',
                    more: 'अधिक',
                    settings: 'सेटिंग्स'
                },
                image: {
                    upload: 'छवि अपलोड करें',
                    analysis: 'छवि विश्लेषण',
                    result: 'विश्लेषण परिणाम'
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
                        desc: 'जागरूक खेती के निर्णय के लिए वास्तविक समय मौसम प्राप्त करें।',
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
                nav: {
                    dashboard: 'डॅशबोर्ड',
                    weather: 'हवामान',
                    disease: 'आजार निदान',
                    soil: 'मृदा निरीक्षण',
                    market: 'बाजार भाव',
                    schemes: 'योजना शोधा',
                    advisory: 'एआय कृषी सल्लागार',
                    analytics: 'विश्लेषण',
                    more: 'अधिक',
                    settings: 'सेटिंग्स'
                },
                image: {
                    upload: 'छायाचित्र अपलोड करा',
                    analysis: 'अपलोड विश्लेषण',
                    result: 'अपलोड परिणाम'
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
                        desc: 'माहितीपूर्वक शेतीच्या निर्णयांसाठी वास्तविक वेळ हवामान अंदाज मिळवा.',
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

    init() {
        this.wrapButtonText();
        this.updateLanguage(this.currentLanguage);
        this.setupLanguageSelector();
    }

    wrapButtonText() {
        const buttons = document.querySelectorAll('button, .nav-item, .feature-btn');
        buttons.forEach(btn => {
            const text = btn.textContent.trim();
            if (text && !btn.querySelector('.btn-text') && !btn.querySelector('.nav-text')) {
                if (btn.classList.contains('nav-item')) {
                    btn.innerHTML = `<span class="nav-text">${text}</span>`;
                } else {
                    btn.innerHTML = `<span class="btn-text">${text}</span>`;
                }
            }
        });

        document.querySelectorAll('.feature-card h3, .feature-card p, #imageAnalysisResult h3').forEach(el => {
            const text = el.textContent.trim();
            if (text && !el.querySelector('.card-text')) {
                el.innerHTML = `<span class="card-text">${text}</span>`;
            }
        });
    }

    setupLanguageSelector() {
        const selector = document.getElementById('languageSelect');
        if (selector) {
            selector.value = this.currentLanguage;
            selector.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }
    }

    changeLanguage(lang) {
        this.currentLanguage = lang;
        this.updateLanguage(lang);
        localStorage.setItem('preferredLanguage', lang);
    }

    updateLanguage(lang) {
        const t = this.translations[lang];
        document.documentElement.setAttribute('lang', lang);

        // Update nav bar
        this.updateText('[href="index.html"] .nav-text', t.nav.dashboard);
        this.updateText('[href="weather.html"] .nav-text', t.nav.weather);
        this.updateText('[href="disease.html"] .nav-text', t.nav.disease);
        this.updateText('[href="soil-monitor.html"] .nav-text', t.nav.soil);
        this.updateText('[href="market.html"] .nav-text', t.nav.market);
        this.updateText('[href="schemes.html"] .nav-text', t.nav.schemes);
        this.updateText('[href="advisory.html"] .nav-text', t.nav.advisory);

        // Update image
        this.updateText('#diseaseUploadBtn .btn-text', t.image.upload);
        this.updateText('#imageAnalysisResult h3 .card-text', t.image.result);

        // Update hero
        this.updateText('.hero-content h1', t.hero.title);
        this.updateText('.hero-content p', t.hero.subtitle);
        this.updateText('#analyzeCropBtn .btn-text', t.hero.analyze);
        this.updateText('.btn-secondary .btn-text', t.hero.knowledge);

        // Update features
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

        // Update soil
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

    updateElement(selector, property, value) {
        const element = document.querySelector(selector);
        if (element) {
            element[property] = value;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
    window.languageManager.init();
});
