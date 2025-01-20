import { Language } from '../types';

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
