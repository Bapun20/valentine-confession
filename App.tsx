import React, { useState } from 'react';
import { AppStage } from './types';
import StageOne from './components/StageOne';
import StageTwo from './components/StageTwo';
import StageThree from './components/StageThree';
import StageFour from './components/StageFour';
import FloatingHearts from './components/FloatingHearts';
import MusicButton from './components/MusicButton';
import CursorTrail from './components/CursorTrail';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.DO_YOU_LOVE_ME);

  const nextStage = () => {
    // Adding a small delay for exit animations could go here, 
    // but for simplicity we switch directly and let components handle entry animations.
    if (stage < AppStage.CELEBRATION) {
      setStage(stage + 1);
    }
  };

  const renderStage = () => {
    switch (stage) {
      case AppStage.DO_YOU_LOVE_ME:
        return <StageOne onNext={nextStage} />;
      case AppStage.BE_MY_VALENTINE:
        return <StageTwo onNext={nextStage} />;
      case AppStage.REVEAL:
        return <StageThree onNext={nextStage} />;
      case AppStage.FOREVER:
        return <StageFour onComplete={() => setStage(AppStage.CELEBRATION)} />;
      case AppStage.CELEBRATION:
        return <StageFour onComplete={() => {}} initialCompleted={true} />;
      default:
        return <StageOne onNext={nextStage} />;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden text-slate-800 font-body">
      {/* Dynamic Background */}
      <div className="gradient-bg" />
      
      {/* Interactive Elements */}
      <FloatingHearts />
      <CursorTrail />
      <MusicButton />
      
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
        <div className="w-full max-w-md transition-all duration-500 ease-in-out">
          {renderStage()}
        </div>
      </div>
    </div>
  );
};

export default App;