import React, { useState } from 'react';

export const AudioStudio: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="bg-white dark:bg-ink-900 p-8 rounded-xl border border-ink-200 dark:border-ink-800 shadow-sm max-w-2xl mx-auto transition-colors duration-200">
      <h2 className="text-2xl font-serif font-bold text-ink-900 dark:text-white mb-6 text-center">Audio Lab</h2>
      
      {!file ? (
        <div className="border-2 border-dashed border-ink-300 dark:border-ink-700 rounded-xl p-12 text-center bg-ink-50 dark:bg-ink-800/50">
          <button className="bg-ink-800 dark:bg-ink-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-ink-900 dark:hover:bg-ink-600 transition-colors">
             Musik oder Sprachnachricht hochladen
          </button>
          <input type="file" className="hidden" accept="audio/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        </div>
      ) : (
        <div className="space-y-6">
           <div className="flex items-center justify-center p-6 bg-ink-900 dark:bg-black rounded-xl border border-transparent dark:border-ink-800">
             {/* Fake Waveform */}
             <div className="flex gap-1 items-end h-16">
                {[...Array(20)].map((_, i) => (
                    <div key={i} className="w-2 bg-ink-400 dark:bg-ink-600 rounded-t" style={{height: `${Math.random() * 100}%`}}></div>
                ))}
             </div>
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <button className="p-3 border border-ink-200 dark:border-ink-700 rounded-lg hover:bg-ink-50 dark:hover:bg-ink-800 text-ink-700 dark:text-ink-200 font-medium transition-colors">Schneiden (Cut)</button>
              <button className="p-3 border border-ink-200 dark:border-ink-700 rounded-lg hover:bg-ink-50 dark:hover:bg-ink-800 text-ink-700 dark:text-ink-200 font-medium transition-colors">Verbinden (Join)</button>
           </div>
           
           <div>
             <label className="text-sm font-bold text-ink-700 dark:text-ink-300 mb-2 block">Effekte</label>
             <div className="flex gap-2">
                <button className="px-3 py-1 bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-200 rounded text-sm hover:bg-ink-200 dark:hover:bg-ink-700 transition-colors">Fade In</button>
                <button className="px-3 py-1 bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-200 rounded text-sm hover:bg-ink-200 dark:hover:bg-ink-700 transition-colors">Fade Out</button>
                <button className="px-3 py-1 bg-ink-100 dark:bg-ink-800 text-ink-700 dark:text-ink-200 rounded text-sm hover:bg-ink-200 dark:hover:bg-ink-700 transition-colors">Rauschunterdrückung</button>
             </div>
           </div>

           <button onClick={() => setFile(null)} className="text-red-500 dark:text-red-400 text-sm underline w-full text-center hover:text-red-700 dark:hover:text-red-300">Datei entfernen</button>
        </div>
      )}
    </div>
  );
};
