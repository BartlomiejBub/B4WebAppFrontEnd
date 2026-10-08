import { Language, Translations } from './translations';
import { PL } from './pl';
import { EN } from './en';

// ===== JĘZYK STRONY: zmień na 'pl' albo 'en' =====
export const LANGUAGE: Language = 'en';

const ALL_TRANSLATIONS: Record<Language, Translations> = { pl: PL, en: EN };

// Teksty w wybranym języku - w komponentach: public t = T; w szablonach: {{ t.nav.home }}
export const T: Translations = ALL_TRANSLATIONS[LANGUAGE];
