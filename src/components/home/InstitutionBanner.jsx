import React from 'react';

export default function InstitutionBanner() {
  return (
    <section className="w-full border-t border-b border-onyx-edge bg-obsidian-canvas py-8 px-6 flex flex-col items-center z-10">
      <p className="font-input text-[12px] text-graphite tracking-caption uppercase mb-6 text-center">
        Trusted by 400K+ researchers from leading institutions
      </p>
      
      {/* Dummy SVG Logos rendered purely to save RAM */}
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
        
        {/* Logo 1: Geometric Shield */}
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-smoke">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="M12 8v4"></path>
          <path d="M12 16h.01"></path>
        </svg>

        {/* Logo 2: Abstract Atom/University */}
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-smoke">
          <circle cx="12" cy="12" r="4"></circle>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"></ellipse>
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-45 12 12)"></ellipse>
        </svg>

        {/* Logo 3: Pillars */}
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-smoke">
          <path d="M4 22h16"></path>
          <path d="M4 2h16"></path>
          <path d="M6 2v20"></path>
          <path d="M10 2v20"></path>
          <path d="M14 2v20"></path>
          <path d="M18 2v20"></path>
        </svg>

        {/* Logo 4: Globe/Network */}
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-smoke">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M2 12h20"></path>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        </svg>
        
        {/* Logo 5: Book/Leaf */}
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-smoke">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>

      </div>
    </section>
  );
}
