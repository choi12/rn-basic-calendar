import { Dayjs } from 'dayjs';

import { WEEKDAY_INDEXES } from '../constants';

export const isDateOutOfRange = (
  date: Dayjs,
  currentMonth: Dayjs,
  minDate?: Dayjs,
  maxDate?: Dayjs,
): boolean => {
  const isCurrentMonth = date.isSame(currentMonth, 'month');
  const isBeforeMinDate = minDate ? date.isBefore(minDate, 'day') : false;
  const isAfterMaxDate = maxDate ? date.isAfter(maxDate, 'day') : false;

  return !isCurrentMonth || isBeforeMinDate || isAfterMaxDate;
};

export const isMonthLimit = (currentMonth: Dayjs, boundaryDate?: Dayjs): boolean => {
  if (!boundaryDate) return false;
  return currentMonth.isSame(boundaryDate, 'month');
};

export const checkWeekend = (weekdayIndex: number): boolean => {
  return weekdayIndex === WEEKDAY_INDEXES.SUNDAY || weekdayIndex === WEEKDAY_INDEXES.SATURDAY;
};
