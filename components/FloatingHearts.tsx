import React, { useEffect, useState } from 'react';

interface HeartStyle {
  id: number;
  left: string;
  animationDuration: string;
  opacity: number;
  size: string;
}

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<HeartStyle[]>([]);

  useEffect(() => {
    // Generate static hearts initially to fill screen
    const initialHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 5 + 5}s`,
      opacity: Math.random() * 0.3 + 0.1,
      size: `${Math.random() * 20 + 10}px`
    }));
    setHearts(initialHearts);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-[-50px] text-pink-300 animate-float"
          style={{
            left: heart.left,
            animationDuration: heart.animationDuration,
            opacity: heart.opacity,
            fontSize: heart.size,
          }}
        >
          ❤
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;