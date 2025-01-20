import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import { CalendarColors, Language } from '../../../../types';

export interface WeekdayHeaderProps {
  language: Language;
  styles?: {
    containerStyle?: StyleProp<ViewStyle>;
    weekdayTextStyle?: StyleProp<TextStyle>;
    weekendTextStyle?: StyleProp<TextStyle>;
  };
  colors?: CalendarColors;
}
