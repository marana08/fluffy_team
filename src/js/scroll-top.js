function initScrollTop() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  const heroSection = document.querySelector('#hero');

  if (!scrollBtn || !heroSection) return;

  const heroHeight = heroSection.offsetHeight;

  window.addEventListener('scroll', () => {
    if (window.scrollY > heroHeight) {
      scrollBtn.classList.add('show');
    } else {
      scrollBtn.classList.remove('show');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}

window.addEventListener('load', initScrollTop);
