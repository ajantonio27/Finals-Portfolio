/* ============================================================
   script.js — Aaron Joseph Antonio Portfolio
   ============================================================ */

// ===== FLOATING DOTS BACKGROUND =====
(function () {
    const canvas = document.createElement('canvas');
    canvas.id = 'dots-bg';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    const CFG = {
        count:      80,
        minR:       1.0,
        maxR:       2.2,
        minSpeed:   0.08,
        maxSpeed:   0.20,
        minOpacity: 0.06,
        maxOpacity: 0.22,
    };

    let W, H, dots = [];

    const rand = (a, b) => Math.random() * (b - a) + a;

    function makeDot() {
        return {
            x:    rand(0, W),
            y:    rand(0, H),
            r:    rand(CFG.minR, CFG.maxR),
            vx:   rand(-CFG.maxSpeed, CFG.maxSpeed),
            vy:   rand(-CFG.maxSpeed, CFG.maxSpeed) || CFG.minSpeed,
            op:   rand(CFG.minOpacity, CFG.maxOpacity),
            fade: rand(0.0003, 0.0007),
            dir:  Math.random() > 0.5 ? 1 : -1,
        };
    }

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    function tick() {
        ctx.clearRect(0, 0, W, H);
        dots.forEach(d => {
            d.x += d.vx;
            d.y += d.vy;
            if (d.x < -4) d.x = W + 4;
            if (d.x > W + 4) d.x = -4;
            if (d.y < -4) d.y = H + 4;
            if (d.y > H + 4) d.y = -4;
            d.op += d.fade * d.dir;
            if (d.op >= CFG.maxOpacity) d.dir = -1;
            if (d.op <= CFG.minOpacity) d.dir =  1;
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const dotRGB = isLight ? '15,23,36' : '255,255,255';
            ctx.fillStyle = `rgba(${dotRGB},${d.op})`;
            ctx.fill();
        });
        requestAnimationFrame(tick);
    }

    resize();
    dots = Array.from({ length: CFG.count }, makeDot);
    tick();

    window.addEventListener('resize', () => {
        resize();
        dots.forEach(d => { d.x = rand(0, W); d.y = rand(0, H); });
    });
})();

// ===== NAVBAR: Mobile Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu   = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

// ===== NAVBAR: Shadow on scroll =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) navbar.style.boxShadow = window.scrollY > 40
        ? '0 4px 24px rgba(0,0,0,0.6)' : 'none';
}, { passive: true });

// ===== TYPING EFFECT =====
const typingEl = document.querySelector('.typing-text');
const roles = [
    'Web Developer | IT Student | UI/UX & Digital Marketing Enthusiast'
];
if (typingEl) {
    let roleIdx = 0, charIdx = 0, deleting = false;
    (function type() {
        const current = roles[roleIdx];
        typingEl.textContent = current.slice(0, charIdx);
        if (!deleting && charIdx < current.length) {
            charIdx++;
            setTimeout(type, 55);
        } else if (!deleting && charIdx === current.length) {
            setTimeout(() => { deleting = true; type(); }, 2800);
        } else if (deleting && charIdx > 0) {
            charIdx--;
            setTimeout(type, 30);
        } else {
            deleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            setTimeout(type, 400);
        }
    })();
}

// ===== STAT COUNTERS =====
const statNums = document.querySelectorAll('.stat-num');
if (statNums.length) {
    const ease = t => t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
    const animateCounter = (el) => {
        const target = +el.dataset.target;
        const start  = +el.textContent;
        const dur    = 1200;
        const t0     = performance.now();
        (function step(now) {
            const p = Math.min((now - t0) / dur, 1);
            el.textContent = Math.round(start + (target - start) * ease(p));
            if (p < 1) requestAnimationFrame(step);
        })(performance.now());
    };
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); }});
    }, { threshold: 0.5 });
    statNums.forEach(el => obs.observe(el));
}

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.reveal');
if (reveals.length) {
    const revObs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); revObs.unobserve(e.target); }});
    }, { threshold: 0.1 });
    reveals.forEach(el => revObs.observe(el));
}


// ===== THEME TOGGLE (dark / light) =====
(function () {
    const THEME_KEY = 'theme-mode';
    const root = document.documentElement;
    const toggle = document.getElementById('theme-toggle');

    const setIcon = (iconEl, mode) => {
        if (!iconEl) return;
        iconEl.className = mode === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    };

    function applyTheme(mode) {
        if (mode === 'light') root.setAttribute('data-theme', 'light');
        else root.removeAttribute('data-theme');

        const iconEl = toggle ? toggle.querySelector('i') : null;
        setIcon(iconEl, mode);

        if (toggle) {
            toggle.setAttribute('aria-pressed', mode === 'light' ? 'true' : 'false');
            toggle.title = mode === 'light' ? 'Switch to dark theme' : 'Switch to light theme';
        }
    }

    // Listen to system preference changes (only when user hasn't chosen)
    const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)');
    if (mq && mq.addEventListener) {
        mq.addEventListener('change', (e) => {
            try {
                if (!localStorage.getItem(THEME_KEY)) applyTheme(e.matches ? 'light' : 'dark');
            } catch (err) { /* ignore */ }
        });
    }

    // Initialize from localStorage or prefers-color-scheme
    try {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved) applyTheme(saved);
        else {
            const prefersLight = mq ? mq.matches : false;
            applyTheme(prefersLight ? 'light' : 'dark');
        }
    } catch (e) { applyTheme('dark'); }

    if (toggle) {
        toggle.addEventListener('click', () => {
            const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const next = current === 'light' ? 'dark' : 'light';
            applyTheme(next);
            try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
        });
    }
})();