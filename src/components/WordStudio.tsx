import React, { useState } from 'react';
import { Language } from '../types';

interface WordStudioProps {
    language: Language;
}

export const WordStudio: React.FC<WordStudioProps> = ({ language }) => {
  const [fontSize, setFontSize] = useState("3");
  const [fontName, setFontName] = useState("Arial");
  const [color, setColor] = useState("#000000");

  const execCmd = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    const editor = document.getElementById('editor-content');
    editor?.focus();
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setColor(val);
    execCmd('foreColor', val);
  };

  const insertShape = (shape: string) => {
    let html = '';
    switch(shape) {
        case 'triangle': html = '&#9650;'; break; // ▲
        case 'rectangle': html = '&#9608;'; break; // █
        case 'circle': html = '&#9679;'; break; // ●
        case 'star': html = '&#9733;'; break; // ★
    }
    execCmd('insertHTML', `<span style="font-size: 24px;">${html}</span>`);
  };

  const changeCase = (type: 'upper' | 'lower') => {
    const selection = window.getSelection();
    if (selection && !selection.isCollapsed) {
       const text = selection.toString();
       const replacement = type === 'upper' ? text.toUpperCase() : text.toLowerCase();
       execCmd('insertText', replacement);
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-ink-100 dark:bg-ink-900 rounded-xl shadow-sm border border-ink-200 dark:border-ink-800 transition-colors duration-200">
      {/* Toolbar - Sticky to top of the editor view (optional, or just static) */}
      <div className="sticky top-0 z-30 bg-white dark:bg-ink-800 p-3 border-b border-ink-200 dark:border-ink-700 flex flex-wrap gap-3 items-center transition-colors duration-200 rounded-t-xl">
        
        {/* Basic Formatting */}
        <div className="flex bg-ink-50 dark:bg-ink-900 rounded-lg p-1 border border-ink-200 dark:border-ink-700">
          <button onClick={() => execCmd('bold')} className="w-8 h-8 hover:bg-white dark:hover:bg-ink-700 rounded text-ink-800 dark:text-ink-200 font-bold" title="Bold">B</button>
          <button onClick={() => execCmd('italic')} className="w-8 h-8 hover:bg-white dark:hover:bg-ink-700 rounded text-ink-800 dark:text-ink-200 italic" title="Italic">I</button>
          <button onClick={() => execCmd('underline')} className="w-8 h-8 hover:bg-white dark:hover:bg-ink-700 rounded text-ink-800 dark:text-ink-200 underline" title="Underline">U</button>
        </div>
        
        <div className="w-px h-8 bg-ink-300 dark:bg-ink-700"></div>

        {/* Font Controls */}
        <div className="flex gap-2 items-center">
            <select 
                className="h-8 px-2 rounded border border-ink-300 dark:border-ink-600 bg-white dark:bg-ink-900 text-ink-800 dark:text-ink-200 text-sm focus:outline-none focus:border-ink-500"
                value={fontName}
                onChange={(e) => { setFontName(e.target.value); execCmd('fontName', e.target.value); }}
            >
                <option value="Arial">Sans Serif (Arial)</option>
                <option value="Times New Roman">Serif (Times)</option>
                <option value="Courier New">Monospace</option>
                <option value="Georgia">Georgia</option>
            </select>

            <select 
                className="h-8 px-2 rounded border border-ink-300 dark:border-ink-600 bg-white dark:bg-ink-900 text-ink-800 dark:text-ink-200 text-sm focus:outline-none focus:border-ink-500 w-16"
                value={fontSize}
                onChange={(e) => { setFontSize(e.target.value); execCmd('fontSize', e.target.value); }}
            >
                <option value="1">XS</option>
                <option value="2">S</option>
                <option value="3">M</option>
                <option value="4">L</option>
                <option value="5">XL</option>
                <option value="6">XXL</option>
                <option value="7">Huge</option>
            </select>
        </div>

        <div className="w-px h-8 bg-ink-300 dark:bg-ink-700"></div>

        {/* Color & Case */}
        <div className="flex gap-2 items-center">
            <div className="relative group">
                <div className="w-8 h-8 rounded border border-ink-300 dark:border-ink-600 flex items-center justify-center cursor-pointer bg-white dark:bg-ink-900">
                    <span className="font-bold font-serif text-lg" style={{color: color}}>A</span>
                </div>
                <input 
                    type="color" 
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    value={color}
                    onChange={handleColorChange}
                    title="Text Color"
                />
            </div>

            <div className="flex bg-ink-50 dark:bg-ink-900 rounded-lg p-1 border border-ink-200 dark:border-ink-700">
                <button onClick={() => changeCase('upper')} className="px-2 h-8 text-xs font-bold hover:bg-white dark:hover:bg-ink-700 rounded text-ink-700 dark:text-ink-200" title="UPPERCASE">AA</button>
                <button onClick={() => changeCase('lower')} className="px-2 h-8 text-xs font-bold hover:bg-white dark:hover:bg-ink-700 rounded text-ink-700 dark:text-ink-200" title="lowercase">aa</button>
            </div>
        </div>

        <div className="w-px h-8 bg-ink-300 dark:bg-ink-700"></div>

        {/* Shapes */}
        <div className="flex gap-1 items-center">
            <button onClick={() => insertShape('triangle')} className="w-8 h-8 hover:bg-ink-100 dark:hover:bg-ink-700 rounded text-ink-600 dark:text-ink-300 flex items-center justify-center" title="Triangle">▲</button>
            <button onClick={() => insertShape('rectangle')} className="w-8 h-8 hover:bg-ink-100 dark:hover:bg-ink-700 rounded text-ink-600 dark:text-ink-300 flex items-center justify-center" title="Rectangle">█</button>
            <button onClick={() => insertShape('circle')} className="w-8 h-8 hover:bg-ink-100 dark:hover:bg-ink-700 rounded text-ink-600 dark:text-ink-300 flex items-center justify-center" title="Circle">●</button>
            <button onClick={() => insertShape('star')} className="w-8 h-8 hover:bg-ink-100 dark:hover:bg-ink-700 rounded text-ink-600 dark:text-ink-300 flex items-center justify-center" title="Star">★</button>
        </div>

        <div className="flex-1"></div>

        {/* Actions */}
        <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-white dark:bg-ink-900 border border-ink-300 dark:border-ink-600 rounded text-sm text-ink-700 dark:text-ink-200 hover:bg-ink-50 dark:hover:bg-ink-800 transition-colors">PDF</button>
            <button className="px-3 py-1.5 bg-ink-800 dark:bg-ink-700 border border-transparent rounded text-sm text-white hover:bg-ink-900 dark:hover:bg-ink-600 transition-colors">{language === 'de' ? 'Speichern' : 'Save Word'}</button>
        </div>
      </div>
      
      {/* Editor Area Wrapper - Dark/Light Background */}
      <div className="flex-1 p-4 sm:p-8 flex justify-center bg-ink-100 dark:bg-ink-950 transition-colors duration-200 cursor-text" onClick={() => document.getElementById('editor-content')?.focus()}>
        
        {/* The Paper - Always White, height grows with content */}
        <div 
          id="editor-content"
          className="w-full max-w-[800px] min-h-[1000px] bg-white shadow-lg p-8 sm:p-12 outline-none text-black selection:bg-blue-100"
          contentEditable 
          suppressContentEditableWarning={true}
          style={{
              fontFamily: 'Arial, sans-serif',
              lineHeight: '1.6'
          }}
        >
          <h1 style={{fontSize: '2.5em', fontWeight: 'bold', marginBottom: '0.5em', fontFamily: 'Georgia, serif'}}>
            {language === 'de' ? "Neues Dokument" : "New Document"}
          </h1>
          <p style={{fontSize: '1.2em'}}>
            {language === 'de' ? "Hier können Sie Ihren Text schreiben..." : "You can start writing here..."}
          </p>
          <br/>
          <p>
            {language === 'de' 
                ? "Beginnen Sie mit dem Tippen oder nutzen Sie die Werkzeugleiste oben, um Ihren Text zu formatieren." 
                : "Start typing or use the toolbar above to format your text."}
          </p>
        </div>
      </div>
    </div>
  );
};
