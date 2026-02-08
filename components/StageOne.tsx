import React, { useState, useRef } from 'react';

interface StageOneProps {
  onNext: () => void;
}

const StageOne: React.FC<StageOneProps> = ({ onNext }) => {
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveButton = (e?: React.TouchEvent | React.MouseEvent) => {
    if (e && 'preventDefault' in e) {
      e.preventDefault();
    }
    
    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const buttonWidth = 120;
      const buttonHeight = 60;
      const padding = 30;
      
      // Keep button within container bounds with padding
      const maxX = Math.max(0, container.width - buttonWidth - padding);
      const maxY = Math.max(0, container.height - buttonHeight - padding);
      
      const newX = Math.random() * maxX + padding / 2;
      const newY = Math.random() * maxY + padding / 2;
      setNoButtonPos({ x: Math.floor(newX), y: Math.floor(newY) });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center justify-center h-[70vh] text-center space-y-6 md:space-y-8 animate-fade-in w-full px-4"
    >
      <h1 className="text-4xl md:text-6xl font-romantic text-val-red animate-pulse-slow px-2">
        Do you love me? 💗
      </h1>

      <div className="relative w-full min-h-40 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6">
        <button
          onClick={onNext}
          className="bg-val-red text-white font-bold py-3 px-6 md:px-8 rounded-full shadow-lg transform transition-transform hover:scale-110 active:scale-95 text-lg md:text-xl z-20 whitespace-nowrap"
        >
          Yes ❤️
        </button>

        <button
          onMouseEnter={moveButton}
          onTouchStart={(e) => moveButton(e)}
          onTouchMove={(e) => moveButton(e)}
          style={
            noButtonPos
              ? { 
                  position: 'fixed',
                  left: `${noButtonPos.x}px`,
                  top: `${noButtonPos.y}px`,
                  transition: 'all 0.2s ease',
                  zIndex: 40
                }
              : { position: 'relative', zIndex: 10 }
          }
          className="bg-gray-300 text-gray-600 font-bold py-3 px-6 md:px-8 rounded-full shadow-md cursor-not-allowed z-10 text-lg md:text-xl whitespace-nowrap"
        >
          No 🙈
        </button>
      </div>
    </div>
  );
};

export default StageOne;