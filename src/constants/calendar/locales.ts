import { Language } from '../../types';

export const WEEKDAYS: Record<Language, string[]> = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ko: ['일', '월', '화', '수', '목', '금', '토'],
};

export const MONTH_FORMAT: Record<Language, string> = {
  en: 'MMMM YYYY',
  ko: 'YYYY년 M월',
};

export const TODAY_LABEL: Record<Language, string> = {
  en: 'Today',
  ko: '오늘',
};

export const DAY_LABEL_FORMAT: Record<Language, string> = {
  en: 'MMMM D, YYYY',
  ko: 'YYYY년 M월 D일',
};

export const NAVIGATION_LABEL: Record<Language, { PREV: string; NEXT: string }> = {
  en: { PREV: 'Previous month', NEXT: 'Next month' },
  ko: { PREV: '이전 달', NEXT: '다음 달' },
};
