import React from 'react';
import { ViewType, MenuItem, Language } from '../types';

interface MenuProps {
  onSelect: (view: ViewType) => void;
  language: Language;
}

const getMenuItems = (lang: Language): MenuItem[] => [
  {
    id: ViewType.VIDEO_EDITOR,
    title: lang === 'de' ? "Video Bearbeiten" : "Edit Video",
    description: lang === 'de' ? "Schneiden, Geschwindigkeit ändern, Ton anpassen." : "Trim, change speed, adjust audio.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: ViewType.IMAGE_STUDIO,
    title: lang === 'de' ? "Bild & AI Studio" : "Image & AI Studio",
    description: lang === 'de' ? "AI Generierung & Manuelle Bearbeitung." : "AI Generation & Manual Editing.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: ViewType.PDF_TOOLS,
    title: lang === 'de' ? "PDF Werkzeuge" : "PDF Tools",
    description: lang === 'de' ? "Zusammenfügen, Schneiden, Konvertieren." : "Merge, Split, Convert.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  },
  {
    id: ViewType.WORD_PROCESSOR,
    title: lang === 'de' ? "Schreiben" : "Write",
    description: lang === 'de' ? "Dokumente schreiben und exportieren." : "Write documents and export.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    )
  },
  {
    id: ViewType.AUDIO_LAB,
    title: "Audio Lab",
    description: lang === 'de' ? "Musik & Sprachnachrichten bearbeiten." : "Edit music & voice messages.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    )
  },
  {
    id: ViewType.MEDIA_CONVERTER,
    title: "Media Converter",
    description: lang === 'de' ? "Bild zu Video & Video zu Bild." : "Image to Video & Video to Image.",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    )
  }
];

export const Menu: React.FC<MenuProps> = ({ onSelect, language }) => {
  const items = getMenuItems(language);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item.id)}
          className="flex flex-col items-center justify-center p-8 bg-white dark:bg-ink-900 border border-ink-200 dark:border-ink-800 rounded-2xl shadow-sm hover:shadow-xl hover:border-ink-400 dark:hover:border-ink-600 hover:-translate-y-1 transition-all duration-200 group text-center h-64"
        >
          <div className="p-4 bg-ink-50 dark:bg-ink-800 rounded-full text-ink-600 dark:text-ink-300 group-hover:bg-ink-100 dark:group-hover:bg-ink-700 group-hover:text-ink-900 dark:group-hover:text-white transition-colors mb-4">
            {item.icon}
          </div>
          <h3 className="text-xl font-serif font-bold text-ink-900 dark:text-white mb-2">{item.title}</h3>
          <p className="text-sm text-ink-500 dark:text-ink-400">{item.description}</p>
        </button>
      ))}
    </div>
  );
};
