import { Dayjs } from 'dayjs';

export type Language = 'en' | 'ko';

export type CalendarDay = Dayjs;
export type CalendarDays = CalendarDay[][];

export type MarkedDate = string;
export type MarkedDates = MarkedDate[];
