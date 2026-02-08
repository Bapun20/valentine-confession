import React, { useEffect, useState } from 'react';

interface RainDrop {
  id: number;
  left: string;
  animationDuration: string;
  delay: string;
}

const HeartRain: React.FC = () => {
  const [drops, setDrops] = useState<RainDrop[]>([]);

  useEffect(() => {
    // Create heavy rain of hearts
    const rainDrops = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 2 + 3}s`,
      delay: `${Math.random() * 2}s`
    }));
    setDrops(rainDrops);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="heart-rain"
          style={{
            left: drop.left,
            animationDuration: drop.animationDuration,
            animationDelay: drop.delay,
          }}
        >
          {['❤️', '💖', '💕', '💗'][Math.floor(Math.random() * 4)]}
        </div>
      ))}
    </div>
  );
};

export default HeartRain;