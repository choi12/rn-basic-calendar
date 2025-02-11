import { act } from '@testing-library/react-native';
import dayjs from 'dayjs';

import { renderCalendarStateHook, withMockToday, BASE_TEST_DATE } from '../../testUtils';

describe('useCalendarState✨', () => {
  const DATE_FORMAT = 'YYYY-MM';
  const testDate = BASE_TEST_DATE;

  describe('initialization', () => {
    it('sets current date without initialDate', () => {
      withMockToday(() => {
        const today = dayjs();
        const { result } = renderCalendarStateHook();

        expect(result.current.currentMonth.format(DATE_FORMAT)).toBe(today.format(DATE_FORMAT));
      });
    });

    it('uses provided initialDate', () => {
      const { result } = renderCalendarStateHook({ initialDate: testDate });

      expect(result.current.currentMonth.format(DATE_FORMAT)).toBe(testDate.format(DATE_FORMAT));
    });
  });

  describe('navigation', () => {
    it('navigates between months', () => {
      const { result } = renderCalendarStateHook({ initialDate: testDate });

      act(() => {
        result.current.handlePrevMonth();
      });

      expect(result.current.currentMonth.format(DATE_FORMAT)).toBe(
        testDate.subtract(1, 'month').format(DATE_FORMAT),
      );

      act(() => {
        result.current.handleNextMonth();
      });

      expect(result.current.currentMonth.format(DATE_FORMAT)).toBe(testDate.format(DATE_FORMAT));
    });

    it('preserves selected date during navigation', () => {
      const { result } = renderCalendarStateHook({ initialDate: testDate });

      act(() => {
        result.current.handlePrevMonth();
      });

      expect(result.current.currentMonth.date()).toBe(1);
      expect(result.current.currentMonth.format(DATE_FORMAT)).toBe(
        testDate.subtract(1, 'month').format(DATE_FORMAT),
      );

      act(() => {
        result.current.handleNextMonth();
      });

      expect(result.current.currentMonth.date()).toBe(1);
      expect(result.current.currentMonth.format(DATE_FORMAT)).toBe(testDate.format(DATE_FORMAT));
    });
  });

  describe('year transition', () => {
    it('handles transition from January to previous month', () => {
      const { result } = renderCalendarStateHook({
        initialDate: testDate,
      });

      act(() => {
        result.current.handlePrevMonth();
      });

      expect(result.current.currentMonth.year()).toBe(testDate.year() - 1);
    });

    it('handles transition from December to next month', () => {
      const { result } = renderCalendarStateHook({
        initialDate: testDate.subtract(1, 'month'),
      });

      act(() => {
        result.current.handleNextMonth();
      });

      expect(result.current.currentMonth.year()).toBe(testDate.year());
    });
  });
});
