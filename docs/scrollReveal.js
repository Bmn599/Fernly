(function() {
  function init() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.scroll-reveal').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const lines = entry.target.querySelectorAll('.reveal-line');
          if (lines.length) {
            lines.forEach((line, idx) => {
              setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
              }, idx * 150);
            });
          } else {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      prepareLines(el);
      observer.observe(el);
    });

    function prepareLines(container) {
      container.querySelectorAll('p, h1, h2, h3, li').forEach(el => {
        if (el.childElementCount === 0) {
          const text = el.textContent.trim();
          const sentences = text.match(/[^.!?]+[.!?]*/g) || [text];
          if (sentences.length > 1) {
            el.innerHTML = sentences
              .map(s => `<span class="reveal-line">${s.trim()}</span>`)
              .join(' ');
          }
        }
      });
    }
  }

  if (document.readyState !== 'loading') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();
