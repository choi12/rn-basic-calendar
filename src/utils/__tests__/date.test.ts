import { BASE_TEST_DATE } from '../../testUtils';
import { isDateOutOfRange, isMonthLimit, checkWeekend } from '../date';

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

  describe('isMonthLimit()', () => {
    it('checks if dates are in same month', () => {
      expect(isMonthLimit(testDate, testDate)).toBe(true);
    });

    it('checks if dates are in different months', () => {
      expect(isMonthLimit(testDate, testDate.add(1, 'month'))).toBe(false);
    });

    it('handles comparison with undefined dates', () => {
      expect(isMonthLimit(testDate, undefined)).toBe(false);
    });
  });

  describe('checkWeekend()', () => {
    it('checks if date is weekend', () => {
      expect(checkWeekend(0)).toBe(true);
      expect(checkWeekend(6)).toBe(true);
    });

    it('checks if date is weekday', () => {
      [1, 2, 3, 4, 5].forEach(day => {
        expect(checkWeekend(day)).toBe(false);
      });
    });
  });
});
