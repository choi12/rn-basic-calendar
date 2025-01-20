import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { Dayjs } from 'dayjs';

import { CalendarColors, CalendarDay, Language } from '../../../../types';

export interface MonthSelectorProps {
  selectedMonth: Dayjs;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  minDate?: CalendarDay;
  maxDate?: CalendarDay;
  language: Language;
  styles?: {
    containerStyle?: StyleProp<ViewStyle>;
    buttonStyle?: StyleProp<ViewStyle>;
    monthTextStyle?: StyleProp<TextStyle>;
    arrowStyle?: StyleProp<TextStyle>;
    disabledArrowStyle?: StyleProp<TextStyle>;
  };
  colors?: CalendarColors;
}
