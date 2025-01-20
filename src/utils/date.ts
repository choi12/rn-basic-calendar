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

export const isMonthOutOfRange = (selectedMonth: Dayjs, date?: Dayjs): boolean => {
  if (!date) return false;
  return selectedMonth.isSame(date, 'month');
};

export const checkWeekend = (weekdayIndex: number): boolean => {
  return weekdayIndex === 0 || weekdayIndex === 6;
};
