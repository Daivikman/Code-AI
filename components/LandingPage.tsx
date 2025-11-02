import React from 'react';
import { Page } from '../types';
import { VoiceIcon, ModelIcon, SubscriptionIcon, AboutIcon } from './IconComponents';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const navItems = [
    { page: Page.VoiceAssistant, icon: <VoiceIcon className="h-10 w-10 mb-4" /> },
    { page: Page.Model, icon: <ModelIcon className="h-10 w-10 mb-4" /> },
    { page: Page.Subscription, icon: <SubscriptionIcon className="h-10 w-10 mb-4" /> },
    { page: Page.About, icon: <AboutIcon className="h-10 w-10 mb-4" /> },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center overflow-hidden">
      <div style={{ perspective: '1000px' }}>
        <h1 
          className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-bold text-white mb-4 tracking-widest"
          style={{ textShadow: '0 0 10px #06b6d4, 0 0 20px #06b6d4, 0 0 30px #06b6d4, 0 0 40px #0891b2' }}
        >
          CODE AI
        </h1>
        <p className="text-lg md:text-xl text-cyan-300 max-w-2xl mx-auto mb-12">
          Your Futuristic Partner in Software Development. Integrated, Intelligent, and Instant.
        </p>
      </div>

      <div 
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full max-w-4xl"
        style={{ perspective: '1200px' }}
      >
        {navItems.map((item, index) => (
          <div
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className="group cursor-pointer p-6 bg-gray-800/40 border border-cyan-500/20 rounded-lg backdrop-blur-sm transition-all duration-300 ease-out hover:bg-cyan-500/20 hover:border-cyan-400"
            style={{ transformStyle: 'preserve-3d' }}
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const { left, top, width, height } = card.getBoundingClientRect();
              const x = (e.clientX - left - width / 2) / 8;
              const y = (e.clientY - top - height / 2) / -8;
              card.style.transform = `scale(1.1) rotateY(${x}deg) rotateX(${y}deg) translateZ(60px)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) rotateY(0deg) rotateX(0deg) translateZ(0px)';
            }}
          >
            <div className="flex flex-col items-center justify-center text-cyan-400 group-hover:text-white transition-colors duration-300">
              {item.icon}
              <span className="font-orbitron text-lg">{item.page}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;