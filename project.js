/* ============================================================
   project.js — Aaron Joseph Antonio Portfolio
   ============================================================ */

// ===== SCROLL REVEAL =====
const revealTargets = document.querySelectorAll(
    '.feat-card, .proj-mini-card, .cta-box'
);

const styleEl = document.createElement('style');
styleEl.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(styleEl);

const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealTargets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.7s ease ${i * 0.08}s, transform 0.7s ease ${i * 0.08}s`;
    revealObs.observe(el);
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
        }
    });
});

console.log('Projects page loaded ✓');