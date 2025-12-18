// Секція "Все, що ви хотіли знати"
import Accordion from 'accordion-js';

const faqAccordion = new Accordion('.accordion-container', {
  showMultiple: false,
  collapse: true,
  duration: 300,

  onOpen(current) {
    const panel = current.querySelector('.ac-panel');
    if (!panel) return;

    const rect = panel.getBoundingClientRect();
    if (rect.bottom > window.innerHeight) {
      const hiddenHeight = rect.bottom - window.innerHeight + 20;
      window.scrollBy({ top: hiddenHeight, behavior: 'smooth' });
    }
  },
});

const faqButtons = document.querySelectorAll('.faq-question-btn');

faqButtons.forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute(
      'aria-label',
      expanded ? 'Закрити відповідь' : 'Відкрити відповідь'
    );
  });
});
