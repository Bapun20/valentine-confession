import React, { useState, useRef, useEffect } from 'react';
import { Music, VolumeX } from 'lucide-react';

const MusicButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Set initial volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Audio playback failed:", error);
          // Sometimes browsers block audio if not triggered by direct user interaction.
          // In this case, the click is the interaction, so it should work.
        });
    }
  };

  return (
    <div className="absolute top-4 right-4 z-50">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} loop>
       <source src="/songs/song.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      <button
        onClick={toggleMusic}
        className={`p-3 rounded-full shadow-lg transition-all duration-300 ${
          isPlaying 
            ? 'bg-white/80 text-val-red ring-2 ring-val-red/30' 
            : 'bg-white/40 text-gray-500 hover:bg-white/60'
        } backdrop-blur-md`}
        aria-label={isPlaying ? "Mute Music" : "Play Music"}
      >
        {isPlaying ? (
          <Music className="w-6 h-6 animate-pulse-slow" />
        ) : (
          <VolumeX className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};

export default MusicButton;