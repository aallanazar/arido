import React from 'react';

export const PdfStudio: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-ink-900 p-6 rounded-xl border border-ink-200 dark:border-ink-800 shadow-sm transition-colors duration-200">
        <h3 className="text-lg font-bold text-ink-900 dark:text-white mb-4">PDF Zusammenfügen (Merge)</h3>
        <div className="border-2 border-dashed border-ink-300 dark:border-ink-700 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-ink-50 dark:bg-ink-800/50">
          <svg className="w-10 h-10 text-ink-400 dark:text-ink-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          <button className="px-4 py-2 bg-ink-800 dark:bg-ink-700 text-white rounded-md text-sm hover:bg-ink-900 dark:hover:bg-ink-600 transition-colors">PDFs auswählen</button>
          <p className="text-xs text-ink-500 dark:text-ink-400 mt-2">Wählen Sie mehrere Dateien aus</p>
        </div>
      </div>

      <div className="bg-white dark:bg-ink-900 p-6 rounded-xl border border-ink-200 dark:border-ink-800 shadow-sm transition-colors duration-200">
        <h3 className="text-lg font-bold text-ink-900 dark:text-white mb-4">Seiten schneiden</h3>
        <div className="border-2 border-dashed border-ink-300 dark:border-ink-700 rounded-lg p-8 flex flex-col items-center justify-center text-center bg-ink-50 dark:bg-ink-800/50">
           <svg className="w-10 h-10 text-ink-400 dark:text-ink-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>
           <button className="px-4 py-2 bg-ink-800 dark:bg-ink-700 text-white rounded-md text-sm hover:bg-ink-900 dark:hover:bg-ink-600 transition-colors">PDF hochladen</button>
        </div>
      </div>

      <div className="bg-white dark:bg-ink-900 p-6 rounded-xl border border-ink-200 dark:border-ink-800 shadow-sm lg:col-span-2 transition-colors duration-200">
        <h3 className="text-lg font-bold text-ink-900 dark:text-white mb-4">Konverter</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="p-4 border border-ink-200 dark:border-ink-700 rounded-lg flex items-center justify-between hover:bg-ink-50 dark:hover:bg-ink-800 cursor-pointer transition-colors">
              <span className="font-medium text-ink-700 dark:text-ink-200">Word zu PDF</span>
              <span className="text-ink-400 dark:text-ink-500">→</span>
           </div>
           <div className="p-4 border border-ink-200 dark:border-ink-700 rounded-lg flex items-center justify-between hover:bg-ink-50 dark:hover:bg-ink-800 cursor-pointer transition-colors">
              <span className="font-medium text-ink-700 dark:text-ink-200">PDF zu Word</span>
              <span className="text-ink-400 dark:text-ink-500">→</span>
           </div>
        </div>
      </div>
    </div>
  );
};
