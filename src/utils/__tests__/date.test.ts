import { WEEKDAY_INDEXES, WEEKDAY_ONLY_INDEXES } from '../../constants';
import { BASE_TEST_DATE } from '../../testUtils';
import { isDateOutOfRange, isPrevMonthBlocked, isNextMonthBlocked, checkWeekend } from '../date';

describe('Date Utilities✨', () => {
  const testDate = BASE_TEST_DATE;

  describe('isDateOutOfRange()', () => {
    const currentMonth = BASE_TEST_DATE;

    it('checks if date is outside current month', () => {
      expect(isDateOutOfRange(testDate.add(1, 'month'), currentMonth)).toBe(true);
    });

    it('checks if date is before minDate', () => {
      const minDate = testDate.add(1, 'day');
      expect(isDateOutOfRange(testDate, currentMonth, minDate)).toBe(true);
    });

    it('checks if date is after maxDate', () => {
      const maxDate = testDate.subtract(1, 'day');
      expect(isDateOutOfRange(testDate, currentMonth, undefined, maxDate)).toBe(true);
    });

    it('checks if date is within allowed range', () => {
      const minDate = testDate.subtract(1, 'day');
      const maxDate = testDate.add(1, 'day');

      expect(isDateOutOfRange(testDate, currentMonth, minDate, maxDate)).toBe(false);
    });
  });

  describe('isPrevMonthBlocked()', () => {
    it('blocks at or before the minDate month', () => {
      expect(isPrevMonthBlocked(testDate, testDate)).toBe(true);
      expect(isPrevMonthBlocked(testDate.subtract(1, 'month'), testDate)).toBe(true);
    });

    it('allows months after the minDate month or without minDate', () => {
      expect(isPrevMonthBlocked(testDate.add(1, 'month'), testDate)).toBe(false);
      expect(isPrevMonthBlocked(testDate, undefined)).toBe(false);
    });
  });

  describe('isNextMonthBlocked()', () => {
    it('blocks at or after the maxDate month', () => {
      expect(isNextMonthBlocked(testDate, testDate)).toBe(true);
      expect(isNextMonthBlocked(testDate.add(1, 'month'), testDate)).toBe(true);
    });

    it('allows months before the maxDate month or without maxDate', () => {
      expect(isNextMonthBlocked(testDate.subtract(1, 'month'), testDate)).toBe(false);
      expect(isNextMonthBlocked(testDate, undefined)).toBe(false);
    });
  });

  describe('checkWeekend()', () => {
    it('checks if date is weekend', () => {
      expect(checkWeekend(WEEKDAY_INDEXES.SUNDAY)).toBe(true);
      expect(checkWeekend(WEEKDAY_INDEXES.SATURDAY)).toBe(true);
    });

    it('checks if date is weekday', () => {
      WEEKDAY_ONLY_INDEXES.forEach(day => {
        expect(checkWeekend(day)).toBe(false);
      });
    });
  });
});
