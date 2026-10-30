import type { MotionProps } from 'motion/react';

/** Reveal once on entry; reading back through a page never hides its content. */
export function scrollReveal(delay = 0): MotionProps {
  return {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.08, margin: '0px 0px -48px 0px' },
    transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] },
  };
}
