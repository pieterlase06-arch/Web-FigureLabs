import React from 'react';

export default function Gallery() {
  return (
    <section className="w-full max-w-[1200px] px-6 mt-20 mb-20 flex flex-col items-center z-10" id="gallery">
      <h2 className="font-aeonik font-normal text-[34px] tracking-heading text-frost-text mb-4 text-center">
        Made with FigureLabs
      </h2>
      <p className="font-aeonik text-[16px] text-smoke text-center max-w-[600px] mb-12 leading-[1.4]">
        Explore publication-ready figures created by researchers worldwide.
      </p>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Gallery Item 1: Molecular */}
        <div className="flex flex-col bg-obsidian-canvas border border-onyx-edge p-4 hover:border-silver transition-colors cursor-pointer group">
          <div className="w-full aspect-[4/3] bg-void border border-onyx-edge mb-4 flex items-center justify-center relative overflow-hidden">
            {/* CSS Molecular Mock */}
            <div className="absolute w-2 h-2 rounded-full bg-frost-text"></div>
            <div className="absolute w-16 h-px bg-smoke transform rotate-45"></div>
            <div className="absolute w-2 h-2 rounded-full bg-smoke transform translate-x-6 translate-y-6"></div>
            <div className="absolute w-16 h-px bg-smoke transform -rotate-45"></div>
            <div className="absolute w-2 h-2 rounded-full bg-smoke transform translate-x-6 -translate-y-6"></div>
            <div className="absolute bottom-2 right-2 text-[9px] font-input text-graphite">SVG • 12KB</div>
          </div>
          <h4 className="font-aeonik font-bold text-[13px] text-frost-text mb-1 group-hover:text-amber-whisper transition-colors">Protein Structure 3D</h4>
          <p className="font-aeonik text-[12px] text-smoke">Nature Cell Biology Format</p>
        </div>

        {/* Gallery Item 2: Chart */}
        <div className="flex flex-col bg-obsidian-canvas border border-onyx-edge p-4 hover:border-silver transition-colors cursor-pointer group">
          <div className="w-full aspect-[4/3] bg-void border border-onyx-edge mb-4 flex items-end justify-center gap-2 p-6 relative">
            <div className="w-8 h-[60%] bg-onyx-edge border-t border-smoke"></div>
            <div className="w-8 h-[80%] bg-surface border-t border-smoke"></div>
            <div className="w-8 h-[40%] bg-onyx-edge border-t border-smoke"></div>
            <div className="absolute bottom-2 right-2 text-[9px] font-input text-graphite">PPTX • 45KB</div>
          </div>
          <h4 className="font-aeonik font-bold text-[13px] text-frost-text mb-1 group-hover:text-amber-whisper transition-colors">NDVI Distribution Chart</h4>
          <p className="font-aeonik text-[12px] text-smoke">Science Journal Guidelines</p>
        </div>

        {/* Gallery Item 3: Map */}
        <div className="flex flex-col bg-obsidian-canvas border border-onyx-edge p-4 hover:border-silver transition-colors cursor-pointer group">
          <div className="w-full aspect-[4/3] bg-void border border-onyx-edge mb-4 flex items-center justify-center relative overflow-hidden">
            <div className="w-[80%] h-[80%] border border-onyx-edge rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-50"></div>
            <div className="w-[60%] h-[60%] border border-onyx-edge rounded-[30%_70%_50%_40%/50%_30%_60%_40%] opacity-50"></div>
            <div className="absolute top-2 left-2">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-smoke"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
            </div>
            <div className="absolute bottom-2 right-2 text-[9px] font-input text-graphite">SVG • 230KB</div>
          </div>
          <h4 className="font-aeonik font-bold text-[13px] text-frost-text mb-1 group-hover:text-amber-whisper transition-colors">Topographic Heatmap</h4>
          <p className="font-aeonik text-[12px] text-smoke">EPSG:3857 • Colorblind Safe</p>
        </div>

      </div>
    </section>
  );
}
