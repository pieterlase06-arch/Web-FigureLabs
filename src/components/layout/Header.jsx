import React from 'react';
import Button from '../ui/Button';

export default function Header() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '';
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="w-full flex justify-center py-6 z-50">
      <div className="w-full max-w-[1200px] flex items-center justify-between px-6">
        <div className="flex items-center">
          <div className="font-aeonik font-normal text-[21px] text-frost-text mr-5">
            FigureLabs
          </div>
          <div className="w-px h-5 bg-silver mx-5"></div>
          <nav className="flex gap-5">
            <button onClick={(e) => scrollTo(e, 'services')} className="font-aeonik font-bold text-[13px] uppercase text-frost-text hover:text-amber-whisper transition-colors">Services</button>
            <button onClick={(e) => scrollTo(e, 'gallery')} className="font-aeonik font-bold text-[13px] uppercase text-frost-text hover:text-amber-whisper transition-colors">Gallery</button>
            <button onClick={(e) => scrollTo(e, 'process')} className="font-aeonik font-bold text-[13px] uppercase text-frost-text hover:text-amber-whisper transition-colors">Process</button>
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
