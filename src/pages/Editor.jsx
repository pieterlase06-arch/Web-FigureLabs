import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function Editor() {
  const [bgGreen, setBgGreen] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col bg-obsidian-canvas text-frost-text overflow-hidden">
      {/* Mini Header for Editor */}
      <header className="h-[60px] border-b border-onyx-edge flex items-center justify-between px-6 shrink-0 bg-obsidian-canvas">
        <div className="flex items-center gap-4">
          <a href="#" className="font-aeonik font-normal text-[18px] text-frost-text hover:text-amber-whisper transition-colors">FigureLabs</a>
          <div className="w-px h-4 bg-silver"></div>
          <span className="font-input text-[13px] tracking-caption text-smoke">WORKSPACE</span>
        </div>
        <div>
           <Badge variant="default">ENGINE READY</Badge>
        </div>
      </header>

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Toolbar */}
        <aside className="w-[60px] border-r border-onyx-edge flex flex-col items-center py-4 gap-4 shrink-0 bg-surface">
          {/* Compass Icon - Mandatory */}
          <button className="w-10 h-10 rounded-md hover:bg-elevated flex items-center justify-center text-frost-text transition-colors group relative" title="Spatial Compass (Cartographic Rule)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
            </svg>
          </button>
          {/* Select / Region Redraw */}
          <button className="w-10 h-10 rounded-md hover:bg-elevated flex items-center justify-center text-frost-text transition-colors" title="Region Redraw">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3h18v18H3zM3 9h18M9 21V9"></path>
            </svg>
          </button>
          {/* Eraser / Masking */}
          <button className="w-10 h-10 rounded-md hover:bg-elevated flex items-center justify-center text-frost-text transition-colors" title="Eraser Mask">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 20H7L3 16C2.5 15.5 2.5 14.5 3 14L13 4C13.5 3.5 14.5 3.5 15 4L20 9C20.5 9.5 20.5 10.5 20 11L11 20H20Z"></path>
            </svg>
          </button>
          {/* Background Toggle (Green Screen) */}
          <button 
            onClick={() => setBgGreen(!bgGreen)}
            className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors mt-auto ${bgGreen ? 'bg-[#00FF00] text-black' : 'hover:bg-elevated text-frost-text'}`} 
            title="Toggle Chroma Green Background"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </button>
        </aside>

        {/* Middle Canvas */}
        <main className="flex-1 flex items-center justify-center p-8 bg-void overflow-auto">
          <div className={`w-full max-w-[800px] aspect-[4/3] ${bgGreen ? 'bg-[#00FF00]' : 'bg-obsidian-canvas'} border border-onyx-edge flex items-center justify-center relative transition-colors duration-200 shadow-none`}>
            {/* Canvas Placeholder */}
            <span className={`font-input tracking-caption text-[13px] ${bgGreen ? 'text-black' : 'text-smoke'}`}>
              HTML5 CANVAS RENDER AREA
            </span>
            <div className="absolute bottom-4 right-4 flex items-center gap-2">
               <span className={`font-input tracking-caption text-[10px] ${bgGreen ? 'text-black opacity-60' : 'text-graphite'}`}>
                 1920 x 1440 · 300 DPI
               </span>
            </div>
          </div>
        </main>

        {/* Right Prompt Panel */}
        <aside className="w-[320px] border-l border-onyx-edge bg-surface flex flex-col shrink-0">
          <div className="p-5 border-b border-onyx-edge">
            <h3 className="font-aeonik font-bold uppercase text-[14px] tracking-body text-frost-text mb-1">Figure Generation</h3>
            <p className="font-aeonik text-[13px] text-smoke leading-[1.4]">Scientific Text-to-Figure AI.</p>
          </div>
          
          <div className="flex-1 p-5 flex flex-col gap-5 overflow-y-auto">
            <div className="flex flex-col gap-2">
              <label className="font-input text-[13px] tracking-caption text-smoke">PROMPT</label>
              <textarea 
                className="w-full h-32 bg-obsidian-canvas border border-onyx-edge rounded-md p-3 text-frost-text font-aeonik text-[14px] resize-none focus:outline-none focus:border-silver transition-colors"
                placeholder="Describe the scientific figure... (e.g., A bar chart showing NDVI values across three seasons with error bars)"
              ></textarea>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="font-input text-[13px] tracking-caption text-smoke">VALIDATION FILTER</label>
              <div className="p-3 bg-obsidian-canvas border border-onyx-edge rounded-md flex items-start gap-3">
                <div className="mt-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <p className="font-aeonik text-[13px] text-smoke leading-[1.4]">
                  Cartographic and scale constraints are <strong>ACTIVE</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-onyx-edge flex flex-col gap-3">
            <Button variant="primary" className="w-full py-3 justify-center">Generate Figure</Button>
            <Button variant="outlined" className="w-full py-3 justify-center">Export to SVG</Button>
          </div>
        </aside>

      </div>
    </div>
  );
}
