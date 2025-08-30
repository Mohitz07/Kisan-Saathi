// src/main/resources/static/js/nav.js
export function initNav() {
  // Smooth scroll for internal nav links
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      const href = item.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Hero CTA scroll to features
  const analyzeBtn = document.getElementById('analyzeCropBtn');
  const features = document.getElementById('features');
  if (analyzeBtn && features) {
    analyzeBtn.addEventListener('click', () => {
      features.scrollIntoView({ behavior: 'smooth' });
    });
  }
}
