import { Language, Translations } from './translations';
import { PL } from './pl';
import { EN } from './en';

export const LANGUAGE: Language = 'en';

const ALL_TRANSLATIONS: Record<Language, Translations> = { pl: PL, en: EN };

export const T: Translations = ALL_TRANSLATIONS[LANGUAGE];
