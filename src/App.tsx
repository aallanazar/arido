import React, { useState, useEffect } from 'react';
import { ViewType, Language } from './types';
import { Menu } from './components/Menu';
import { ImageStudio } from './components/ImageStudio';
import { VideoStudio } from './components/VideoStudio';
import { PdfStudio } from './components/PdfStudio';
import { WordStudio } from './components/WordStudio';
import { AudioStudio } from './components/AudioStudio';
import { ConverterStudio } from './components/ConverterStudio';
import { PenOverlay } from './components/PenOverlay';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>(ViewType.MENU);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<Language>('de');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const goBack = () => setCurrentView(ViewType.MENU);

  const renderContent = () => {
    switch (currentView) {
      case ViewType.MENU:
        return <Menu onSelect={setCurrentView} language={language} />;
      case ViewType.IMAGE_STUDIO:
        return <ImageStudio />;
      case ViewType.VIDEO_EDITOR:
        return <VideoStudio />;
      case ViewType.PDF_TOOLS:
        return <PdfStudio />;
      case ViewType.WORD_PROCESSOR:
        return <WordStudio language={language} />;
      case ViewType.AUDIO_LAB:
        return <AudioStudio />;
      case ViewType.MEDIA_CONVERTER:
        return <ConverterStudio />;
      default:
        return <Menu onSelect={setCurrentView} language={language} />;
    }
  };

  const getViewTitle = () => {
    switch (currentView) {
      case ViewType.VIDEO_EDITOR: return language === 'de' ? "Video Bearbeiten" : "Video Editor";
      case ViewType.IMAGE_STUDIO: return language === 'de' ? "Bild & AI Studio" : "Image & AI Studio";
      case ViewType.PDF_TOOLS: return language === 'de' ? "PDF Werkzeuge" : "PDF Tools";
      case ViewType.WORD_PROCESSOR: return language === 'de' ? "Schreiben" : "Write";
      case ViewType.AUDIO_LAB: return "Audio Lab";
      case ViewType.MEDIA_CONVERTER: return "Media Converter";
      default: return "Creative Suite";
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${isDarkMode ? 'bg-ink-950' : 'bg-ink-50'}`}>
      {/* Navbar */}
      <header className="bg-white dark:bg-ink-900 border-b border-ink-200 dark:border-ink-800 px-6 py-4 flex items-center justify-between sticky top-0 z-50 transition-colors duration-200">
        <div className="flex items-center gap-4">
          {currentView !== ViewType.MENU && (
            <button 
              onClick={goBack}
              className="p-2 -ml-2 text-ink-500 hover:text-ink-900 hover:bg-ink-50 dark:hover:bg-ink-800 dark:hover:text-ink-100 rounded-full transition-colors"
              aria-label="Zurück"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          )}
          <h1 className="text-xl font-serif font-bold text-ink-900 dark:text-white">
            {getViewTitle()}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="flex rounded-md bg-ink-100 dark:bg-ink-800 p-1">
             <button 
               onClick={() => setLanguage('de')} 
               className={`px-3 py-1 text-xs font-bold rounded transition-colors ${language === 'de' ? 'bg-white dark:bg-ink-600 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500 dark:text-ink-400 hover:text-ink-700'}`}
             >
               DE
             </button>
             <button 
               onClick={() => setLanguage('en')} 
               className={`px-3 py-1 text-xs font-bold rounded transition-colors ${language === 'en' ? 'bg-white dark:bg-ink-600 text-ink-900 dark:text-white shadow-sm' : 'text-ink-500 dark:text-ink-400 hover:text-ink-700'}`}
             >
               EN
             </button>
          </div>

          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full text-ink-500 hover:bg-ink-100 dark:text-ink-400 dark:hover:bg-ink-800 transition-colors"
            title={isDarkMode ? "Switch to Day Mode" : "Switch to Night Mode"}
          >
            {isDarkMode ? (
              // Sun Icon
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              // Moon Icon
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          <div className="text-sm text-ink-400 font-medium hidden sm:block">v2.2</div>
        </div>
      </header>

      {/* Main Content with Pen Overlay */}
      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full transition-colors duration-200 relative">
        {renderContent()}
        <PenOverlay />
      </main>
    </div>
  );
};

export default App;
