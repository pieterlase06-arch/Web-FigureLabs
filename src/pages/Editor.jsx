import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import html2canvas from 'html2canvas';

export default function Editor() {
  const navigate = useNavigate();
  const [bgGreen, setBgGreen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // New states for tools
  const [currentTool, setCurrentTool] = useState('pan'); // 'pan', 'eraser', 'text'
  const [textLabels, setTextLabels] = useState([]);
  
  // Refs
  const exportContainerRef = useRef(null);
  const eraserCanvasRef = useRef(null);
  const isDrawing = useRef(false);
  const dragInfo = useRef({ isDragging: false, id: null, startX: 0, startY: 0, initialX: 0, initialY: 0 });

  // Handle Resize for Canvas (Match image container size)
  useEffect(() => {
    if (generatedImage && eraserCanvasRef.current && exportContainerRef.current) {
        // We set the canvas internal resolution to match the container's client size
        const { clientWidth, clientHeight } = exportContainerRef.current;
        if (eraserCanvasRef.current.width !== clientWidth) {
           eraserCanvasRef.current.width = clientWidth;
           eraserCanvasRef.current.height = clientHeight;
        }
    }
  }, [generatedImage, bgGreen]); 

  const clearOverlays = () => {
    setTextLabels([]);
    if (eraserCanvasRef.current) {
      const ctx = eraserCanvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, eraserCanvasRef.current.width, eraserCanvasRef.current.height);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setErrorMsg(null);
    clearOverlays();
    
    try {
      const response = await fetch("/api/generate", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ prompt: prompt }),
      });
      
      if (!response.ok) {
        let errStr = "Gagal menghubungkan ke AI. Coba periksa koneksi atau API Key Anda.";
        try {
          const errData = await response.json();
          if (errData.message) {
            errStr = `${errData.error} - ${errData.message}`;
          } else {
            errStr = errData.error || errStr;
          }
        } catch (e) {}
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

  const handleDownload = async () => {
    if (!generatedImage || !exportContainerRef.current) return;
    
    // We momentarily deselect tools to hide UI outlines if any
    const previousTool = currentTool;
    setCurrentTool('pan');

    try {
      // Delay slightly to ensure UI updates (hiding delete buttons) before capturing
      await new Promise(res => setTimeout(res, 100));
      
      const canvas = await html2canvas(exportContainerRef.current, {
        backgroundColor: bgGreen ? '#00FF00' : '#111111',
        scale: 2, // High resolution export
        useCORS: true,
        logging: false
      });
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'figurelabs-export.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("Export failed", err);
    } finally {
      setCurrentTool(previousTool);
    }
  };

  // --- ERASER LOGIC ---
  const handleCanvasMouseDown = (e) => {
    if (currentTool === 'eraser' && eraserCanvasRef.current) {
        isDrawing.current = true;
        const ctx = eraserCanvasRef.current.getContext('2d');
        const rect = eraserCanvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        // Eraser uses the background color to paint over
        ctx.strokeStyle = bgGreen ? '#00FF00' : '#111111'; 
        ctx.lineWidth = 24;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (currentTool === 'eraser' && isDrawing.current && eraserCanvasRef.current) {
        const ctx = eraserCanvasRef.current.getContext('2d');
        const rect = eraserCanvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        ctx.lineTo(x, y);
        ctx.stroke();
    }
  };

  const handleCanvasMouseUp = () => {
    if (currentTool === 'eraser') {
        isDrawing.current = false;
    }
  };

  // --- TEXT TOOL LOGIC ---
  const handleContainerClick = (e) => {
    // Only add text if clicking directly on the container/canvas, not on existing text labels
    if (currentTool === 'text' && generatedImage && (e.target === eraserCanvasRef.current || e.target === exportContainerRef.current)) {
        const rect = exportContainerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const newId = Date.now().toString();
        setTextLabels(prev => [...prev, { id: newId, text: "Ketik di sini", x, y }]);
        setCurrentTool('pan'); // Switch back to pan after creating to allow editing
    }
  };

  const updateText = (id, newText) => {
    setTextLabels(prev => prev.map(lbl => lbl.id === id ? { ...lbl, text: newText } : lbl));
  };

  const deleteText = (id) => {
    setTextLabels(prev => prev.filter(lbl => lbl.id !== id));
  };

  // --- DRAG LOGIC FOR TEXT ---
  const handleTextMouseDown = (e, id, currentX, currentY) => {
    if (currentTool === 'eraser' || currentTool === 'text') return; // Only drag when in pan mode
    
    dragInfo.current = {
        isDragging: true,
        id,
        startX: e.clientX,
        startY: e.clientY,
        initialX: currentX,
        initialY: currentY
    };
    
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mouseup', handleGlobalMouseUp);
  };

  const handleGlobalMouseMove = (e) => {
    if (dragInfo.current.isDragging) {
        const dx = e.clientX - dragInfo.current.startX;
        const dy = e.clientY - dragInfo.current.startY;
        const newX = dragInfo.current.initialX + dx;
        const newY = dragInfo.current.initialY + dy;
        
        setTextLabels(prev => prev.map(lbl => 
            lbl.id === dragInfo.current.id ? { ...lbl, x: newX, y: newY } : lbl
        ));
    }
  };

  const handleGlobalMouseUp = () => {
    dragInfo.current.isDragging = false;
    document.removeEventListener('mousemove', handleGlobalMouseMove);
    document.removeEventListener('mouseup', handleGlobalMouseUp);
  };

  useEffect(() => {
    return () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove);
        document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

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
          <button 
            onClick={() => setCurrentTool('pan')}
            className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors group relative ${currentTool === 'pan' ? 'bg-[#2a2a2a] text-amber-whisper' : 'hover:bg-elevated text-frost-text'}`} 
            title="Pan Tool / Select (Geser & Edit Teks)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
            </svg>
          </button>
          
          <button 
            onClick={() => setCurrentTool('eraser')}
            className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${currentTool === 'eraser' ? 'bg-[#2a2a2a] text-amber-whisper' : 'hover:bg-elevated text-frost-text'}`} 
            title="Eraser (Hapus teks AI yang berantakan)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 20H7L3 16C2.5 15.5 2.5 14.5 3 14L13 4C13.5 3.5 14.5 3.5 15 4L20 9C20.5 9.5 20.5 10.5 20 11L11 20H20Z"></path>
            </svg>
          </button>

          <button 
            onClick={() => setCurrentTool('text')}
            className={`w-10 h-10 rounded-md flex items-center justify-center transition-colors ${currentTool === 'text' ? 'bg-[#2a2a2a] text-amber-whisper' : 'hover:bg-elevated text-frost-text'}`} 
            title="Text Tool (Klik di kanvas untuk tambah teks)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 6.1H3"></path>
              <path d="M21 12.1H3"></path>
              <path d="M15.1 18H3"></path>
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

        {/* Middle Canvas Container */}
        <main className="flex-1 flex flex-col bg-void overflow-hidden relative">
          
          <div className="flex-1 p-8 flex justify-center items-center overflow-auto bg-[#080808]" style={{
               backgroundImage: `linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)`,
               backgroundSize: '20px 20px'
             }}>
             
             {/* The Actual Canvas Element (Export Container) */}
             <div 
                ref={exportContainerRef}
                onClick={handleContainerClick}
                className={`w-full max-w-[800px] aspect-[4/3] ${bgGreen ? 'bg-[#00FF00]' : 'bg-obsidian-canvas'} border border-onyx-edge flex items-center justify-center relative shadow-none z-10 overflow-hidden ${currentTool === 'eraser' ? 'cursor-crosshair' : (currentTool === 'text' ? 'cursor-text' : 'cursor-default')}`}
             >

                {generatedImage ? (
                  <>
                    {/* The Base AI Image */}
                    <img src={generatedImage} alt="Generated Figure" className="w-full h-full object-contain absolute inset-0 z-10 pointer-events-none" crossOrigin="anonymous" />
                    
                    {/* Eraser Canvas Layer */}
                    <canvas 
                        ref={eraserCanvasRef}
                        className="absolute inset-0 z-20 w-full h-full"
                        onMouseDown={handleCanvasMouseDown}
                        onMouseMove={handleCanvasMouseMove}
                        onMouseUp={handleCanvasMouseUp}
                        onMouseLeave={handleCanvasMouseUp}
                    />

                    {/* Text Labels Layer */}
                    {textLabels.map(label => (
                        <div 
                            key={label.id}
                            className={`absolute z-30 group flex items-center gap-1 ${currentTool === 'pan' ? 'cursor-move' : ''}`}
                            style={{ left: label.x, top: label.y, transform: 'translate(-50%, -50%)' }}
                        >
                            {currentTool === 'pan' && (
                                <div 
                                    className="w-6 h-6 bg-surface border border-onyx-edge rounded flex items-center justify-center cursor-move text-smoke hover:text-white shadow-md"
                                    onMouseDown={(e) => { e.preventDefault(); handleTextMouseDown(e, label.id, label.x, label.y); }}
                                    title="Tahan dan geser (Drag)"
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 9h14M5 15h14"/></svg>
                                </div>
                            )}
                            
                            <input 
                                type="text"
                                value={label.text}
                                onChange={(e) => updateText(label.id, e.target.value)}
                                className="relative z-20 bg-transparent border border-transparent hover:border-silver focus:border-amber-whisper focus:bg-[#ffffffcc] text-center font-input font-bold outline-none px-2 py-1 text-[18px] md:text-[22px] rounded text-black drop-shadow-md placeholder-gray-500 min-w-[120px]"
                                placeholder="Ketik label..."
                            />
                            
                            {currentTool === 'pan' && (
                                <button 
                                    onClick={() => deleteText(label.id)}
                                    className="z-30 bg-red-500 text-white w-6 h-6 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs cursor-pointer shadow-md"
                                    title="Hapus Label"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    ))}
                  </>
                ) : (
                  <span className={`font-input tracking-caption text-[13px] relative z-10 ${bgGreen ? 'text-black' : 'text-smoke'}`}>
                    {isGenerating ? (
                      <div className="flex flex-col items-center animate-pulse">
                        <svg className="animate-spin mb-3 h-6 w-6 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
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
                   <span>Raster Base Layer</span>
                 </div>
                 <div className="flex items-center justify-between p-2 hover:bg-elevated rounded transition-colors cursor-pointer pl-6">
                   <div className="flex items-center gap-2">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 20H7L3 16C2.5 15.5 2.5 14.5 3 14L13 4C13.5 3.5 14.5 3.5 15 4L20 9C20.5 9.5 20.5 10.5 20 11L11 20H20Z"></path></svg>
                     <span>Eraser Mask</span>
                   </div>
                   <span className="text-[10px] bg-void px-1 rounded font-bold text-amber-whisper">{currentTool === 'eraser' ? 'ACTIVE' : ''}</span>
                 </div>
                 <div className="flex items-center justify-between p-2 hover:bg-elevated rounded transition-colors cursor-pointer pl-6">
                   <div className="flex items-center gap-2">
                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 6.1H3"></path><path d="M21 12.1H3"></path><path d="M15.1 18H3"></path></svg>
                     <span>Text Layer Group ({textLabels.length})</span>
                   </div>
                   <span className="text-[10px] bg-void px-1 rounded font-bold text-amber-whisper">{currentTool === 'text' ? 'ACTIVE' : ''}</span>
                 </div>
               </div>
            </div>
          </div>

          <div className="p-5 border-t border-onyx-edge shrink-0 flex flex-col gap-3">
            <Button variant="outlined" className="w-full py-2.5 justify-center font-input text-[11px]" disabled={!generatedImage} onClick={handleDownload}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Export Smart PNG
            </Button>
          </div>
        </aside>

      </div>
    </div>
  );
}
