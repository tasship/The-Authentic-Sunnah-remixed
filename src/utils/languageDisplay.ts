import { TranslationDisplay } from '../types';

export interface LanguageDisplayFlags {
  showEnglish: boolean;
  showUrdu: boolean;
  showRomanUrdu: boolean;
}

export function getLanguageFlags(display: TranslationDisplay): LanguageDisplayFlags {
  return {
    showEnglish: display === 'english' || display === 'both',
    showUrdu: display === 'urdu' || display === 'both',
    showRomanUrdu: display === 'roman_urdu',
  };
}
