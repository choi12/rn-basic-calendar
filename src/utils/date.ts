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

// the shown month can start outside the range (defaultValue before minDate), so block beyond the boundary too
export const isPrevMonthBlocked = (currentMonth: Dayjs, minDate?: Dayjs): boolean => {
  if (!minDate) return false;
  return !currentMonth.isAfter(minDate, 'month');
};

export const isNextMonthBlocked = (currentMonth: Dayjs, maxDate?: Dayjs): boolean => {
  if (!maxDate) return false;
  return !currentMonth.isBefore(maxDate, 'month');
};

export const checkWeekend = (weekdayIndex: number): boolean => {
  return weekdayIndex === WEEKDAY_INDEXES.SUNDAY || weekdayIndex === WEEKDAY_INDEXES.SATURDAY;
};
