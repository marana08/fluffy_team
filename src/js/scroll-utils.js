const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

function initScrollAnimations() {
  const elementsToAnimate = document.querySelectorAll(`
    .animate-on-scroll,
    .animate-fade-in,
    .animate-slide-up,
    .animate-slide-left,
    .animate-slide-right,
    .animate-scale-in
  `);

  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
  initScrollAnimations();
}

export function observeNewElements(container) {
  if (!container) return;
  
  const newElements = container.querySelectorAll(`
    .animate-on-scroll,
    .animate-fade-in,
    .animate-slide-up,
    .animate-slide-left,
    .animate-slide-right,
    .animate-scale-in
  `);
  
  newElements.forEach(element => {
    if (!element.classList.contains('animate-in')) {
      observer.observe(element);
    }
  });
}

function isHeaderVisible(header) {
  if (!header) return true;
  const headerRect = header.getBoundingClientRect();
  return headerRect.bottom > 0;
}

function toggleScrollButtonVisibility(button, header) {
  if (!button) return;
  const visible = !isHeaderVisible(header);
  button.classList.toggle('is-visible', visible);
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
  
  setTimeout(() => {
    import('./section-tracker.js').then((module) => {
      if (module.resetSection) {
        module.resetSection();
      }
    });
  }, 500);
}

function createScrollHandler(button, header) {
  let ticking = false;

  return () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        toggleScrollButtonVisibility(button, header);
        ticking = false;
      });
      ticking = true;
    }
  };
}

function handleKeyDown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    scrollToTop();
  }
}

function initScrollToTopButton() {
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  const header = document.querySelector('#header');

  if (!scrollToTopBtn || !header) {
    return;
  }

  toggleScrollButtonVisibility(scrollToTopBtn, header);

  const scrollHandler = createScrollHandler(scrollToTopBtn, header);
  window.addEventListener('scroll', scrollHandler, { passive: true });

  scrollToTopBtn.addEventListener('click', scrollToTop);
  scrollToTopBtn.addEventListener('keydown', handleKeyDown);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollToTopButton);
} else {
  initScrollToTopButton();
}
