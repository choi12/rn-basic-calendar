import { Dayjs } from 'dayjs';

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
  return weekdayIndex === 0 || weekdayIndex === 6;
};
