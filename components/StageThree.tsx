import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Star } from 'lucide-react';

interface StageThreeProps {
  onNext: () => void;
}

// Sub-component for typing text effect
const TypewriterLine = ({ 
  text, 
  startDelay, 
  onComplete, 
  isActive 
}: { 
  text: string; 
  startDelay: number; 
  onComplete?: () => void; 
  isActive: boolean;
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [isActive, startDelay]);

  useEffect(() => {
    if (!hasStarted) return;

    if (displayedText.length < text.length) {
      const typeTimeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 50); // Typing speed
      return () => clearTimeout(typeTimeout);
    } else {
      if (onComplete) onComplete();
    }
  }, [hasStarted, displayedText, text, onComplete]);

  return (
    <span className={`${displayedText.length > 0 ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
      {displayedText}
    </span>
  );
};

const StageThree: React.FC<StageThreeProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showParticles, setShowParticles] = useState(false);
  
  // Text sequencing state
  const [line1Done, setLine1Done] = useState(false);
  const [line2Done, setLine2Done] = useState(false);
  const [line3Done, setLine3Done] = useState(false);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOpen) return;
    
    // Trigger effects
    setShowParticles(true);
    setIsOpen(true);
    
    // Stop particles after animation
    setTimeout(() => setShowParticles(false), 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full relative z-20 [perspective:1000px]">
      
      {/* 1. Cinematic Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-[2px] z-0 transition-opacity duration-1000 pointer-events-none
          ${isOpen ? 'opacity-100' : 'opacity-0'}
        `}
      />

      {/* 2. Floating Title (Fades out when open) */}
      <div 
        className={`absolute top-[10%] transition-all duration-700 transform z-10 ${isOpen ? 'opacity-0 -translate-y-10 blur-sm' : 'opacity-100 translate-y-0'}`}
      >
        <p className="text-3xl font-romantic text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] animate-float">
          A message for you... 💌
        </p>
      </div>

      {/* 3. Main Envelope Interaction */}
      <div 
        onClick={handleOpen}
        className={`relative w-[340px] h-[240px] transition-all duration-[1.5s] ease-in-out cursor-pointer z-10 
          ${isOpen ? 'translate-y-40 scale-105' : 'hover:scale-105 hover:rotate-1'}
        `}
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {/* --- Particles Burst (Only shows on click) --- */}
        {showParticles && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-50">
             {[...Array(12)].map((_, i) => (
               <Heart 
                  key={i} 
                  className={`absolute text-pink-300 w-6 h-6 animate-ping`}
                  style={{
                    left: '50%',
                    top: '0%',
                    animationDuration: `${0.5 + Math.random() * 0.5}s`,
                    transform: `rotate(${Math.random() * 360}deg) translate(${30 + Math.random() * 50}px, ${-30 - Math.random() * 50}px)`
                  }} 
                  fill="currentColor"
               />
             ))}
             <Sparkles className="absolute -top-10 left-1/2 text-yellow-300 w-12 h-12 animate-spin-slow" />
          </div>
        )}

        {/* --- Envelope Body (Back) --- */}
        <div className="absolute inset-0 bg-rose-900 rounded-b-xl shadow-2xl border-2 border-rose-950/20"></div>

        {/* --- The Love Letter --- */}
        <div 
          className={`absolute left-2 right-2 bg-[#fffcf5] shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-all duration-[1500ms] ease-in-out flex flex-col items-center p-6
            ${isOpen ? '-translate-y-[320px] h-[400px] z-40 rotate-0' : 'top-2 bottom-2 h-[90%] z-10 rotate-1'}
            rounded-sm border border-stone-100
          `}
          style={{ 
            transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            backgroundImage: 'repeating-linear-gradient(#fffcf5, #fffcf5 28px, #e7e5e4 29px)' // Lined paper
          }}
        >
          {/* Letter Content */}
          <div className="w-full h-full flex flex-col items-center pt-2 relative z-10">
             <Heart className="w-6 h-6 text-rose-400 fill-current mb-4 opacity-80" />
             
             <div className="w-full text-left font-romantic text-3xl text-rose-950 leading-relaxed space-y-6 px-2">
                
                {/* Line 1: Salutation */}
                <div className="min-h-[40px]">
                   <TypewriterLine 
                     text="My Dearest..." 
                     startDelay={1200} 
                     isActive={isOpen} 
                     onComplete={() => setLine1Done(true)} 
                   />
                </div>

                {/* Body Paragraphs */}
                <div className="text-xl md:text-2xl font-body font-medium text-stone-700 space-y-4">
                  <p className="min-h-[32px]">
                    {line1Done && (
                      <TypewriterLine 
                        text="I knew you'd say Yes." 
                        startDelay={500} 
                        isActive={line1Done}
                        onComplete={() => setLine2Done(true)}
                      />
                    )}
                  </p>
                  
                  <p className="min-h-[32px]">
                    {line2Done && (
                      <TypewriterLine 
                        text="Because some hearts just know..." 
                        startDelay={500} 
                        isActive={line2Done}
                        onComplete={() => setLine3Done(true)}
                      />
                    )}
                  </p>

                  <p className="min-h-[32px] text-rose-600 font-bold mt-4">
                    {line3Done && (
                      <TypewriterLine 
                        text="They belong together." 
                        startDelay={800} 
                        isActive={line3Done}
                      />
                    )}
                  </p>
                </div>
             </div>

             {/* Footer / Button */}
             <div className={`mt-auto w-full transition-all duration-1000 delay-1000 ${line3Done ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
               <div className="w-full h-px bg-rose-200 mb-4"></div>
               <button
                 onClick={(e) => {
                   e.stopPropagation();
                   onNext();
                 }}
                 className="w-full py-3 px-6 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 group"
               >
                 <span>One last question</span>
                 <Heart className="w-4 h-4 fill-white group-hover:scale-125 transition-transform" />
               </button>
             </div>
          </div>
        </div>

        {/* --- Front Pocket (SVG) --- */}
        <div className="absolute inset-0 z-20 pointer-events-none drop-shadow-2xl">
           <svg viewBox="0 0 340 240" className="w-full h-full overflow-visible" preserveAspectRatio="none">
             <defs>
               <linearGradient id="pocketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                 <stop offset="0%" stopColor="#e11d48" /> {/* rose-600 */}
                 <stop offset="100%" stopColor="#be123c" /> {/* rose-700 */}
               </linearGradient>
             </defs>
             <path 
               d="M0,0 L170,120 L340,0 L340,240 L0,240 Z" 
               fill="url(#pocketGrad)" 
               stroke="#9f1239" 
               strokeWidth="0.5"
             />
           </svg>
        </div>

        {/* --- Top Flap (Hinged) --- */}
        <div 
          className={`absolute top-0 left-0 w-full z-30 transition-transform duration-[1200ms] ease-in-out origin-top
            ${isOpen ? '[transform:rotateX(180deg)]' : 'z-30 animate-pulse-slow'}
          `}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of Flap (Closed) */}
          <div className="absolute inset-0 w-full h-[120px]" style={{ backfaceVisibility: 'hidden' }}>
             <svg viewBox="0 0 340 120" className="w-full h-full overflow-visible drop-shadow-md" preserveAspectRatio="none">
               <path d="M0,0 L170,120 L340,0 Z" fill="#fb7185" stroke="#e11d48" strokeWidth="0.5" />
             </svg>

             {/* Interactive Wax Seal */}
             <div 
                className={`absolute top-[80px] left-1/2 -translate-x-1/2 group cursor-pointer transition-all duration-500
                  ${isOpen ? 'scale-150 opacity-0' : 'scale-100 opacity-100 hover:scale-110'}
                `}
             >
                <div className="w-14 h-14 bg-red-800 rounded-full flex items-center justify-center shadow-lg border-[3px] border-red-900/40 relative overflow-hidden">
                   {/* Shine effect */}
                   <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/10 rotate-45 transform origin-bottom-right"></div>
                   <Heart className="w-6 h-6 text-red-200 fill-current opacity-90 drop-shadow-sm" />
                </div>
                {/* Glow ring */}
                <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping"></div>
             </div>
          </div>

          {/* Back of Flap (Open) */}
          <div 
            className="absolute inset-0 w-full h-[120px]" 
            style={{ 
              transform: 'rotateX(180deg)', 
              backfaceVisibility: 'hidden' 
            }}
          >
             <svg viewBox="0 0 340 120" className="w-full h-full overflow-visible" preserveAspectRatio="none">
               <path d="M0,0 L170,120 L340,0 Z" fill="#9f1239" opacity="0.6" />
             </svg>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StageThree;