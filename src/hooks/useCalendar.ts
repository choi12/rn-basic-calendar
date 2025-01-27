import { useMemo } from 'react';

import dayjs, { Dayjs } from 'dayjs';

import { CalendarDays } from '../types';

export interface UseCalendarProps {
  date: Dayjs;
}

function useCalendar({ date }: UseCalendarProps) {
  const calendarDays: CalendarDays = useMemo(() => {
    // 1. Fill in days from previous month
    const firstWeekdayOfMonth = date.startOf('month').day();
    const prevMonthDays = Array.from({ length: firstWeekdayOfMonth }, (_, i) =>
      date.startOf('month').subtract(firstWeekdayOfMonth - i, 'day'),
    );

    // 2. Generate current month dates
    const lastDateOfMonth = date.endOf('month').date();
    const currentMonth = date.format('YYYY-MM');
    const currentMonthDays = Array.from({ length: lastDateOfMonth }, (_, index) => {
      const day = index + 1;
      return dayjs(`${currentMonth}-${day}`);
    });

    // 3. Fill in days from next month
    const lastWeekdayOfMonth = date.endOf('month').day();
    const remainingDays = 6 - lastWeekdayOfMonth;
    const nextMonthDays = Array.from({ length: remainingDays }, (_, i) =>
      date.endOf('month').add(i + 1, 'day'),
    );

    // 4. Combine all arrays
    const allDays = [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];

    // 5. Split into 6 weeks
    return Array.from({ length: 6 }, (_, index) => allDays.slice(index * 7, (index + 1) * 7));
  }, [date]);

  return { calendarDays };
}

export default useCalendar;
