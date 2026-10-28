/**
 * NUST MOBILITY — ACCESSIBLE FAQ ACCORDION
 * Handles expanding, collapsing, and keyboard navigation across FAQ items.
 */

document.addEventListener('DOMContentLoaded', () => {
  initFaqAccordion();
});

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  const questionButtons = document.querySelectorAll('.faq-question-btn');

  if (!faqItems.length) return;

  // Toggle single item
  const toggleItem = (targetItem) => {
    const isOpen = targetItem.classList.contains('active');
    const answer = targetItem.querySelector('.faq-answer');
    const button = targetItem.querySelector('.faq-question-btn');

    if (isOpen) {
      // Close
      targetItem.classList.remove('active');
      button.setAttribute('aria-expanded', 'false');
      answer.setAttribute('aria-hidden', 'true');
      answer.style.maxHeight = '0px';
    } else {
      // Open
      targetItem.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
      answer.setAttribute('aria-hidden', 'false');
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  };

  // Click handler
  questionButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const parentItem = btn.closest('.faq-item');
      toggleItem(parentItem);
    });

    // Keyboard navigation (WAI-ARIA Accordion Pattern)
    btn.addEventListener('keydown', (e) => {
      let targetIndex = null;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          targetIndex = (index + 1) % questionButtons.length;
          break;
        case 'ArrowUp':
          e.preventDefault();
          targetIndex = (index - 1 + questionButtons.length) % questionButtons.length;
          break;
        case 'Home':
          e.preventDefault();
          targetIndex = 0;
          break;
        case 'End':
          e.preventDefault();
          targetIndex = questionButtons.length - 1;
          break;
        default:
          return;
      }

      if (targetIndex !== null) {
        questionButtons[targetIndex].focus();
      }
    });
  });

  // Re-calculate open items on window resize for responsive height
  window.addEventListener('resize', () => {
    document.querySelectorAll('.faq-item.active .faq-answer').forEach((answer) => {
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    });
  }, { passive: true });
}
