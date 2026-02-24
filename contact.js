/* ============================================================
   contact.js — Aaron Joseph Antonio Portfolio
   ============================================================ */

// ===== SCROLL REVEAL =====
const styleEl = document.createElement('style');
styleEl.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) translateX(0) !important; }`;
document.head.appendChild(styleEl);

const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

['.contact-form-col', '.contact-info-col', '.cta-box'].forEach(sel => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
    revealObs.observe(el);
});

// ===== FORM: Loading state on submit =====
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', () => {
        const btn = form.querySelector('.btn-submit');
        if (btn) {
            btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;
        }
    });

    // Focus lift on inputs
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.transform = 'translateY(-1px)';
            input.parentElement.style.transition = 'transform 0.2s ease';
        });
        input.addEventListener('blur', () => {
            input.parentElement.style.transform = 'translateY(0)';
        });
    });
}

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

console.log('Contact page loaded ✓');