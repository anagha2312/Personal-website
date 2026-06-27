/* ─── TYPED SUBTITLE ─────────────────────────────────────────── */
const phrases = [
    'CS & AI/ML Student @ IIIT-H',
    'Undergraduate Researcher @ SERC',
    'Full-Stack Developer',
    'Systems Programmer',
    'Quant Enthusiast',
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;
const typedEl = document.getElementById('typed');

function type() {
    const current = phrases[phraseIndex];
    if (!deleting) {
        typedEl.textContent = current.slice(0, ++charIndex);
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(type, 1800);
            return;
        }
    } else {
        typedEl.textContent = current.slice(0, --charIndex);
        if (charIndex === 0) {
            deleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
        }
    }
    setTimeout(type, deleting ? 42 : 72);
}

type();

/* ─── SCROLL REVEAL ──────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─── NAVBAR SCROLL SHADOW ───────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20
        ? '0 4px 32px rgba(0, 0, 0, 0.6)'
        : 'none';
});

/* ─── HAMBURGER MENU ─────────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

document.querySelectorAll('#navLinks a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ─── ACTIVE NAV HIGHLIGHT ───────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navItems  = document.querySelectorAll('#navLinks a');

function updateActiveNav() {
    let current = '';
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 130) {
            current = section.id;
        }
    });
    navItems.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
updateActiveNav();
