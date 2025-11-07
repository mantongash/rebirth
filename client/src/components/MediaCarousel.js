import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  background: #fff;
`;

const Slide = styled(motion.div)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: stretch;
  justify-content: center;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 520px;
  object-fit: cover;
  user-select: none;
  pointer-events: none;
  @media (max-width: 768px) {
    height: 280px;
  }
`;

const Caption = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 1rem 1.25rem;
  background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%);
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.2px;
`;

const Controls = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  padding: 0 0.5rem;
  pointer-events: none;
`;

const ArrowButton = styled.button`
  pointer-events: auto;
  border: none;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(0,0,0,0.5);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
  &:hover { background: rgba(0,0,0,0.7); transform: scale(1.05); }
`;

const Dots = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const Dot = styled.button`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: ${({ active }) => (active ? '#667eea' : 'rgba(255,255,255,0.7)')};
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: all 0.2s ease;
`;

const variants = {
  enter: (direction) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction) => ({ x: direction < 0 ? 80 : -80, opacity: 0 })
};

export default function MediaCarousel({
  items,
  autoPlay = true,
  interval = 4500,
  pauseOnHover = true,
  showArrows = true,
  showDots = true
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef(null);
  const containerRef = useRef(null);

  const slides = useMemo(() => items || [], [items]);
  const count = slides.length;

  const goTo = (next) => {
    if (!count) return;
    const newDir = next > index ? 1 : -1;
    setDirection(newDir);
    setIndex((prev) => (next + count) % count);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (!autoPlay || count <= 1) return;
    timerRef.current = setInterval(next, interval);
    return () => clearInterval(timerRef.current);
  }, [index, autoPlay, interval, count]);

  const handleMouse = (on) => {
    if (!pauseOnHover) return;
    if (on) { if (timerRef.current) clearInterval(timerRef.current); }
    else { if (autoPlay && count > 1) timerRef.current = setInterval(next, interval); }
  };

  // Basic swipe support
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0; let isDown = false; let delta = 0;
    const onDown = (e) => { isDown = true; startX = e.touches ? e.touches[0].clientX : e.clientX; };
    const onMove = (e) => { if (!isDown) return; const x = e.touches ? e.touches[0].clientX : e.clientX; delta = x - startX; };
    const onUp = () => { if (!isDown) return; isDown = false; if (Math.abs(delta) > 50) { delta < 0 ? next() : prev(); } delta = 0; };
    el.addEventListener('mousedown', onDown); el.addEventListener('mousemove', onMove); el.addEventListener('mouseup', onUp); el.addEventListener('mouseleave', onUp);
    el.addEventListener('touchstart', onDown, { passive: true }); el.addEventListener('touchmove', onMove, { passive: true }); el.addEventListener('touchend', onUp);
    return () => {
      el.removeEventListener('mousedown', onDown); el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseup', onUp); el.removeEventListener('mouseleave', onUp);
      el.removeEventListener('touchstart', onDown); el.removeEventListener('touchmove', onMove); el.removeEventListener('touchend', onUp);
    };
  }, [index]);

  if (!count) return null;

  return (
    <CarouselContainer
      ref={containerRef}
      onMouseEnter={() => handleMouse(true)}
      onMouseLeave={() => handleMouse(false)}
    >
      <AnimatePresence custom={direction} mode="popLayout">
        <Slide
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SlideImage
            src={slides[index].src}
            alt={slides[index].alt || 'Slide image'}
            loading="lazy"
          />
          {slides[index].caption ? <Caption>{slides[index].caption}</Caption> : null}
        </Slide>
      </AnimatePresence>

      {showArrows && count > 1 && (
        <Controls>
          <ArrowButton aria-label="Previous" onClick={prev}><FaChevronLeft /></ArrowButton>
          <ArrowButton aria-label="Next" onClick={next}><FaChevronRight /></ArrowButton>
        </Controls>
      )}

      {showDots && count > 1 && (
        <Dots>
          {slides.map((_, i) => (
            <Dot key={i} active={i === index} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`} />
          ))}
        </Dots>
      )}
    </CarouselContainer>
  );
}


