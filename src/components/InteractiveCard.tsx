import React, { useRef, useState } from 'react';

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

const InteractiveCard: React.FC<InteractiveCardProps> = ({ 
  children, 
  className = '', 
  intensity = 1 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10 * intensity;
    const rotateY = ((x - centerX) / centerX) * 10 * intensity;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }
  };

  return (
    <div
      ref={cardRef}
      className={`relative transition-all duration-300 ease-out ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Spotlight effect */}
      {isHovered && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none rounded-inherit"
          style={{
            background: `radial-gradient(circle 200px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.3), transparent)`,
          }}
        />
      )}
      
      {/* Glow effect */}
      <div
        className={`absolute inset-0 rounded-inherit transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
          filter: 'blur(20px)',
          transform: 'translateZ(-10px)',
        }}
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default InteractiveCard;