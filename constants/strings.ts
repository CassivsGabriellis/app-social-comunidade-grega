import { LANGUAGE_STRINGS } from './translations';
import { useLanguage } from '@/context/LanguageContext';

export function useStrings() {
  const { language } = useLanguage();
  return LANGUAGE_STRINGS[language];
}

export const STRINGS = LANGUAGE_STRINGS.pt;
