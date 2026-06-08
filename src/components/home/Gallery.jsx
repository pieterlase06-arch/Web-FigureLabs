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
        
        {/* Gallery Item 1: Medical 3D */}
        <div className="flex flex-col bg-obsidian-canvas border border-onyx-edge p-4 hover:border-silver transition-colors cursor-pointer group">
          <div className="w-full aspect-[4/3] bg-white border border-onyx-edge mb-4 relative overflow-hidden group-hover:opacity-90 transition-opacity flex items-center justify-center p-2">
            <img src="/gallery/medical3d.png" alt="Intragastric Balloon 3D" className="w-full h-full object-contain" />
            <div className="absolute bottom-2 right-2 text-[9px] font-input text-white bg-black/60 px-2 py-1 rounded">SVG • 45KB</div>
          </div>
          <h4 className="font-aeonik font-bold text-[13px] text-frost-text mb-1 group-hover:text-amber-whisper transition-colors">Intragastric Balloon 3D</h4>
          <p className="font-aeonik text-[12px] text-smoke">Medical Device Illustration</p>
        </div>

        {/* Gallery Item 2: Geology 3D */}
        <div className="flex flex-col bg-obsidian-canvas border border-onyx-edge p-4 hover:border-silver transition-colors cursor-pointer group">
          <div className="w-full aspect-[4/3] bg-white border border-onyx-edge mb-4 relative overflow-hidden group-hover:opacity-90 transition-opacity flex items-center justify-center p-2">
            <img src="/gallery/geology3d.png" alt="Glacier Cross-section 3D" className="w-full h-full object-contain" />
            <div className="absolute bottom-2 right-2 text-[9px] font-input text-white bg-black/60 px-2 py-1 rounded">PPTX • 12KB</div>
          </div>
          <h4 className="font-aeonik font-bold text-[13px] text-frost-text mb-1 group-hover:text-amber-whisper transition-colors">Glacier Cross-section</h4>
          <p className="font-aeonik text-[12px] text-smoke">Geological 3D Diagram</p>
        </div>

        {/* Gallery Item 3: Biology 3D */}
        <div className="flex flex-col bg-obsidian-canvas border border-onyx-edge p-4 hover:border-silver transition-colors cursor-pointer group">
          <div className="w-full aspect-[4/3] bg-white border border-onyx-edge mb-4 relative overflow-hidden group-hover:opacity-90 transition-opacity flex items-center justify-center p-2">
            <img src="/gallery/biology3d.png" alt="Lipid Bilayer 3D" className="w-full h-full object-contain" />
            <div className="absolute bottom-2 right-2 text-[9px] font-input text-white bg-black/60 px-2 py-1 rounded">SVG • 85KB</div>
          </div>
          <h4 className="font-aeonik font-bold text-[13px] text-frost-text mb-1 group-hover:text-amber-whisper transition-colors">Lipid Bilayer Membrane</h4>
          <p className="font-aeonik text-[12px] text-smoke">Cellular Biology 3D</p>
        </div>

      </div>
    </section>
  );
}
