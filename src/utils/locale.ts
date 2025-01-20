import 'dayjs/locale/en';
import 'dayjs/locale/ko';
import { locale } from 'dayjs';

import { Language } from '../types';

export const setupLocale = (language: Language) => {
  locale(language);
};
