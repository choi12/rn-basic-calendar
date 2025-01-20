import { StyleProp, TextStyle } from 'react-native';

import { defaultStyles } from './styles';
import { COLORS } from '../../../../constants/colors';
import { CalendarColors } from '../../../../types';

export const getArrowStyles = (
  isDisabled: boolean,
  styles: {
    arrowStyle?: StyleProp<TextStyle>;
    disabledArrowStyle?: StyleProp<TextStyle>;
  },
  colors?: CalendarColors,
) => [
  defaultStyles.arrow,
  { color: colors?.primaryColor || COLORS.PRIMARY },
  styles.arrowStyle,
  isDisabled && [{ color: COLORS.LIGHT_GRAY }, styles.disabledArrowStyle],
];

export const getMonthTextStyles = (
  styles: {
    monthTextStyle?: StyleProp<TextStyle>;
  },
  colors?: CalendarColors,
) => [
  defaultStyles.monthText,
  { color: colors?.primaryColor || COLORS.PRIMARY },
  styles.monthTextStyle,
];
