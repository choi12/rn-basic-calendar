import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { Dayjs } from 'dayjs';

import { CalendarColors, CalendarDay, Language, MarkedDates } from '../../../../types';

export interface DayProps {
  date: CalendarDay;
  currentMonth: Dayjs;
  selectedDate: CalendarDay;
  onSelect: (date: Dayjs) => void;
  weekdayIndex: number;
  minDate?: CalendarDay;
  maxDate?: CalendarDay;
  language: Language;
  styles?: {
    containerStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    selectedStyle?: StyleProp<ViewStyle>;
    selectedTextStyle?: StyleProp<TextStyle>;
    markerStyle?: StyleProp<ViewStyle>;
    todayLabelStyle?: StyleProp<TextStyle>;
    weekendTextStyle?: StyleProp<TextStyle>;
    disabledTextStyle?: StyleProp<TextStyle>;
  };
  colors?: CalendarColors;
  markedDates?: MarkedDates;
}
