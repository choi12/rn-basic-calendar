import { isDayjs } from 'dayjs';

import { BASE_TEST_DATE, renderCalendarHook } from '../../testUtils';

describe('useCalendar✨', () => {
  const testDate = BASE_TEST_DATE;

  describe('date generation', () => {
    it('creates dates for every day', () => {
      const { result } = renderCalendarHook({ date: testDate });

      result.current.calendarDays.forEach(week => {
        week.forEach(day => {
          expect(isDayjs(day)).toBe(true);
          expect(day.isValid()).toBe(true);
        });
      });
    });

    it('creates weeks with proper length', () => {
      const { result } = renderCalendarHook({ date: testDate });

      const weeks = result.current.calendarDays.filter(week => week?.length > 0);

      expect(weeks.length).toBeGreaterThanOrEqual(4);
      expect(weeks.length).toBeLessThanOrEqual(6);

      weeks.forEach(week => {
        expect(week).toHaveLength(7);
      });
    });
  });

  describe('calendar grid structure', () => {
    const DATE_FORMAT = 'YYYY-MM-DD';

    it('creates calendar grid for given month', () => {
      const { result } = renderCalendarHook({ date: testDate });
      const { calendarDays } = result.current;

      expect(calendarDays[0][0].format(DATE_FORMAT)).toBe(
        testDate.subtract(1, 'month').endOf('month').startOf('week').format(DATE_FORMAT),
      );
      expect(calendarDays[4][5].format(DATE_FORMAT)).toBe(
        testDate.endOf('month').format(DATE_FORMAT),
      );
    });

    it('includes dates from previous month', () => {
      const { result } = renderCalendarHook({ date: testDate });

      const firstWeek = result.current.calendarDays[0];
      const prevMonthDays = firstWeek.filter(day => day.month() !== testDate.month());

      expect(prevMonthDays).toHaveLength(3);
      expect(prevMonthDays[0].format(DATE_FORMAT)).toBe(
        testDate.subtract(1, 'month').endOf('month').startOf('week').format(DATE_FORMAT),
      );
    });

    it('includes dates from next month', () => {
      const { result } = renderCalendarHook({ date: testDate });

      const lastWeek = result.current.calendarDays[4];
      const nextMonthDays = lastWeek.filter(day => day.month() !== testDate.month());

      expect(nextMonthDays).toHaveLength(1);
      expect(nextMonthDays[0].format(DATE_FORMAT)).toBe(
        testDate.add(1, 'month').startOf('date').format(DATE_FORMAT),
      );
    });
  });
});
