import React, { memo, useCallback, useMemo } from 'react';

import { Text, View, Pressable } from 'react-native';

import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import {
  getContainerStyles,
  getMarkerStyles,
  getTextStyles,
  getTodayLabelStyles,
} from './styleUtils';
import { DayProps } from './types';
import { DAY_LABEL_FORMAT, MARKER_FORMAT, TEST_IDS, TODAY_LABEL } from '../../../../constants';
import { checkWeekend, isDateOutOfRange } from '../../../../utils';

function Day({
  date,
  selectedDate,
  currentMonth,
  onSelect,
  weekdayIndex,
  minDate,
  maxDate,
  language,
  styles = {},
  colors,
  markedDates = [],
}: DayProps) {
  // a leading/trailing cell of another month is disabled, so it never shows as selected
  const isSelected =
    selectedDate && date.isSame(selectedDate, 'day') && date.isSame(currentMonth, 'month');
  const isToday = date.isSame(dayjs(), 'day');
  const isWeekend = checkWeekend(weekdayIndex);
  const isDisabled = isDateOutOfRange(date, currentMonth, minDate, maxDate);
  const isMarked = useMemo(
    () => markedDates.includes(date.format(MARKER_FORMAT)),
    [date, markedDates],
  );

  const containerStyles = getContainerStyles(isSelected, styles, colors);
  const textStyles = getTextStyles(isSelected, isWeekend, isDisabled, styles, colors);
  const todayLabelStyles = getTodayLabelStyles(isSelected, styles, colors);
  const markerStyles = getMarkerStyles(isSelected, styles, colors);

  const dateLabel = date.locale(language).format(DAY_LABEL_FORMAT[language]);
  const accessibilityLabel = isToday ? `${dateLabel}, ${TODAY_LABEL[language]}` : dateLabel;

  const handlePress = useCallback(() => {
    onSelect(date);
  }, [onSelect, date]);

  return (
    <Pressable
      style={containerStyles}
      onPress={handlePress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected: !!isSelected, disabled: isDisabled }}
      testID={TEST_IDS.DAY.DAY_BUTTON}
    >
      <Text style={textStyles}>{date.date()}</Text>
      {isToday && <Text style={todayLabelStyles}>{TODAY_LABEL[language]}</Text>}
      {isMarked && <View style={markerStyles} testID={TEST_IDS.DAY.MARKER} />}
    </Pressable>
  );
}

export default memo(Day);
