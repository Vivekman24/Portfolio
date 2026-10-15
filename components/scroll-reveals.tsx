'use client';

import { useEffect } from 'react';

// Content stays visible before hydration and after every animation finishes.
export default function ScrollReveals() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window)) return;

    const animations = new Set<Animation>();
    const targets = document.querySelectorAll<HTMLElement>([
      '.studio-name', '.studio-heading', '.concept-editorial-heading',
      '.soft-profile', '.concept-identity-panel', '.concept-story',
      '.concept-section article', '.studio-project', '.concept-contact-form',
      '.network-toolkit-intro', '.network-diagram', '.network-detail',
      '.concept-career-date',
    ].join(','));

    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      visible.forEach((entry, index) => {
        observer.unobserve(entry.target);
        if (preference.matches) return;
        const element = entry.target as HTMLElement;
        const experience = !!element.closest('#experience');
        // Experience moves as a single unit: no transparent text, masks or overlays.
        const animation = element.animate(
          experience
            ? [{ translate: '0 12px' }, { translate: '0 0' }]
            : [{ opacity: 0.25, translate: '0 20px' }, { opacity: 1, translate: '0 0' }],
          { duration: experience ? 480 : 650, delay: Math.min(index * 65, 195), easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' },
        );
        animations.add(animation);
        animation.onfinish = () => { animation.cancel(); animations.delete(animation); };
      });
    }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });

    // Avoid nested reveals (especially inside Experience cards).
    const selected = new Set<Element>(targets);
    targets.forEach(target => {
      let ancestor = target.parentElement;
      while (ancestor && !selected.has(ancestor)) ancestor = ancestor.parentElement;
      if (!ancestor) observer.observe(target);
    });
    const timeline = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('career-visited');
          timeline.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -20% 0px', threshold: 0 });
    document.querySelectorAll('.concept-career-stop').forEach(card => timeline.observe(card));
    const stopMotion = () => {
      if (preference.matches) animations.forEach(animation => animation.cancel());
    };
    preference.addEventListener('change', stopMotion);
    return () => {
      observer.disconnect();
      timeline.disconnect();
      animations.forEach(animation => animation.cancel());
      preference.removeEventListener('change', stopMotion);
    };
  }, []);

  return null;
}
