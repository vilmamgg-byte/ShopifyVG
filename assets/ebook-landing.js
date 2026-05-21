/* ==============================================
   EBOOK LANDING — INTERACTIONS & ANIMATIONS
   ============================================== */
(function () {
  'use strict';

  /* ── Header: transparent → solid on scroll ── */
  const header = document.getElementById('el-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Smooth scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });

      // Close mobile nav if open
      const mobileNav = document.querySelector('.el-mobile-nav');
      if (mobileNav && mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('open');
        document.querySelector('.el-mobile-toggle')?.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  /* ── Mobile menu toggle ── */
  const mobileToggle = document.querySelector('.el-mobile-toggle');
  const mobileNav    = document.querySelector('.el-mobile-nav');

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  /* ── Scroll-reveal via IntersectionObserver ── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.10, rootMargin: '0px 0px -48px 0px' }
  );

  document.querySelectorAll('.el-anim').forEach(el => revealObserver.observe(el));

  /* ── FAQ accordion ── */
  document.querySelectorAll('.el-faq-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const item   = this.closest('.el-faq-item');
      const body   = item.querySelector('.el-faq-body');
      const isOpen = item.classList.contains('open');

      // Collapse all open items
      document.querySelectorAll('.el-faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.el-faq-body').style.maxHeight = '0';
      });

      // Expand clicked item if it was closed
      if (!isOpen) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });

  /* ── Book 3D parallax on mouse move ── */
  const bookEl    = document.querySelector('.el-book');
  const heroVisual = document.querySelector('.el-hero-visual');

  if (bookEl && heroVisual) {
    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 12;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
      bookEl.style.transform =
        `perspective(1400px) rotateY(${-25 + x}deg) rotateX(${4 - y}deg)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
      bookEl.style.transform = '';
    });
  }

  /* ── Animated stat counters ── */
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const end    = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dec    = el.dataset.dec    || 0;
        const dur    = 1600;
        let   start  = null;

        const step = (ts) => {
          if (!start) start = ts;
          const prog = Math.min((ts - start) / dur, 1);
          const ease = 1 - Math.pow(1 - prog, 3);
          const val  = (end * ease).toFixed(dec);
          el.textContent = val + suffix;
          if (prog < 1) requestAnimationFrame(step);
          else el.textContent = end.toFixed(dec) + suffix;
        };

        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  /* ── Active nav link on scroll ── */
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('.el-nav a[href^="#"], .el-mobile-nav a[href^="#"]');

  if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach(link => {
              link.style.color = link.getAttribute('href') === `#${id}`
                ? 'var(--el-white)'
                : '';
            });
          }
        });
      },
      { threshold: 0.35, rootMargin: '-80px 0px 0px 0px' }
    );
    sections.forEach(s => sectionObserver.observe(s));
  }

})();
