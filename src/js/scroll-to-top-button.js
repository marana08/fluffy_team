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
