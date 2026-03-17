/* ============================================
NOKTA SOSYAL MEDYA — script.js
============================================ */

(function () {
‘use strict’;

/* –– 1. NAVBAR SCROLL –– */
const navbar = document.getElementById(‘navbar’);

function handleScroll() {
if (window.scrollY > 40) {
navbar.classList.add(‘scrolled’);
} else {
navbar.classList.remove(‘scrolled’);
}
}

window.addEventListener(‘scroll’, handleScroll, { passive: true });
handleScroll(); // Run on load

/* –– 2. MOBILE MENU –– */
const menuToggle = document.querySelector(’.menu-toggle’);
const mobileMenu = document.querySelector(’.mobile-menu’);

if (menuToggle && mobileMenu) {
menuToggle.addEventListener(‘click’, function () {
const isOpen = mobileMenu.classList.toggle(‘open’);
menuToggle.classList.toggle(‘active’, isOpen);
menuToggle.setAttribute(‘aria-expanded’, String(isOpen));
mobileMenu.setAttribute(‘aria-hidden’, String(!isOpen));
});

```
// Close on link click
mobileMenu.querySelectorAll('a').forEach(function (link) {
  link.addEventListener('click', function () {
    mobileMenu.classList.remove('open');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
  });
});
```

}

/* –– 3. SCROLL REVEAL –– */
const revealEls = document.querySelectorAll(’[data-reveal]’);

if (‘IntersectionObserver’ in window) {
const observer = new IntersectionObserver(
function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
entry.target.classList.add(‘revealed’);
observer.unobserve(entry.target);
}
});
},
{ threshold: 0.12, rootMargin: ‘0px 0px -40px 0px’ }
);

```
revealEls.forEach(function (el, i) {
  // Stagger delay based on sibling index
  const siblings = el.parentElement
    ? Array.from(el.parentElement.querySelectorAll('[data-reveal]'))
    : [];
  const idx = siblings.indexOf(el);
  if (idx > 0) {
    el.style.transitionDelay = (idx * 0.1) + 's';
  }
  observer.observe(el);
});
```

} else {
// Fallback: reveal all immediately
revealEls.forEach(function (el) {
el.classList.add(‘revealed’);
});
}

/* –– 4. SMOOTH SCROLL for anchor links –– */
document.querySelectorAll(‘a[href^=”#”]’).forEach(function (anchor) {
anchor.addEventListener(‘click’, function (e) {
const target = document.querySelector(this.getAttribute(‘href’));
if (!target) return;
e.preventDefault();
const offset = 80;
const top = target.getBoundingClientRect().top + window.scrollY - offset;
window.scrollTo({ top: top, behavior: ‘smooth’ });
});
});

/* –– 5. ACTIVE NAV LINK on scroll –– */
const sections = document.querySelectorAll(‘section[id]’);
const navLinks = document.querySelectorAll(’.nav-links a’);

function setActiveNav() {
const scrollY = window.scrollY + 120;
sections.forEach(function (section) {
const top = section.offsetTop;
const height = section.offsetHeight;
const id = section.getAttribute(‘id’);
if (scrollY >= top && scrollY < top + height) {
navLinks.forEach(function (link) {
link.style.color = ‘’;
if (link.getAttribute(‘href’) === ‘#’ + id) {
link.style.color = ‘#00d4ff’;
}
});
}
});
}

window.addEventListener(‘scroll’, setActiveNav, { passive: true });

/* –– 6. PORTFOLIO CARD tilt effect –– */
const portfolioCards = document.querySelectorAll(’.portfolio-img’);

portfolioCards.forEach(function (card) {
card.addEventListener(‘mousemove’, function (e) {
const rect = card.getBoundingClientRect();
const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
card.style.transform = ‘perspective(600px) rotateX(’ + y + ‘deg) rotateY(’ + x + ‘deg) scale(1.02)’;
});
card.addEventListener(‘mouseleave’, function () {
card.style.transform = ‘’;
});
});

/* –– 7. STATS COUNTER ANIMATION –– */
const stats = document.querySelectorAll(’.stat strong’);

function animateCounter(el) {
const text = el.textContent.trim();
const match = text.match(/^(\d+)/);
if (!match) return;
const target = parseInt(match[1], 10);
const suffix = text.replace(match[1], ‘’);
let current = 0;
const duration = 1200;
const step = Math.ceil(target / (duration / 16));
const timer = setInterval(function () {
current = Math.min(current + step, target);
el.textContent = current + suffix;
if (current >= target) clearInterval(timer);
}, 16);
}

if (‘IntersectionObserver’ in window) {
const statsObserver = new IntersectionObserver(
function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
animateCounter(entry.target);
statsObserver.unobserve(entry.target);
}
});
},
{ threshold: 0.5 }
);
stats.forEach(function (stat) { statsObserver.observe(stat); });
}

})();
