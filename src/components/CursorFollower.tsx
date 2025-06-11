import React, { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

const CursorFollower: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Main cursor follower */}
      <div
        className={`fixed pointer-events-none z-50 transition-all duration-300 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        } ${isClicking ? 'scale-75' : 'scale-100'}`}
        style={{
          left: cursorPosition.x - 20,
          top: cursorPosition.y - 20,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-10 h-10 border-2 border-blue-500/50 dark:border-blue-400/50 rounded-full animate-pulse"></div>
      </div>

      {/* Secondary cursor trail */}
      <div
        className={`fixed pointer-events-none z-40 transition-all duration-500 ease-out ${
          isVisible ? 'opacity-30' : 'opacity-0'
        }`}
        style={{
          left: cursorPosition.x - 30,
          top: cursorPosition.y - 30,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-15 h-15 border border-purple-500/30 dark:border-purple-400/30 rounded-full"></div>
      </div>
    </>
  );
};

export default CursorFollower;