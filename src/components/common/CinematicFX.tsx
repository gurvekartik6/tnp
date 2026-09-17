import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CinematicFX() {
  const [progress, setProgress] = useState(0);
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const sx = useSpring(mx, { stiffness: 90, damping: 22, mass: 0.35 });
  const sy = useSpring(my, { stiffness: 90, damping: 22, mass: 0.35 });

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    const pointer = (event: PointerEvent) => {
      mx.set(event.clientX);
      my.set(event.clientY);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('pointermove', pointer, { passive: true });
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('pointermove', pointer);
    };
  }, [mx, my]);

  return (
    <>
      <div className="cinematic-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <motion.div className="cinematic-cursor-glow" style={{ x: sx, y: sy }} aria-hidden="true" />
      <div className="cinematic-grain" aria-hidden="true" />
      <div className="cinematic-vignette" aria-hidden="true" />
    </>
  );
}
