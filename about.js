/* ============================================================
   about.js — Aaron Joseph Antonio Portfolio
   ============================================================ */

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
    '.intro-grid, .highlights-grid, .skills-cols, .certs-grid, .about-cta-section .cta-box'
);

const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    revealObs.observe(el);
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.revealed, [style]').forEach(() => {});
});

// Add revealed class handler via CSS
const styleEl = document.createElement('style');
styleEl.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(styleEl);

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

console.log('About page loaded ✓');