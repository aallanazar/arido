import React, { useState } from 'react';

export const ConverterStudio: React.FC = () => {
  const [mode, setMode] = useState<'IMG_TO_VID' | 'VID_TO_IMG'>('IMG_TO_VID');

  return (
    <div className="bg-white dark:bg-ink-900 rounded-xl border border-ink-200 dark:border-ink-800 shadow-sm overflow-hidden max-w-3xl mx-auto transition-colors duration-200">
       <div className="flex border-b border-ink-200 dark:border-ink-800">
         <button 
           onClick={() => setMode('IMG_TO_VID')}
           className={`flex-1 py-4 text-center font-medium transition-colors ${mode === 'IMG_TO_VID' ? 'bg-ink-50 dark:bg-ink-800 text-ink-900 dark:text-white border-b-2 border-ink-900 dark:border-white' : 'text-ink-500 dark:text-ink-400 hover:text-ink-700 dark:hover:text-ink-200'}`}
         >
           Bilder zu Video
         </button>
         <button 
           onClick={() => setMode('VID_TO_IMG')}
           className={`flex-1 py-4 text-center font-medium transition-colors ${mode === 'VID_TO_IMG' ? 'bg-ink-50 dark:bg-ink-800 text-ink-900 dark:text-white border-b-2 border-ink-900 dark:border-white' : 'text-ink-500 dark:text-ink-400 hover:text-ink-700 dark:hover:text-ink-200'}`}
         >
           Video zu Bildern
         </button>
       </div>

       <div className="p-8">
         {mode === 'IMG_TO_VID' ? (
           <div className="text-center">
             <div className="border-2 border-dashed border-ink-300 dark:border-ink-700 rounded-xl p-8 mb-4 bg-ink-50 dark:bg-ink-800/50">
               <p className="text-ink-600 dark:text-ink-400 mb-2">Wählen Sie mehrere Bilder aus</p>
               <button className="px-4 py-2 bg-ink-800 dark:bg-ink-700 text-white rounded hover:bg-ink-900 dark:hover:bg-ink-600 transition-colors">Bilder hochladen</button>
             </div>
             <div className="flex justify-center gap-4 text-sm text-ink-600 dark:text-ink-400">
               <label className="flex items-center gap-2">
                 <span>Dauer pro Bild:</span>
                 <input type="number" className="w-16 border border-ink-300 dark:border-ink-600 bg-white dark:bg-ink-800 rounded p-1" defaultValue={3} /> sek
               </label>
             </div>
             <button className="mt-6 w-full py-3 bg-blue-600 text-white rounded-lg font-bold shadow-sm hover:bg-blue-700 transition-colors">Video Erstellen</button>
           </div>
         ) : (
            <div className="text-center">
             <div className="border-2 border-dashed border-ink-300 dark:border-ink-700 rounded-xl p-8 mb-4 bg-ink-50 dark:bg-ink-800/50">
               <p className="text-ink-600 dark:text-ink-400 mb-2">Wählen Sie ein Video aus</p>
               <button className="px-4 py-2 bg-ink-800 dark:bg-ink-700 text-white rounded hover:bg-ink-900 dark:hover:bg-ink-600 transition-colors">Video hochladen</button>
             </div>
             <p className="text-sm text-ink-500 dark:text-ink-400 mb-4">Das Video wird in einzelne Frames extrahiert.</p>
             <button className="w-full py-3 bg-green-600 text-white rounded-lg font-bold shadow-sm hover:bg-green-700 transition-colors">Als Bilder exportieren</button>
           </div>
         )}
       </div>
    </div>
  );
};
