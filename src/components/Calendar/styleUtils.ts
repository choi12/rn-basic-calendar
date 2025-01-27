import { StyleProp, ViewStyle } from 'react-native';

import { defaultStyles } from './styles';
import { COLORS } from '../../constants';
import { CalendarColors, CalendarStyles } from '../../types';

export const getDefaultColors = (colors: CalendarColors = {}) => ({
  primaryColor: COLORS.PRIMARY,
  backgroundColor: COLORS.WHITE,
  textColor: COLORS.BLACK,
  ...colors,
});

export const getContainerStyles = (
  styles: {
    containerStyle?: StyleProp<ViewStyle>;
  },
  colors?: CalendarColors,
) => [
  defaultStyles.container,
  { backgroundColor: colors?.backgroundColor || COLORS.WHITE },
  styles.containerStyle,
];

export const getMonthSelectorStyles = (styles: CalendarStyles = {}) => ({
  containerStyle: styles.monthSelectorContainerStyle,
  buttonStyle: styles.monthSelectorButtonStyle,
  monthTextStyle: styles.monthTextStyle,
  arrowStyle: styles.arrowStyle,
  disabledArrowStyle: styles.disabledArrowStyle,
});

export const getWeekdayHeaderStyles = (styles: CalendarStyles = {}) => ({
  containerStyle: styles.weekdayHeaderContainerStyle,
  weekdayTextStyle: styles.weekdayTextStyle,
  weekendTextStyle: styles.weekendHeaderTextStyle,
});

export const getDayStyles = (styles: CalendarStyles = {}) => ({
  containerStyle: styles.dayContainerStyle,
  textStyle: styles.dayTextStyle,
  selectedStyle: styles.selectedDayStyle,
  selectedTextStyle: styles.selectedDayTextStyle,
  todayLabelStyle: styles.todayLabelStyle,
  weekendTextStyle: styles.weekendDayTextStyle,
  disabledTextStyle: styles.disabledDayTextStyle,
});
