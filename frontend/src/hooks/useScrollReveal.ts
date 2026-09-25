import { useEffect, useRef } from 'react';

/**
 * Attach this ref to any element.
 * When it enters the viewport, the class `is-visible` is added.
 * Pair with CSS: .reveal { opacity:0; transform:translateY(32px); transition: ... }
 *                .reveal.is-visible { opacity:1; transform:none; }
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px'
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.unobserve(el); // fire once
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
