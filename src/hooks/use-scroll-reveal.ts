import { useEffect } from 'react';

/**
 * Wires up IntersectionObserver to add `.is-visible` to any element
 * with `.reveal`, `.reveal-up`, or `.reveal-scale` class.
 * Apple-style: elements animate in once as they enter the viewport.
 */
export function useScrollReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(
      '.reveal, .reveal-up, .reveal-scale'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // animate once only
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
}
