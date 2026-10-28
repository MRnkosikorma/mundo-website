/**
 * Mundo — Interactive Features & Performance Enhancements
 */
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Sticky header background blur and border transition
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 24) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // 3. Smooth scroll reveal for data-reveal elements
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('revealed'));
  }

  // 4. Auto-close mobile menu on navigation link click
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenu) {
    mobileMenu.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.removeAttribute('open');
      });
    });
  }

  // 5. Dual theme toggle logic (Light / Dark)
  if (typeof window.updateThemeUI === 'function') {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    window.updateThemeUI(currentTheme);
  }
});
