import React, { useState, useRef } from 'react';

interface StageOneProps {
  onNext: () => void;
}

const StageOne: React.FC<StageOneProps> = ({ onNext }) => {
  const [noButtonPos, setNoButtonPos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveButton = () => {
    if (containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const newX = Math.random() * (container.width - 100); // 100 is approx button width
      const newY = Math.random() * (container.height - 50); // 50 is approx button height
      setNoButtonPos({ x: newX, y: newY });
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative flex flex-col items-center justify-center h-[60vh] text-center space-y-8 animate-fade-in"
    >
      <h1 className="text-5xl md:text-6xl font-romantic text-val-red animate-pulse-slow">
        Do you love me? 💗
      </h1>

      <div className="relative w-full h-40 flex justify-center items-center">
        <button
          onClick={onNext}
          className="bg-val-red text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition-transform hover:scale-110 active:scale-95 text-xl z-20 mx-4"
        >
          Yes ❤️
        </button>

        <button
          onMouseEnter={moveButton}
          onTouchStart={moveButton} // Mobile support for "trying" to tap
          style={
            noButtonPos
              ? { position: 'absolute', left: noButtonPos.x, top: noButtonPos.y, transition: 'all 0.3s ease' }
              : { position: 'static', margin: '0 1rem' }
          }
          className="bg-gray-300 text-gray-600 font-bold py-3 px-8 rounded-full shadow-md cursor-not-allowed z-10 text-xl"
        >
          No 🙈
        </button>
      </div>
    </div>
  );
};

export default StageOne;