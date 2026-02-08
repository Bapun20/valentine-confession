import React, { useEffect, useState } from 'react';

interface Point {
  x: number;
  y: number;
  id: number;
  emoji: string;
}

const EMOJIS = ['❤️', '✨', '🌸', '💖', '💝'];

const CursorTrail: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      const newPoint: Point = {
        x: clientX,
        y: clientY,
        id: Date.now(),
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
      };

      setPoints((prev) => [...prev.slice(-15), newPoint]); // Keep last 15 points
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPoints((prev) => prev.filter((p) => Date.now() - p.id < 800)); // Remove points older than 800ms
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {points.map((point) => (
        <div
          key={point.id}
          className="absolute text-xl animate-fade-out"
          style={{
            left: point.x,
            top: point.y,
            transform: 'translate(-50%, -50%)',
            opacity: 1 - (Date.now() - point.id) / 800,
            transition: 'opacity 0.1s linear'
          }}
        >
          {point.emoji}
        </div>
      ))}
    </div>
  );
};

export default CursorTrail;