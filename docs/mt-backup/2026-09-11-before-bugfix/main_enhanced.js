/* ========================================
   Client Partners English Site - Enhanced JavaScript
   STUDIO-style animations and interactions
   ======================================== */

(function() {
  'use strict';

  /* ========================================
     UTILITY FUNCTIONS
     ======================================== */

  function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
      rect.bottom >= 0
    );
  }

  /* ========================================
     SMOOTH SCROLL
     ======================================== */

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
          const targetPosition = targetElement.offsetTop - headerHeight - 20;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* ========================================
     HAMBURGER MENU
     ======================================== */

  function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      this.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });

    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('nav-open');
      }
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.classList.remove('nav-open');
      });
    });
  }

  /* ========================================
     HEADER SCROLL EFFECT
     ======================================== */

  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const handleScroll = throttle(function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
  }

  /* ========================================
     FADE-IN ANIMATION (STUDIO Style)
     ======================================== */

  function initFadeInAnimation() {
    const animateElements = document.querySelectorAll(`
      .about-section,
      .service-card,
      .cta-box,
      .access-section,
      .office-card
    `);

    animateElements.forEach(el => {
      el.classList.add('fade-in-element');
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-active');
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));
  }

  /* ========================================
     PARALLAX EFFECT (STUDIO Style)
     ======================================== */

  function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    const handleParallax = throttle(function() {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      heroSection.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
    }, 16);

    window.addEventListener('scroll', handleParallax);
  }

  /* ========================================
     SCROLL PROGRESS INDICATOR
     ======================================== */

  function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress__bar"></div>';
    document.body.appendChild(progressBar);

    const progressBarFill = progressBar.querySelector('.scroll-progress__bar');

    const updateProgress = throttle(function() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.pageYOffset;
      const progress = (scrolled / documentHeight) * 100;
      progressBarFill.style.width = `${progress}%`;
    }, 16);

    window.addEventListener('scroll', updateProgress);
  }

  /* ========================================
     HOVER EFFECTS (STUDIO Style)
     ======================================== */

  function initHoverEffects() {
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.4s cubic-bezier(.4, .4, 0, 1)';
      });

      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }

  /* ========================================
     IMAGE LAZY LOADING
     ======================================== */

  function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  /* ========================================
     HERO WATERMARK ANIMATION
     ======================================== */

  function initHeroWatermark() {
    const watermark = document.querySelector('.hero-watermark');
    if (!watermark) return;

    const handleWatermarkScroll = throttle(function() {
      const scrolled = window.pageYOffset;
      const opacity = 1 - (scrolled / 500);
      const scale = 1 + (scrolled / 1000);
      watermark.style.opacity = Math.max(0, opacity);
      watermark.style.transform = `scale(${scale})`;
    }, 16);

    window.addEventListener('scroll', handleWatermarkScroll);
  }

  /* ========================================
     STAGGER ANIMATION FOR SERVICE CARDS
     ======================================== */

  function initStaggerAnimation() {
    const serviceCards = document.querySelectorAll('.service-card');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('stagger-in');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    serviceCards.forEach(card => {
      card.classList.add('stagger-element');
      observer.observe(card);
    });
  }

  /* ========================================
     INITIALIZE ALL
     ======================================== */

  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    initSmoothScroll();
    initHamburgerMenu();
    initHeaderScroll();
    initFadeInAnimation();
    initParallaxEffect();
    initScrollProgress();
    initHoverEffects();
    initLazyLoading();
    initHeroWatermark();
    initStaggerAnimation();

    document.body.classList.add('loaded');
  }

  init();

})();
