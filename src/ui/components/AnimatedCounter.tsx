import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function AnimatedCounter({ value, prefix = '', suffix = '', duration = 1.5 }: { value: number, prefix?: string, suffix?: string, duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration,
      ease: 'power3.out',
      onUpdate: () => {
        if (node) {
          node.innerText = `${prefix}${Math.floor(obj.val)}${suffix}`;
        }
      }
    });
  }, [value, prefix, suffix, duration]);

  return <span ref={nodeRef}>{prefix}0{suffix}</span>;
}
