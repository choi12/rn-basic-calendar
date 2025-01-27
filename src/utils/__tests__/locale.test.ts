import { locale } from 'dayjs';

import { Language } from 'src/types';

import { setupLocale } from '../locale';

describe('Locale Utilities✨', () => {
  describe('setupLocale()', () => {
    const locales: Language[] = ['en', 'ko'];

    locales.forEach(language => {
      it(`sets ${language} locale`, () => {
        setupLocale(language);

        expect(locale()).toBe(language);
      });
    });
  });
});
