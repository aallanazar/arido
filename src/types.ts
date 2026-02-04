export enum ModelName {
  EDIT_MODEL = 'gemini-2.5-flash-image',
}

export interface GenerationState {
  isLoading: boolean;
  error: string | null;
  resultImage: string | null;
}

export type Language = 'de' | 'en';

export enum ViewType {
  MENU = 'MENU',
  VIDEO_EDITOR = 'VIDEO_EDITOR',
  IMAGE_STUDIO = 'IMAGE_STUDIO',
  PDF_TOOLS = 'PDF_TOOLS',
  WORD_PROCESSOR = 'WORD_PROCESSOR',
  AUDIO_LAB = 'AUDIO_LAB',
  MEDIA_CONVERTER = 'MEDIA_CONVERTER',
}

export interface MenuItem {
  id: ViewType;
  title: string;
  icon: React.ReactNode;
  description: string;
}
