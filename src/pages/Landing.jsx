import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import Gallery from '../components/home/Gallery';

export default function Landing() {
  const [typedText, setTypedText] = useState('');
  const promptText = "> Generating 3D cross-section of an animal cell with labeled organelles...";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(promptText.slice(0, i));
      i++;
      if (i > promptText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-obsidian-canvas text-frost-text flex flex-col items-center relative overflow-x-hidden">
      
      {/* Decorative Dot Matrix Map - Moved to absolute background */}
      <div className="absolute top-[200px] left-0 w-full h-[800px] overflow-hidden flex justify-center items-center opacity-20 select-none pointer-events-none z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at center, #ffffff 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)',
          WebkitMaskImage: 'radial-gradient(ellipse at top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%)'
        }}></div>
      </div>

      <div className="z-10 w-full flex justify-center">
        <Header />
      </div>
      
      <main className="w-full flex flex-col items-center z-10">
        {/* 1. Hero Section */}
        <section className="w-full max-w-[1200px] flex flex-col items-center pt-24 pb-16 px-6">
          <Badge variant="accent" className="mb-8">ACADEMIC PUBLISHING READY</Badge>
          
          <h1 className="text-display tracking-display font-aeonik font-normal leading-none text-center max-w-[900px] mb-8">
            Scientific precision,<br />visual excellence.
          </h1>

          <p className="font-aeonik text-[18px] text-smoke text-center max-w-[600px] mb-12 leading-[1.4]">
            Export publication-ready SVGs for Nature & Science journals. Strictly adheres to scientific accuracy and academic formatting standards.
          </p>
          
          <div className="flex items-center gap-5 mb-24">
            <Button variant="primary" onClick={() => window.location.hash = '#editor'}>Open Workspace</Button>
            <Button variant="outlined" icon={
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            }>Read Manifesto</Button>
          </div>

          {/* Editor/Prompt Mockup Preview */}
          <div className="w-full max-w-[800px] border border-onyx-edge bg-surface rounded-md overflow-hidden flex flex-col shadow-none">
            {/* Mock Header */}
            <div className="h-10 border-b border-onyx-edge flex items-center px-4 gap-2 bg-obsidian-canvas shrink-0">
               <div className="w-2.5 h-2.5 rounded-full border border-ash bg-obsidian-canvas"></div>
               <div className="w-2.5 h-2.5 rounded-full border border-ash bg-obsidian-canvas"></div>
               <div className="w-2.5 h-2.5 rounded-full border border-ash bg-obsidian-canvas"></div>
               <span className="ml-4 font-input text-[11px] text-graphite tracking-caption">figure-engine — rendering terminal</span>
            </div>
            {/* Mock Body */}
            <div className="p-6 font-input text-[13px] text-smoke text-left leading-[1.6]">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-amber-whisper">sys@figurelabs:~$</span>
                <span className="text-frost-text break-all">{typedText}<span className="animate-pulse inline-block w-2 h-3 bg-frost-text align-middle ml-1"></span></span>
              </div>
              <div className="text-graphite opacity-80 border-l-2 border-onyx-edge pl-4 mt-4 space-y-2">
                 <p>[OK] Validating prompt against academic constraints...</p>
                 <p>[OK] Enforcing Wong (2011) color-blind friendly palette...</p>
                 <p>[OK] Setting minimum stroke weight to 0.5pt...</p>
                 <p className="text-[#10B981] pt-2">✓ Lossless Vector SVG generated successfully. (0.84s)</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Feature Grid 2x2 */}
        <section className="w-full max-w-[1200px] px-6 mt-16 mb-[120px]" id="services">
          <div className="grid grid-cols-1 md:grid-cols-2 bg-onyx-edge gap-px border border-onyx-edge">
            {/* Cell 1 */}
            <div onClick={() => window.location.hash = '#editor'} className="bg-obsidian-canvas p-[40px] flex flex-col h-full hover:bg-surface transition-colors duration-300 cursor-pointer group">
              <div className="mb-6">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f3f3f3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </div>
              <h3 className="font-aeonik font-bold uppercase text-[14px] text-frost-text mb-3">Scientific Formatting</h3>
              <p className="font-aeonik font-normal text-[14px] text-smoke leading-[1.43]">
                Strict adherence to publication standards. Minimum line thickness, correct aspect ratios, and color-blind friendly palettes out of the box.
              </p>
            </div>
            
            {/* Cell 2 */}
            <div onClick={() => window.location.hash = '#editor'} className="bg-obsidian-canvas p-[40px] flex flex-col h-full hover:bg-surface transition-colors duration-300 cursor-pointer group">
              <div className="mb-6">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f3f3f3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="font-aeonik font-bold uppercase text-[14px] text-frost-text mb-3">Lossless Vector Export</h3>
              <p className="font-aeonik font-normal text-[14px] text-smoke leading-[1.43]">
                Figures are fully vector-backed. Export directly to crisp SVG format for zero resolution degradation during the journal review process.
              </p>
            </div>

            {/* Cell 3 */}
            <div onClick={() => window.location.hash = '#editor'} className="bg-obsidian-canvas p-[40px] flex flex-col h-full hover:bg-surface transition-colors duration-300 cursor-pointer group">
              <div className="mb-6">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f3f3f3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3 className="font-aeonik font-bold uppercase text-[14px] text-frost-text mb-3">Scale Validity</h3>
              <p className="font-aeonik font-normal text-[14px] text-smoke leading-[1.43]">
                Zero data misrepresentation. Molecular structures, physical dynamics, and biological diagrams are generated with absolute scientific rigor.
              </p>
            </div>

            {/* Cell 4 */}
            <div onClick={() => window.location.hash = '#editor'} className="bg-obsidian-canvas p-[40px] flex flex-col h-full hover:bg-surface transition-colors duration-300 cursor-pointer group">
              <div className="mb-6">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f3f3f3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </div>
              <h3 className="font-aeonik font-bold uppercase text-[14px] text-frost-text mb-3">AI-Assisted Redraw</h3>
              <p className="font-aeonik font-normal text-[14px] text-smoke leading-[1.43]">
                Highlight regions of your canvas and instruct the AI to re-render specific parts. Intelligent context-awareness maintains global consistency.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Gallery Section */}
        <Gallery />

        {/* 5. Manifesto Section */}
        <section className="w-full max-w-[680px] px-6 mb-[120px] flex flex-col items-center text-center" id="process">
          <h2 className="font-aeonik font-normal text-[34px] tracking-heading text-frost-text mb-8">
            Why FigureLabs?
          </h2>
          
          <div className="flex flex-col gap-6 mb-12">
            <p className="font-aeonik font-normal text-[16px] leading-[1.5] text-smoke text-left">
              Scientific illustration shouldn't be a compromise between aesthetic quality and empirical accuracy. Most generative AI tools produce beautiful but functionally useless graphics—hallucinating axes, distorting scales, and ignoring the rigid constraints of academic publishing.
            </p>
            <p className="font-aeonik font-normal text-[16px] leading-[1.5] text-smoke text-left">
              FigureLabs is built on a simple premise: a visual must first be true, then it can be beautiful. We constrain the AI using structural parsers and scientific validation, ensuring every figure you generate is ready for peer-review. Dokumen dan metadatanya valid, memuat <strong className="text-frost-text">Nama Penyusun</strong> secara akurat tanpa kecuali.
            </p>
          </div>
          
          <Button variant="outlined">Read Manifesto</Button>
        </section>
        
      </main>
    </div>
  );
}
