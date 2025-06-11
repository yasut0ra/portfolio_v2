import React, { useRef, useState } from 'react';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  magneticStrength?: number;
}

const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  target,
  rel,
  magneticStrength = 0.3
}) => {
  const buttonRef = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const moveX = x * magneticStrength;
    const moveY = y * magneticStrength;

    buttonRef.current.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'translate(0px, 0px) scale(1)';
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const commonProps = {
    ref: buttonRef,
    className: `relative transition-all duration-300 ease-out cursor-pointer ${className}`,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick,
  };

  if (href) {
    return (
      <a
        {...commonProps}
        href={href}
        target={target}
        rel={rel}
      >
        <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-inherit transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
        <div className="relative z-10">
          {children}
        </div>
      </a>
    );
  }

  return (
    <button {...commonProps}>
      <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-inherit transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
      <div className="relative z-10">
        {children}
      </div>
    </button>
  );
};

export default MagneticButton;