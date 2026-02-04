import React, { useState, useRef, useEffect } from 'react';
import { editImageWithGemini, fileToGenerativePart } from '../services/gemini';
import { Spinner } from './Spinner';

const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
};

export const ImageStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'AI' | 'MANUAL'>('AI');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // AI State
  const [prompt, setPrompt] = useState<string>("Make this image look like a watercolor painting.");
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Manual State
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [grayscale, setGrayscale] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError("Bitte laden Sie eine gültige Bilddatei hoch.");
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImage(null);
      setError(null);
    }
  };

  const handleAiGenerate = async () => {
    if (!selectedFile) return;
    setIsLoading(true);
    setError(null);
    try {
      const generatedImageBase64 = await editImageWithGemini(selectedFile, prompt);
      setResultImage(generatedImageBase64);
    } catch (err: any) {
      setError(err.message || "Fehler bei der Generierung.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueEditing = () => {
    if (resultImage) {
      const file = dataURLtoFile(resultImage, "edited-image.png");
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImage(null);
    }
  };

  // Applying manual filters to the preview style
  const imageStyle = {
    filter: `brightness(${brightness}%) contrast(${contrast}%) grayscale(${grayscale}%)`
  };

  return (
    <div className="flex flex-col lg:flex-row h-full gap-6">
      {/* Controls */}
      <div className="w-full lg:w-1/3 p-6 bg-white dark:bg-ink-900 rounded-xl shadow-sm border border-ink-200 dark:border-ink-800 flex flex-col gap-6 transition-colors duration-200">
        
        {/* Tab Switcher */}
        <div className="flex rounded-lg bg-ink-100 dark:bg-ink-800 p-1">
          <button 
            onClick={() => setActiveTab('AI')}
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'AI' ? 'bg-white dark:bg-ink-700 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500 dark:text-ink-400 hover:text-ink-700 dark:hover:text-ink-200'}`}
          >
            AI Generierung
          </button>
          <button 
             onClick={() => setActiveTab('MANUAL')}
             className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${activeTab === 'MANUAL' ? 'bg-white dark:bg-ink-700 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500 dark:text-ink-400 hover:text-ink-700 dark:hover:text-ink-200'}`}
          >
            Manuell
          </button>
        </div>

        {/* Upload */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-ink-300 dark:border-ink-700 rounded-xl p-4 text-center cursor-pointer hover:border-ink-500 dark:hover:border-ink-500 transition-colors bg-ink-50 dark:bg-ink-800/50"
        >
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
          <p className="text-sm text-ink-600 dark:text-ink-400 font-medium">
            {selectedFile ? "Bild ändern" : "Bild hochladen"}
          </p>
        </div>

        {activeTab === 'AI' ? (
          <div className="flex flex-col gap-4">
            <label className="text-sm font-bold text-ink-700 dark:text-ink-300">Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 border border-ink-300 dark:border-ink-700 rounded-md text-sm h-32 resize-none bg-white dark:bg-ink-800 text-ink-900 dark:text-white focus:ring-ink-500 focus:border-ink-500"
              placeholder="Was soll verändert werden?"
            />
            <button
              onClick={handleAiGenerate}
              disabled={!selectedFile || isLoading}
              className="w-full py-3 bg-ink-800 dark:bg-ink-700 text-white rounded-lg hover:bg-ink-900 dark:hover:bg-ink-600 disabled:bg-ink-300 dark:disabled:bg-ink-800 flex justify-center items-center transition-colors"
            >
              {isLoading ? <Spinner /> : "Generieren"}
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
             <div>
               <label className="text-xs font-bold text-ink-500 dark:text-ink-400 uppercase">Helligkeit: {brightness}%</label>
               <input type="range" min="0" max="200" value={brightness} onChange={(e) => setBrightness(Number(e.target.value))} className="w-full mt-2 accent-ink-600 dark:accent-ink-400"/>
             </div>
             <div>
               <label className="text-xs font-bold text-ink-500 dark:text-ink-400 uppercase">Kontrast: {contrast}%</label>
               <input type="range" min="0" max="200" value={contrast} onChange={(e) => setContrast(Number(e.target.value))} className="w-full mt-2 accent-ink-600 dark:accent-ink-400"/>
             </div>
             <div>
               <label className="text-xs font-bold text-ink-500 dark:text-ink-400 uppercase">Schwarz-Weiß: {grayscale}%</label>
               <input type="range" min="0" max="100" value={grayscale} onChange={(e) => setGrayscale(Number(e.target.value))} className="w-full mt-2 accent-ink-600 dark:accent-ink-400"/>
             </div>
          </div>
        )}
        
        {error && <div className="text-red-500 dark:text-red-400 text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded">{error}</div>}
      </div>

      {/* Preview Area */}
      <div className="w-full lg:w-2/3 bg-ink-50 dark:bg-ink-950 rounded-xl border border-ink-200 dark:border-ink-800 flex items-center justify-center p-4 relative overflow-hidden min-h-[400px]">
        {activeTab === 'AI' && resultImage ? (
           <div className="flex flex-col items-center w-full h-full">
             <img src={resultImage} className="max-h-[500px] object-contain shadow-lg rounded-lg" alt="AI Result" />
             <div className="mt-4 flex gap-3">
               <button onClick={handleContinueEditing} className="px-4 py-2 bg-ink-800 dark:bg-ink-700 text-white rounded-md text-sm hover:bg-ink-900 dark:hover:bg-ink-600">Weiter bearbeiten</button>
               <a href={resultImage} download="ai-image.png" className="px-4 py-2 bg-white dark:bg-ink-800 border border-ink-300 dark:border-ink-700 text-ink-700 dark:text-ink-200 rounded-md text-sm hover:bg-ink-50 dark:hover:bg-ink-700">Download</a>
             </div>
           </div>
        ) : previewUrl ? (
           <img 
            src={previewUrl} 
            className="max-h-[500px] object-contain shadow-lg rounded-lg transition-all duration-200"
            style={activeTab === 'MANUAL' ? imageStyle : {}} 
            alt="Preview" 
           />
        ) : (
          <div className="text-ink-400 dark:text-ink-600 flex flex-col items-center">
            <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <span className="text-lg">Kein Bild ausgewählt</span>
          </div>
        )}
      </div>
    </div>
  );
};
