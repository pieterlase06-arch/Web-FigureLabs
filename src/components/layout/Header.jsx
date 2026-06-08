import React from 'react';
import Button from '../ui/Button';

export default function Header() {
  return (
    <header className="w-full flex justify-center py-6">
      <div className="w-full max-w-[1200px] flex items-center justify-between px-6">
        <div className="flex items-center">
          <div className="font-aeonik font-normal text-[21px] text-frost-text mr-5">
            FigureLabs
          </div>
          <div className="w-px h-5 bg-silver mx-5"></div>
          <nav className="flex gap-5">
            <a href="#services" className="font-aeonik font-bold text-[13px] uppercase text-frost-text hover:text-amber-whisper transition-colors">Services</a>
            <a href="#portfolio" className="font-aeonik font-bold text-[13px] uppercase text-frost-text hover:text-amber-whisper transition-colors">Portfolio</a>
            <a href="#process" className="font-aeonik font-bold text-[13px] uppercase text-frost-text hover:text-amber-whisper transition-colors">Process</a>
          </nav>
        </div>
        
        <div>
          <Button variant="chat" icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          }>
            Let's Chat
          </Button>
        </div>
      </div>
    </header>
  );
}
