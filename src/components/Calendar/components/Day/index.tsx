import React, { memo, useCallback, useMemo } from 'react';

import { Text, View, Pressable } from 'react-native';

import dayjs from 'dayjs';

import {
  getContainerStyles,
  getMarkerStyles,
  getTextStyles,
  getTodayLabelStyles,
} from './styleUtils';
import { DayProps } from './types';
import { TODAY_LABEL } from '../../../../constants/calendar';
import { checkWeekend, isDateOutOfRange } from '../../../../utils/date';

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
  const isSelected = selectedDate && date.isSame(selectedDate, 'day');
  const isToday = date.isSame(dayjs(), 'day');
  const isWeekend = checkWeekend(weekdayIndex);
  const isDisabled = isDateOutOfRange(date, currentMonth, minDate, maxDate);
  const isMarked = useMemo(
    () => markedDates.includes(date.format('YYYY-MM-DD')),
    [date, markedDates],
  );

  const containerStyles = getContainerStyles(isSelected, styles, colors);
  const textStyles = getTextStyles(isSelected, isWeekend, isDisabled, styles, colors);
  const todayLabelStyles = getTodayLabelStyles(isSelected, styles, colors);
  const markerStyles = getMarkerStyles(isSelected, styles, colors);

  const handlePress = useCallback(() => {
    onSelect(date);
  }, [onSelect, date]);

  return (
    <Pressable style={containerStyles} onPress={handlePress} disabled={isDisabled}>
      <Text style={textStyles}>{date.date()}</Text>
      {isToday && <Text style={todayLabelStyles}>{TODAY_LABEL[language]}</Text>}
      {isMarked && <View style={markerStyles} />}
    </Pressable>
  );
}

export default memo(Day);
