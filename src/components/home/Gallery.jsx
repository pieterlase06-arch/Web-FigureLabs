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
          <div className="w-full aspect-[4/3] bg-void border border-onyx-edge mb-4 relative overflow-hidden group-hover:opacity-90 transition-opacity">
            <img src="/gallery/protein.png" alt="Protein Structure 3D" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 right-2 text-[9px] font-input text-white bg-black/60 px-2 py-1 rounded">SVG • 12KB</div>
          </div>
          <h4 className="font-aeonik font-bold text-[13px] text-frost-text mb-1 group-hover:text-amber-whisper transition-colors">Protein Structure 3D</h4>
          <p className="font-aeonik text-[12px] text-smoke">Nature Cell Biology Format</p>
        </div>

        {/* Gallery Item 2: Chart */}
        <div className="flex flex-col bg-obsidian-canvas border border-onyx-edge p-4 hover:border-silver transition-colors cursor-pointer group">
          <div className="w-full aspect-[4/3] bg-void border border-onyx-edge mb-4 relative overflow-hidden group-hover:opacity-90 transition-opacity">
            <img src="/gallery/ndvi.png" alt="NDVI Distribution Heatmap" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 right-2 text-[9px] font-input text-white bg-black/60 px-2 py-1 rounded">PPTX • 45KB</div>
          </div>
          <h4 className="font-aeonik font-bold text-[13px] text-frost-text mb-1 group-hover:text-amber-whisper transition-colors">NDVI Distribution Heatmap</h4>
          <p className="font-aeonik text-[12px] text-smoke">Science Journal Guidelines</p>
        </div>

        {/* Gallery Item 3: Map */}
        <div className="flex flex-col bg-obsidian-canvas border border-onyx-edge p-4 hover:border-silver transition-colors cursor-pointer group">
          <div className="w-full aspect-[4/3] bg-void border border-onyx-edge mb-4 relative overflow-hidden group-hover:opacity-90 transition-opacity">
            <img src="/gallery/network.png" alt="Neural Network Graph" className="w-full h-full object-cover" />
            <div className="absolute bottom-2 right-2 text-[9px] font-input text-white bg-black/60 px-2 py-1 rounded">SVG • 230KB</div>
          </div>
          <h4 className="font-aeonik font-bold text-[13px] text-frost-text mb-1 group-hover:text-amber-whisper transition-colors">Neural Network Architecture</h4>
          <p className="font-aeonik text-[12px] text-smoke">IEEE Standard Formatting</p>
        </div>

      </div>
    </section>
  );
}
