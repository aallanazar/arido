import React, { useState, useRef, useEffect } from 'react';

type ToolType = 'PEN' | 'PENCIL' | 'MARKER' | 'ERASER';

export const PenOverlay: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [tool, setTool] = useState<ToolType>('PEN');
  const [color, setColor] = useState('#000000');
  
  // Store individual sizes for each tool
  const [toolSizes, setToolSizes] = useState<Record<ToolType, number>>({
    PEN: 3,
    PENCIL: 2,
    MARKER: 20,
    ERASER: 30
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper to get current size
  const currentSize = toolSizes[tool];

  const updateSize = (newSize: number) => {
    setToolSizes((prev: Record<ToolType, number>) => ({
      ...prev,
      [tool]: newSize
    }));
  };

  // Resize canvas to match container
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const parent = canvasRef.current.parentElement;
        canvasRef.current.width = parent.clientWidth;
        canvasRef.current.height = parent.clientHeight;
        
        // Restore context settings after resize reset
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        }
      }
    };

    window.addEventListener('resize', handleResize);
    // Initial resize
    handleResize();
    
    // Resize observer for dynamic content changes (like Word doc growing)
    const observer = new ResizeObserver(handleResize);
    if (canvasRef.current?.parentElement) {
        observer.observe(canvasRef.current.parentElement);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  const startDrawing = (e: React.PointerEvent) => {
    if (!isActive || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.moveTo(x, y);
    
    // Setup styles based on tool
    ctx.strokeStyle = color;
    ctx.lineWidth = currentSize; // Use the specific tool size
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';

    if (tool === 'MARKER') {
        ctx.globalAlpha = 0.5;
        ctx.globalCompositeOperation = 'multiply'; // nice highlighter effect
        // Fallback for dark mode standard alpha blend
        ctx.globalCompositeOperation = 'source-over'; 
        // Note: We use the direct size from slider now, no multiplier
    } else if (tool === 'ERASER') {
        ctx.globalCompositeOperation = 'destination-out';
    } else if (tool === 'PENCIL') {
        // Pencils are handled in draw for pressure
    }

    // Capture pointer
    canvas.setPointerCapture(e.pointerId);
  };

  const draw = (e: React.PointerEvent) => {
    if (!isActive || !canvasRef.current) return;
    
    if (e.buttons !== 1) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Pressure sensitivity if available
    if (e.pressure && e.pressure !== 0.5 && tool !== 'MARKER' && tool !== 'ERASER') {
        if (tool === 'PENCIL') {
            // Variation based on pressure for pencil
            ctx.lineWidth = currentSize * (0.5 + e.pressure);
        }
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const endDrawing = (e: React.PointerEvent) => {
      if (canvasRef.current) {
          canvasRef.current.releasePointerCapture(e.pointerId);
      }
  };

  return (
    <>
      {/* The Canvas Layer */}
      <div 
        ref={containerRef}
        className={`absolute inset-0 z-40 overflow-hidden pointer-events-none`}
      >
        <canvas
          ref={canvasRef}
          className={`w-full h-full ${isActive ? 'pointer-events-auto cursor-crosshair' : ''}`}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={endDrawing}
          // Prevent touch scrolling when drawing
          style={{ touchAction: isActive ? 'none' : 'auto' }}
        />
      </div>

      {/* Floating Toolbar */}
      <div className="fixed right-4 top-[25%] z-50 flex flex-col items-center gap-3 bg-white dark:bg-ink-800 p-3 rounded-2xl shadow-xl border border-ink-200 dark:border-ink-700 transition-all duration-300 max-h-[70vh] overflow-y-auto hide-scrollbar">
        
        {/* Toggle Button */}
        <button
          onClick={() => setIsActive(!isActive)}
          className={`p-3 rounded-full transition-colors duration-200 ${
            isActive 
              ? 'bg-ink-900 text-white dark:bg-white dark:text-ink-900 shadow-lg scale-110' 
              : 'bg-ink-100 text-ink-600 dark:bg-ink-700 dark:text-ink-300 hover:bg-ink-200'
          }`}
          title="Stiftmodus umschalten"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>

        {/* Expanded Tools */}
        {isActive && (
          <div className="flex flex-col gap-3 mt-2 animate-in fade-in slide-in-from-right-4 duration-200 w-full items-center">
            <div className="w-8 h-px bg-ink-200 dark:bg-ink-700 mx-auto"></div>

            {/* Tools */}
            <button 
                onClick={() => setTool('PEN')}
                className={`p-2 rounded-lg transition-colors w-full flex justify-center ${tool === 'PEN' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-700'}`}
                title="Kuli (Pen)"
            >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
            </button>
            <button 
                onClick={() => setTool('PENCIL')}
                className={`p-2 rounded-lg transition-colors w-full flex justify-center ${tool === 'PENCIL' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-700'}`}
                title="Bleistift"
            >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
            </button>
            <button 
                onClick={() => setTool('MARKER')}
                className={`p-2 rounded-lg transition-colors w-full flex justify-center ${tool === 'MARKER' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-700'}`}
                title="Marker"
            >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            </button>
            <button 
                onClick={() => setTool('ERASER')}
                className={`p-2 rounded-lg transition-colors w-full flex justify-center ${tool === 'ERASER' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' : 'text-ink-500 hover:bg-ink-100 dark:hover:bg-ink-700'}`}
                title="Gummi (Eraser)"
            >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>

            <div className="w-8 h-px bg-ink-200 dark:bg-ink-700 mx-auto"></div>

            {/* Colors */}
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-ink-300 cursor-pointer shadow-sm hover:scale-105 transition-transform shrink-0">
                <input 
                    type="color" 
                    value={color}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setColor(e.target.value)}
                    className="absolute inset-0 w-[150%] h-[150%] -left-1/4 -top-1/4 cursor-pointer p-0 border-0"
                    title="Farbe wählen"
                />
            </div>
            
            <div className="flex gap-1">
                <button onClick={() => setColor('#000000')} className="w-5 h-5 rounded-full bg-black border border-ink-300"></button>
                <button onClick={() => setColor('#ef4444')} className="w-5 h-5 rounded-full bg-red-500 border border-ink-300"></button>
            </div>
            <div className="flex gap-1">
                <button onClick={() => setColor('#3b82f6')} className="w-5 h-5 rounded-full bg-blue-500 border border-ink-300"></button>
                <button onClick={() => setColor('#10b981')} className="w-5 h-5 rounded-full bg-emerald-500 border border-ink-300"></button>
            </div>

            <div className="w-8 h-px bg-ink-200 dark:bg-ink-700 mx-auto"></div>

            {/* Size Slider - Context aware */}
            <div className="h-32 flex items-center justify-center py-2 relative group">
                 <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={currentSize} 
                    onChange={(e) => updateSize(Number(e.target.value))}
                    className="w-1 h-24 -rotate-180 appearance-none bg-ink-200 dark:bg-ink-700 rounded-full accent-ink-900 dark:accent-white cursor-pointer"
                    style={{writingMode: 'vertical-lr'}} 
                    title={`${tool === 'ERASER' ? 'Gummi' : tool === 'MARKER' ? 'Marker' : 'Stift'} Größe: ${currentSize}px`}
                 />
                 
                 {/* Tooltip showing size */}
                 <div className="absolute right-8 top-1/2 -translate-y-1/2 bg-ink-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {currentSize}px
                 </div>
            </div>
            <span className="text-xs text-center font-medium text-ink-500">
                {tool === 'ERASER' ? 'Radierer' : tool === 'MARKER' ? 'Marker' : 'Größe'}
            </span>
            <span className="text-[10px] text-center font-bold text-ink-800 dark:text-white">{currentSize}</span>
          </div>
        )}
      </div>
    </>
  );
};
