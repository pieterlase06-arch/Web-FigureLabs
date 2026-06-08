import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';

export default function Editor() {
  const navigate = useNavigate();
  const [bgGreen, setBgGreen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setErrorMsg(null);
    
    try {
      const isProd = import.meta.env.PROD;
      const apiUrl = isProd 
        ? "/api/generate" 
        : "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";
      
      const headers = { "Content-Type": "application/json" };
      if (!isProd) {
        headers["Authorization"] = `Bearer ${import.meta.env.VITE_HF_API_KEY}`;
      }
      
      const bodyPayload = isProd ? { prompt } : { inputs: prompt };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(bodyPayload),
      });
      
      if (!response.ok) {
        let errStr = "Gagal menghubungkan ke AI. Coba periksa koneksi atau API Key Anda.";
        try {
          const errData = await response.json();
          errStr = errData.error || errStr;
        } catch (e) {
          // ignore
        }
        throw new Error(errStr);
      }
      
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setGeneratedImage(imageUrl);
    } catch (err) {
      if (err.message === "Failed to fetch") {
        setErrorMsg("Koneksi gagal (Failed to fetch). Pastikan Anda sudah me-Redeploy Vercel setelah memasukkan API Key, dan matikan sementara Adblocker/Shields di browser Anda.");
      } else {
        setErrorMsg(err.message);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const a = document.createElement('a');
    a.href = generatedImage;
    a.download = 'figurelabs-export.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-obsidian-canvas text-frost-text overflow-hidden">
      {/* Mini Header */}
      <header className="h-[60px] border-b border-onyx-edge flex items-center justify-between px-6 shrink-0 bg-obsidian-canvas z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/')} className="font-aeonik font-normal text-[18px] text-frost-text hover:text-amber-whisper transition-colors cursor-pointer">FigureLabs</button>
          <div className="w-px h-4 bg-silver"></div>
          <span className="font-input text-[13px] tracking-caption text-smoke">SCIENTIFIC WORKSPACE</span>
        </div>
        <div className="flex items-center gap-4">
           <span className="font-input text-[11px] text-graphite hidden md:block">Color Space: CMYK | DPI: 300</span>
           <Badge variant="default">ENGINE READY</Badge>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Toolbar */}
        <aside className="w-[60px] border-r border-onyx-edge flex flex-col items-center py-4 gap-4 shrink-0 bg-surface z-20">
          <button className="w-10 h-10 rounded-md hover:bg-elevated flex items-center justify-center text-frost-text transition-colors group relative" title="Pan Tool">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
            </svg>
          </button>
          <button className="w-10 h-10 rounded-md hover:bg-elevated flex items-center justify-center text-frost-text transition-colors" title="Vector Select / Node Edit">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3h18v18H3zM3 9h18M9 21V9"></path>
            </svg>
          </button>
          <button className="w-10 h-10 rounded-md hover:bg-elevated flex items-center justify-center text-frost-text transition-colors" title="Region Redraw Mask">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 20H7L3 16C2.5 15.5 2.5 14.5 3 14L13 4C13.5 3.5 14.5 3.5 15 4L20 9C20.5 9.5 20.5 10.5 20 11L11 20H20Z"></path>
            </svg>
          </button>
          {/* Text Edit */}
          <button className="w-10 h-10 rounded-md hover:bg-elevated flex items-center justify-center text-frost-text transition-colors" title="Text Edit (Fix labels directly)">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 6.1H3"></path>
              <path d="M21 12.1H3"></path>
              <path d="M15.1 18H3"></path>
            </svg>
          </button>
          {/* Remove BG */}
          <button className="w-10 h-10 rounded-md hover:bg-elevated flex items-center justify-center text-frost-text transition-colors" title="Remove Background">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3h18v18H3zM3 9h18M9 21V9"></path>
              <line x1="3" y1="3" x2="21" y2="21"></line>
            </svg>
          </button>
          <button className="w-10 h-10 rounded-md hover:bg-elevated flex items-center justify-center text-frost-text transition-colors" title="Grid Snapping">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="3" y1="15" x2="21" y2="15"></line>
              <line x1="9" y1="3" x2="9" y2="21"></line>
              <line x1="15" y1="3" x2="15" y2="21"></line>
            </svg>
          </button>
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

        {/* Middle Canvas Container with Graph Paper & Ruler */}
        <main className="flex-1 flex flex-col bg-void overflow-hidden relative">
          
          {/* Top Ruler */}
          <div className="h-[30px] w-full border-b border-onyx-edge bg-obsidian-canvas flex overflow-hidden shrink-0" style={{ backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 49px, #212121 49px, #212121 50px)'}}>
             {/* Ruler tick marks generated via CSS background for effect */}
             <div className="w-full h-full opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 9px, #212121 9px, #212121 10px)'}}></div>
          </div>
          
          <div className="flex-1 flex overflow-auto relative">
             {/* Left Ruler */}
             <div className="w-[30px] h-full border-r border-onyx-edge bg-obsidian-canvas flex flex-col shrink-0" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 49px, #212121 49px, #212121 50px)'}}>
               <div className="w-full h-full opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 9px, #212121 9px, #212121 10px)'}}></div>
             </div>

             {/* Inner Graph Paper Container */}
             <div className="flex-1 p-8 flex justify-center items-center overflow-auto bg-[#080808]" style={{
               backgroundImage: `
                 linear-gradient(to right, #1a1a1a 1px, transparent 1px),
                 linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)
               `,
               backgroundSize: '20px 20px'
             }}>
                
                {/* The Actual Canvas Element */}
                <div className={`w-full max-w-[800px] aspect-[4/3] ${bgGreen ? 'bg-[#00FF00]' : 'bg-obsidian-canvas'} border border-onyx-edge flex items-center justify-center relative transition-colors duration-200 shadow-none z-10 overflow-hidden`}>

                  {generatedImage ? (
                    <img src={generatedImage} alt="Generated Figure" className="w-full h-full object-contain relative z-10" />
                  ) : (
                    <span className={`font-input tracking-caption text-[13px] relative z-10 ${bgGreen ? 'text-black' : 'text-smoke'}`}>
                      {isGenerating ? (
                        <div className="flex flex-col items-center animate-pulse">
                          <svg className="animate-spin mb-3 h-6 w-6 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          [ COMPILING MODEL... ]
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 opacity-50"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                          [ HTML5 RENDER TARGET ]
                        </div>
                      )}
                    </span>
                  )}
                </div>

             </div>
          </div>

          {/* Bottom Scientific Metadata Bar */}
          <div className="h-[30px] border-t border-onyx-edge bg-obsidian-canvas flex items-center px-4 shrink-0 font-input text-[11px] text-graphite tracking-caption justify-between">
            <div className="flex gap-4">
              <span>Color Profile: sRGB</span>
              <span>Min Line Weight: 0.5pt</span>
              <span>Font: Aeonik (Embedded)</span>
            </div>
            <div>
              <span>1920x1440 · 300 DPI</span>
            </div>
          </div>
        </main>

        {/* Right Panel: Prompt & Layers */}
        <aside className="w-[320px] border-l border-onyx-edge bg-surface flex flex-col shrink-0 z-20">
          
          <div className="flex-1 overflow-y-auto flex flex-col">
            {/* Generation Panel */}
            <div className="p-5 border-b border-onyx-edge">
              <h3 className="font-aeonik font-bold uppercase text-[14px] tracking-body text-frost-text mb-4">AI Instruction</h3>
              
              <div className="flex flex-col gap-2 mb-5">
                <textarea 
                  className="w-full h-32 bg-obsidian-canvas border border-onyx-edge rounded-md p-3 text-frost-text font-input text-[13px] leading-[1.5] resize-none focus:outline-none focus:border-silver transition-colors"
                  placeholder="> Enter model prompt... (e.g. Render 3D cross-section of a plant cell with labeled organelles)"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isGenerating}
                ></textarea>
              </div>

              {/* Administrative Metadata */}
              <div className="flex flex-col gap-2 mb-5 p-3 border border-onyx-edge rounded-md bg-[#1a1a1a]">
                <label className="font-aeonik font-bold uppercase text-[10px] tracking-widest text-graphite mb-1">Metadata Dokumen</label>
                <div className="flex flex-col gap-1">
                  <span className="font-input text-[11px] text-frost-text">Nama Penyusun</span>
                  <input type="text" className="w-full bg-void border border-onyx-edge rounded px-2 py-1.5 text-smoke font-input text-[11px] focus:outline-none focus:border-silver transition-colors" placeholder="Masukkan nama..." defaultValue="Dr. Pieter Lase" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2 mb-5">
                <div className="p-3 bg-[#1a1a1a] border border-onyx-edge rounded-md flex items-start gap-3">
                  <div className="mt-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e7c59a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                  </div>
                  <p className="font-input text-[11px] text-smoke leading-[1.4]">
                    Strict validation applied. Outputs failing scale parity will be rejected by the orchestrator.
                  </p>
                </div>
              </div>

              <Button variant="primary" className="w-full py-2.5 justify-center" onClick={handleGenerate} disabled={isGenerating || !prompt.trim()}>
                {isGenerating ? "Compiling..." : "Compile Figure"}
              </Button>
              {errorMsg && <p className="text-[#ff4444] font-input text-[11px] mt-2 leading-[1.4] text-center">{errorMsg}</p>}
            </div>

            {/* Structure / Layers Panel Mock */}
            <div className="p-5 flex-1">
               <h3 className="font-aeonik font-bold uppercase text-[14px] tracking-body text-frost-text mb-4">Vector Structure</h3>
               <div className="flex flex-col gap-2 font-input text-[12px] text-smoke">
                 <div className="flex items-center gap-2 p-2 hover:bg-elevated rounded transition-colors cursor-pointer text-frost-text">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                   <span>SVG Root</span>
                 </div>
                 <div className="flex items-center gap-2 p-2 hover:bg-elevated rounded transition-colors cursor-pointer pl-6">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
                   <span>Background Fill</span>
                 </div>
                 <div className="flex items-center gap-2 p-2 hover:bg-elevated rounded transition-colors cursor-pointer pl-6">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>
                   <span>Illustration Data</span>
                 </div>
                 <div className="flex items-center gap-2 p-2 hover:bg-elevated rounded transition-colors cursor-pointer pl-6">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7"></polyline><line x1="9" y1="20" x2="15" y2="20"></line><line x1="12" y1="4" x2="12" y2="20"></line></svg>
                   <span>Axes & Typography</span>
                 </div>
               </div>
            </div>
          </div>

          <div className="p-5 border-t border-onyx-edge shrink-0 flex flex-col gap-3">
            <Button variant="outlined" className="w-full py-2.5 justify-center font-input text-[11px]" disabled={!generatedImage} onClick={handleDownload}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Export Lossless PNG
            </Button>
          </div>
        </aside>

      </div>
    </div>
  );
}
