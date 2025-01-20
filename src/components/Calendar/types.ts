import { CalendarColors, CalendarDay, CalendarStyles, Language, MarkedDates } from '../../types';

export interface CalendarProps {
  value: CalendarDay;
  onChange: (date: CalendarDay) => void;
  minDate?: CalendarDay;
  maxDate?: CalendarDay;
  defaultValue?: CalendarDay;
  language?: Language;
  styles?: CalendarStyles;
  colors?: CalendarColors;
  markedDates?: MarkedDates;
}
