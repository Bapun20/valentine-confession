import React, { useState } from 'react';
import HeartRain from './HeartRain';

interface StageFourProps {
  onComplete: () => void;
  initialCompleted?: boolean;
}

const StageFour: React.FC<StageFourProps> = ({ onComplete, initialCompleted = false }) => {
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [showModal, setShowModal] = useState(false);

  const handleYes = () => {
    setIsCompleted(true);
    onComplete();
  };

  const handleThink = () => {
    setShowModal(true);
  };

  if (isCompleted) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full animate-fade-in">
        <HeartRain />
        <h1 className="text-6xl md:text-7xl font-romantic text-val-red mb-8 animate-wiggle">
          Happy Valentine's Day! 💖
        </h1>
        <p className="text-xl text-gray-600 max-w-xs mx-auto leading-relaxed">
          You've made me the happiest person in the world.
        </p>
        <div className="mt-12 text-4xl animate-bounce">
          💍👰🤵🏡🐕
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center text-center space-y-10 animate-slide-up relative">
      <h1 className="text-4xl md:text-5xl font-romantic text-val-dark leading-tight">
        So... will you be mine forever? 💍
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={handleYes}
          className="w-full bg-val-red text-white font-bold py-4 rounded-xl shadow-lg hover:bg-red-500 hover:shadow-2xl transform transition-all hover:-translate-y-1 text-2xl"
        >
          Yes, forever ❤️
        </button>

        <button
          onClick={handleThink}
          className="w-full bg-white text-gray-500 font-medium py-3 rounded-xl shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors"
        >
          Let me think 🤔
        </button>
      </div>

      {/* Modal Overlay */}
      {showModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-white/60 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="bg-white p-6 rounded-2xl shadow-2xl relative z-10 animate-bounce-in max-w-sm">
            <h3 className="text-xl font-bold text-val-dark mb-2">Take your time...</h3>
            <p className="text-gray-600">I'll still be here 💕</p>
            <button 
              onClick={() => setShowModal(false)}
              className="mt-4 text-sm text-gray-400 hover:text-gray-600 underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StageFour;