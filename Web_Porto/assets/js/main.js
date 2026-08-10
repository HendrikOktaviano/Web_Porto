/**
 * HENDRIK OKTAVIANO — IoT PORTFOLIO
 * Main JavaScript — Interactions & Animations
 */

'use strict';

/* ──────────────────────────────────────────
   1. NAVBAR
   ────────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav-link');

// Scroll → glassmorphism + shrink navbar
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // scrolled class: slight compaction after 20px
  navbar.classList.toggle('scrolled', scrollY > 20);

  // shrunk class: compact size when past hero (viewport height)
  const heroHeight = document.getElementById('home')?.offsetHeight || window.innerHeight;
  navbar.classList.toggle('shrunk', scrollY > heroHeight * 0.85);

  updateActiveNav();
  toggleBackToTop();
}, { passive: true });

// Mobile toggle
navToggle.addEventListener('click', () => {
  const open = navToggle.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
});

// Close menu on link click
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Active nav based on scroll position
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
}


/* ──────────────────────────────────────────
   CV DOWNLOAD BUTTON
   ────────────────────────────────────────── */
const cvBtn = document.getElementById('cvDownloadBtn');
if (cvBtn) {
  cvBtn.addEventListener('click', (e) => {
    // URL is already set as href attribute.
    // This handler adds a visual feedback pulse on click.
    cvBtn.classList.add('cv-pulse');
    setTimeout(() => cvBtn.classList.remove('cv-pulse'), 600);
    // Note: replace YOUR_FILE_ID_HERE in the href with your real Google Drive file ID.
    // Example: https://drive.google.com/file/d/1aBcDeFgHiJkLmNoPqRsTuVwXyZ/view?usp=sharing
  });
}


/* ──────────────────────────────────────────
   2. HERO — ROLE TEXT ROTATOR
   ────────────────────────────────────────── */
const roles = [
  'Internet of Things Enthusiast',
  'Embedded System Learner',
  'AI & Smart Technology Enthusiast',
];
let roleIndex = 0;
const roleEl = document.getElementById('roleText');

function rotateRole() {
  if (!roleEl) return;
  roleEl.style.opacity = '0';
  roleEl.style.transform = 'translateY(-10px)';
  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleEl.textContent = roles[roleIndex];
    roleEl.style.transition = 'opacity .5s ease, transform .5s ease';
    roleEl.style.opacity = '1';
    roleEl.style.transform = 'translateY(0)';
  }, 350);
}
// Set initial transition style
if (roleEl) {
  roleEl.style.transition = 'opacity .5s ease, transform .5s ease';
}
setInterval(rotateRole, 3000);


/* ──────────────────────────────────────────
   3. REVEAL ON SCROLL (Intersection Observer)
   ────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal, .fade-in-left, .fade-in-right').forEach(el => {
  revealObserver.observe(el);
});


/* ──────────────────────────────────────────
   4. ANIMATED SKILL BARS
   ────────────────────────────────────────── */
const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = width + '%'; }, 200);
      });
      skillBarObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.25 });

document.querySelectorAll('.skills-card').forEach(card => {
  skillBarObserver.observe(card);
});


/* ──────────────────────────────────────────
   5. GALLERY FILTER
   ────────────────────────────────────────── */
const filterBtns   = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    galleryItems.forEach(item => {
      const cat = item.getAttribute('data-category');
      const show = filter === 'all' || cat === filter;
      item.style.opacity = '0';
      item.style.transform = 'scale(.95)';
      setTimeout(() => {
        item.classList.toggle('hidden', !show);
        if (show) {
          requestAnimationFrame(() => {
            item.style.transition = 'opacity .4s ease, transform .4s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        }
      }, 200);
    });
  });
});


/* ──────────────────────────────────────────
   6. BACK TO TOP
   ────────────────────────────────────────── */
const backToTopBtn = document.getElementById('backToTop');

function toggleBackToTop() {
  if (backToTopBtn) {
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
  }
}

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ──────────────────────────────────────────
   7. SMOOTH HOVER ON TECH CARDS (stagger)
   ────────────────────────────────────────── */
document.querySelectorAll('.tech-cards-row').forEach(row => {
  row.querySelectorAll('.tech-card').forEach((card, i) => {
    card.style.setProperty('--i', i);
  });
});

document.querySelectorAll('.info-cards-grid').forEach(grid => {
  grid.querySelectorAll('.info-card').forEach((card, i) => {
    card.style.setProperty('--i', i);
  });
});


/* ──────────────────────────────────────────
   8. STATS NUMBER COUNTER ANIMATION
   ────────────────────────────────────────── */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const ticker = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start) + '+';
    if (start >= target) clearInterval(ticker);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(num => {
        const val = parseInt(num.textContent.replace('+', ''));
        animateCounter(num, val);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);


/* ──────────────────────────────────────────
   9. CURSOR GLOW EFFECT (subtle)
   ────────────────────────────────────────── */
const glow = document.createElement('div');
glow.style.cssText = `
  position: fixed; pointer-events: none; z-index: 9999;
  width: 300px; height: 300px; border-radius: 50%;
  background: radial-gradient(circle, rgba(168,218,220,0.08) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  transition: left .15s ease, top .15s ease;
  mix-blend-mode: multiply;
`;
document.body.appendChild(glow);

let glowX = 0, glowY = 0;
document.addEventListener('mousemove', e => {
  glowX += (e.clientX - glowX) * 0.12;
  glowY += (e.clientY - glowY) * 0.12;
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
}, { passive: true });


/* ──────────────────────────────────────────
   10. TIMELINE ITEMS — staggered reveal
   ────────────────────────────────────────── */
// Timeline uses the unified revealObserver above (class .reveal).
// Stagger delay is applied via CSS custom property --i on each item.
document.querySelectorAll('.timeline-item').forEach((item, i) => {
  item.style.setProperty('--i', i);
});


/* ──────────────────────────────────────────
   11. PROJECT CARDS — alternate color accents
   ────────────────────────────────────────── */
// Subtle shimmer on project hover
document.querySelectorAll('.project-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.transition = 'box-shadow .3s ease';
  });
});


/* ──────────────────────────────────────────
   12. INIT
   ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Trigger initial nav highlight
  updateActiveNav();

  // Ensure hero animations fire immediately
  document.querySelectorAll('.fade-in-left, .fade-in-right').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 200 + 100);
  });

  // Force-reveal any .reveal elements already in viewport on load
  // (handles cases where user lands directly on a scrolled position)
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      }
    });
  }, 150);

  // Scroll to #hash if present
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 400);
  }

  // Certificate images: show placeholder if src is empty or fails to load
  document.querySelectorAll('.cert-img').forEach(img => {
    const placeholder = img.nextElementSibling;
    if (!img.src || img.src === window.location.href) {
      // No src set — hide img, show placeholder
      img.style.display = 'none';
      if (placeholder) placeholder.style.display = 'flex';
    } else {
      // Has src — hide placeholder while loading
      if (placeholder) placeholder.style.display = 'none';
      img.addEventListener('error', () => {
        img.style.display = 'none';
        if (placeholder) placeholder.style.display = 'flex';
      });
      img.addEventListener('load', () => {
        if (placeholder) placeholder.style.display = 'none';
        img.style.display = 'block';
      });
    }
  });

  // Project Image Modal Logic
  const imageModal = document.getElementById('imageModal');
  const imageModalImg = document.getElementById('imageModalImg');
  const imageModalClose = document.getElementById('imageModalClose');
  const projectOverlayBtns = document.querySelectorAll('.project-overlay-btn');

  if (imageModal && imageModalImg && imageModalClose) {
    projectOverlayBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const wrap = btn.closest('.project-image-wrap');
        if (wrap) {
          const img = wrap.querySelector('.project-img');
          if (img) {
            imageModalImg.src = img.src;
            imageModalImg.alt = img.alt;
            imageModal.classList.add('open');
          }
        }
      });
    });

    imageModalClose.addEventListener('click', () => {
      imageModal.classList.remove('open');
    });

    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal) {
        imageModal.classList.remove('open');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imageModal.classList.contains('open')) {
        imageModal.classList.remove('open');
      }
    });
  }
});
