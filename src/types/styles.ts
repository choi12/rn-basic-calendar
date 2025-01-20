import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface CalendarStyles {
  // Calendar container styles
  containerStyle?: StyleProp<ViewStyle>;
  daysContainerStyle?: StyleProp<ViewStyle>;
  weekStyle?: StyleProp<ViewStyle>;

  // Day styles
  dayContainerStyle?: StyleProp<ViewStyle>;
  dayTextStyle?: StyleProp<TextStyle>;
  selectedDayStyle?: StyleProp<ViewStyle>;
  selectedDayTextStyle?: StyleProp<TextStyle>;
  todayLabelStyle?: StyleProp<TextStyle>;
  weekendDayTextStyle?: StyleProp<TextStyle>;
  disabledDayTextStyle?: StyleProp<TextStyle>;

  // Month selector styles
  monthSelectorContainerStyle?: StyleProp<ViewStyle>;
  monthSelectorButtonStyle?: StyleProp<ViewStyle>;
  monthTextStyle?: StyleProp<TextStyle>;
  arrowStyle?: StyleProp<TextStyle>;
  disabledArrowStyle?: StyleProp<TextStyle>;

  // Weekday header styles
  weekdayHeaderContainerStyle?: StyleProp<ViewStyle>;
  weekdayTextStyle?: StyleProp<TextStyle>;
  weekendHeaderTextStyle?: StyleProp<TextStyle>;
}

export interface CalendarModalStyles extends CalendarStyles {
  modalOverlayStyle?: StyleProp<ViewStyle>;
  modalContainerStyle?: StyleProp<ViewStyle>;
  modalTitleStyle?: StyleProp<TextStyle>;
}
