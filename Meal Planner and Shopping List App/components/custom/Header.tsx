import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

// Pants Icon Component using a placeholder
const PantsIcon = () => (
  <ImageWithFallback
    src="https://via.placeholder.com/64"
    alt="Pants Icon"
    className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
  />
);

const Header = () => {
  return (
    <header
      className="relative overflow-hidden text-white p-6 sm:p-8 shadow-2xl"
      className="relative overflow-hidden text-white p-6 sm:p-8 shadow-2xl bg-gradient-to-tr from-sky-500 via-emerald-500 to-amber-500"
      style={{
        backgroundSize: '200% 200%',
        animation: 'subtleGradient 15s ease-in-out infinite'
      }}
    >
      {/* Content */}
      <div className="relative z-10 text-center space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <div className="text-white bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-xl shadow-lg border border-white/10">
            <PantsIcon />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center drop-shadow-lg">Pants' Pantry Planning</h1>
        </div>
        <p className="text-white/90 text-base sm:text-lg drop-shadow-sm">Simple, healthy, and organized.</p>
      </div>
    </header>
  );
};

export default Header;
