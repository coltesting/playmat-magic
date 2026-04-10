'use client';

import React, { useState, useEffect } from 'react';

const WEAVING_MESSAGES = [
  'Gathering satellite colors...',
  'Sketching tiny houses...',
  'Planting cartoon trees...',
  'Painting the roads...',
  'Adding magical details...',
  'Sprinkling tiny flowers...',
  'Drawing adorable animals...',
  'Weaving the carpet texture...',
  'Adding the finishing touches...',
  'Almost done, just a few more threads...',
];

interface LoadingOverlayProps {
  isVisible: boolean;
}

export default function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (!isVisible) {
      setMessageIndex(0);
      setDots('');
      return;
    }

    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % WEAVING_MESSAGES.length);
    }, 4000);

    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    return () => {
      clearInterval(msgInterval);
      clearInterval(dotInterval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-sky-200/95 via-sky-100/95 to-white/95 backdrop-blur-sm">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating clouds */}
        <div className="absolute top-[10%] left-[5%] text-6xl animate-float opacity-40">☁️</div>
        <div className="absolute top-[5%] left-[30%] text-4xl animate-float-slow opacity-30">☁️</div>
        <div className="absolute top-[15%] right-[10%] text-5xl animate-float-slower opacity-35">☁️</div>
        <div className="absolute top-[8%] right-[35%] text-3xl animate-float opacity-25">☁️</div>

        {/* Stars and sparkles */}
        <div className="absolute top-[20%] left-[20%] text-2xl animate-sparkle">⭐</div>
        <div className="absolute top-[30%] right-[25%] text-xl animate-sparkle" style={{ animationDelay: '0.5s' }}>✨</div>
        <div className="absolute top-[25%] left-[60%] text-lg animate-sparkle" style={{ animationDelay: '1s' }}>⭐</div>
        <div className="absolute bottom-[30%] left-[15%] text-xl animate-sparkle" style={{ animationDelay: '0.3s' }}>✨</div>
        <div className="absolute bottom-[25%] right-[15%] text-2xl animate-sparkle" style={{ animationDelay: '0.8s' }}>⭐</div>

        {/* Sun */}
        <div className="absolute top-[5%] right-[5%] text-6xl animate-wiggle opacity-60">🌞</div>

        {/* Decorative items floating */}
        <div className="absolute bottom-[15%] left-[10%] text-3xl animate-float" style={{ animationDelay: '1s' }}>🏡</div>
        <div className="absolute bottom-[20%] right-[20%] text-3xl animate-float-slow" style={{ animationDelay: '2s' }}>🌳</div>
        <div className="absolute bottom-[10%] left-[50%] text-3xl animate-float-slower" style={{ animationDelay: '0.5s' }}>🚗</div>
      </div>

      {/* Main content */}
      <div className="relative text-center px-8">
        {/* Spinning rug icon */}
        <div className="relative mx-auto w-32 h-32 mb-8">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-candy-pink via-candy-purple to-sky-400 animate-spin" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-2 rounded-xl bg-white flex items-center justify-center">
            <span className="text-5xl animate-bounce-slow">🧶</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="font-display text-3xl font-bold text-playmat-text mb-2">
          Weaving Magic
        </h2>

        {/* Animated message */}
        <p className="font-body text-lg text-playmat-text/80 mb-8 min-h-[28px] transition-all">
          {WEAVING_MESSAGES[messageIndex]}{dots}
        </p>

        {/* Progress bar */}
        <div className="w-80 max-w-full mx-auto">
          <div className="h-3 bg-gray-200/50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-candy-pink via-candy-purple to-sky-400 rounded-full animate-progress" />
          </div>
          <p className="mt-3 text-xs font-body text-playmat-muted">
            This usually takes 30-60 seconds
          </p>
        </div>
      </div>
    </div>
  );
}
