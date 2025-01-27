import React, { useEffect } from 'react';

import { View } from 'react-native';

import dayjs from 'dayjs';

import { TEST_IDS } from '../../constants';
import Day from './components/Day';
import MonthSelector from './components/MonthSelector';
import WeekdayHeader from './components/WeekdayHeader';
import { defaultStyles } from './styles';
import {
  getContainerStyles,
  getDayStyles,
  getDefaultColors,
  getMonthSelectorStyles,
  getWeekdayHeaderStyles,
} from './styleUtils';
import { CalendarProps } from './types';
import useCalendar from '../../hooks/useCalendar';
import useCalendarState from '../../hooks/useCalendarState';
import { setupLocale } from '../../utils';

export function Calendar({
  value,
  onChange,
  minDate,
  maxDate,
  defaultValue = dayjs(),
  language = 'en',
  styles = {},
  colors = {},
  markedDates = [],
}: CalendarProps) {
  const { currentMonth, handlePrevMonth, handleNextMonth } = useCalendarState({
    initialDate: defaultValue,
  });
  const { calendarDays } = useCalendar({
    date: currentMonth,
  });

  const defaultColors = getDefaultColors(colors);
  const containerStyles = getContainerStyles(styles, colors);
  const monthSelectorStyles = getMonthSelectorStyles(styles);
  const weekdayHeaderStyles = getWeekdayHeaderStyles(styles);
  const dayStyles = getDayStyles(styles);

  useEffect(() => {
    setupLocale(language);
  }, [language]);

  return (
    <View style={containerStyles} testID={TEST_IDS.CALENDAR.CONTAINER}>
      <MonthSelector
        selectedMonth={currentMonth}
        onPreviousMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        minDate={minDate}
        maxDate={maxDate}
        language={language}
        styles={monthSelectorStyles}
        colors={defaultColors}
      />
      <WeekdayHeader language={language} styles={weekdayHeaderStyles} colors={defaultColors} />
      <View style={styles.daysContainerStyle} testID={TEST_IDS.CALENDAR.DAYS_CONTAINER}>
        {calendarDays.map((week, weekIndex) => (
          <View
            key={weekIndex}
            style={[defaultStyles.week, styles.weekStyle]}
            testID={TEST_IDS.CALENDAR.WEEK_CONTAINER}
          >
            {week.map((day, dayIndex) => (
              <Day
                key={dayIndex}
                date={day}
                currentMonth={currentMonth}
                selectedDate={value}
                onSelect={onChange}
                weekdayIndex={dayIndex}
                minDate={minDate}
                maxDate={maxDate}
                language={language}
                styles={dayStyles}
                colors={defaultColors}
                markedDates={markedDates}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
