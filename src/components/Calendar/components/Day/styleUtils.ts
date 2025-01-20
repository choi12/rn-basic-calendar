import { StyleProp, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { defaultStyles } from './styles';
import { COLORS } from '../../../../constants/colors';
import { CalendarColors } from '../../../../types';

export const getContainerStyles = (
  isSelected: boolean,
  styles: {
    containerStyle?: StyleProp<ViewStyle>;
    selectedStyle?: StyleProp<ViewStyle>;
  },
  colors?: CalendarColors,
) => [
  defaultStyles.container,
  styles.containerStyle,
  isSelected && [{ backgroundColor: colors?.primaryColor || COLORS.PRIMARY }, styles.selectedStyle],
];

export const getTextStyles = (
  isSelected: boolean,
  isWeekend: boolean,
  isDisabled: boolean,
  styles: {
    textStyle?: StyleProp<TextStyle>;
    selectedTextStyle?: StyleProp<TextStyle>;
    weekendTextStyle?: StyleProp<TextStyle>;
    disabledTextStyle?: StyleProp<TextStyle>;
  },
  colors?: CalendarColors,
) => [
  defaultStyles.text,
  { color: colors?.textColor || COLORS.BLACK },
  styles.textStyle,
  isWeekend && [{ color: colors?.primaryColor || COLORS.PRIMARY }, styles.weekendTextStyle],
  isSelected && [{ color: COLORS.WHITE }, styles.selectedTextStyle],
  isDisabled && [{ color: COLORS.LIGHT_GRAY }, styles.disabledTextStyle],
];

export const getTodayLabelStyles = (
  isSelected: boolean,
  styles: {
    todayLabelStyle?: StyleProp<TextStyle>;
  },
  colors?: CalendarColors,
) => [
  defaultStyles.todayLabel,
  { color: colors?.primaryColor || COLORS.PRIMARY },
  styles.todayLabelStyle,
  isSelected && { color: COLORS.WHITE },
];

export const getMarkerStyles = (
  isSelected: boolean,
  styles: { markerStyle?: StyleProp<ViewStyle> },
  colors?: CalendarColors,
) =>
  StyleSheet.flatten([
    defaultStyles.marker,
    { backgroundColor: colors?.primaryColor || COLORS.PRIMARY },
    styles.markerStyle,
    isSelected && [{ backgroundColor: COLORS.WHITE }],
  ]);
