import { StyleProp, TextStyle } from 'react-native';

import { defaultStyles } from './styles';
import { COLORS } from '../../../../constants/colors';
import { CalendarColors } from '../../../../types';

export const getWeekdayTextStyles = (
  isWeekend: boolean,
  styles: {
    weekdayTextStyle?: StyleProp<TextStyle>;
    weekendTextStyle?: StyleProp<TextStyle>;
  },
  colors?: CalendarColors,
) => [
  defaultStyles.weekday,
  { color: colors?.textColor || COLORS.BLACK },
  styles.weekdayTextStyle,
  isWeekend && [{ color: colors?.primaryColor || COLORS.PRIMARY }, styles.weekendTextStyle],
];
