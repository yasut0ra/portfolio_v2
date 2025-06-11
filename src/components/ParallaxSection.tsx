import React, { useEffect, useRef, useState } from 'react';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  offset?: number;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className = '',
  speed = 0.5,
  offset = 0
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallaxOffset = (scrollY - offset) * speed;

  return (
    <div
      ref={sectionRef}
      className={`relative ${className}`}
      style={{
        transform: `translateY(${parallaxOffset}px)`,
      }}
    >
      {children}
    </div>
  );
};

export default ParallaxSection;