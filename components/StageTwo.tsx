import React, { useState } from 'react';

interface StageTwoProps {
  onNext: () => void;
}

const phrases = [
  "No",
  "Are you sure?",
  "Really sure?",
  "Think again!",
  "Last chance!",
  "Surely not?",
  "You might regret this!",
  "Give it another thought!",
  "Are you absolutely certain?",
  "This could be a mistake!",
  "Have a heart!",
  "Don't be so cold!",
  "Change of heart?",
  "Wouldn't you reconsider?",
  "Is that your final answer?",
  "You're breaking my heart ;(",
  "Pls...",
  "Pls say yes",
  "I'm sad now :(",
  "Ok fine I'll ask again..."
];

const StageTwo: React.FC<StageTwoProps> = ({ onNext }) => {
  const [noCount, setNoCount] = useState(0);
  const [yesScale, setYesScale] = useState(1);
  const [noButtonOffset, setNoButtonOffset] = useState({ x: 0, y: 0, rotate: 0 });

  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  const handleNoClick = () => {
    setNoCount(noCount + 1);
    setYesScale(yesScale * 1.5);
    evade();
  };

  const evade = () => {
    // Evasive movement
    const x = Math.random() * 50 - 25;
    const y = Math.random() * 50 - 25;
    const rot = Math.random() * 20 - 10;
    setNoButtonOffset({ x, y, rotate: rot });
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 text-center animate-slide-up w-full h-full">
      <h1 className="text-4xl md:text-5xl font-romantic text-val-dark drop-shadow-sm p-4">
        Will you be my Valentine? 🌹
      </h1>

      <div className="flex flex-col items-center gap-6 w-full relative">
        {/* Dynamic Yes Button */}
        <button
          onClick={onNext}
          style={{ 
            transform: `scale(${yesScale})`,
            zIndex: 20
          }}
          className="bg-gradient-to-r from-val-red to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-all duration-200 ease-in-out hover:brightness-110 hover:shadow-[0_0_30px_rgba(255,105,97,0.8)] min-w-[150px] animate-pulse ring-4 ring-pink-200/50"
        >
          Yes, always 💞
        </button>

        {/* Dynamic No Button */}
        <button
          onClick={handleNoClick}
          onMouseEnter={evade}
          onTouchStart={evade}
          style={{
            transform: `translate(${noButtonOffset.x}px, ${noButtonOffset.y}px) rotate(${noButtonOffset.rotate}deg)`,
            transition: 'transform 0.2s ease'
          }}
          className="bg-white border-2 border-gray-300 text-gray-500 font-semibold py-2 px-6 rounded-full shadow-sm 
                     hover:bg-red-50 hover:text-red-500 hover:border-red-200 hover:shadow-md
                     active:bg-red-100 active:scale-95
                     transition-colors duration-200 min-w-[100px] z-10"
        >
          {getNoButtonText()}
        </button>
      </div>
    </div>
  );
};

export default StageTwo;