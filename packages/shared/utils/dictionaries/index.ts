import fr from './fr/fr';
import en from './en/en';
import de from './de/de';
import es from './es/es';
import { Languages, TLanguages } from '../../types';

export const dictionaries: Record<TLanguages, string[]> = {
  [Languages.FR]: fr, [Languages.DE]: de, [Languages.EN]: en, [Languages.ES]: es,
};
