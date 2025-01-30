/* eslint-disable @typescript-eslint/no-explicit-any */
import { ERROR_MESSAGES } from '../../../constants';
import { BASE_TEST_DATE } from '../../../testUtils';
import { CalendarProps } from '../types';
import { validateCalendarProps } from '../validateCalendarProps';

describe('validateCalendarProps✨', () => {
  const testDate = BASE_TEST_DATE;
  const validProps: CalendarProps = {
    value: testDate,
    onChange: () => {},
    minDate: undefined,
    maxDate: undefined,
    defaultValue: testDate,
    language: 'en',
    styles: {},
    colors: {},
    markedDates: [],
  };

  const callValidateCalendarProps = (props: Partial<CalendarProps>) =>
    validateCalendarProps({ ...validProps, ...props });

  describe('required props validation', () => {
    it('throws error for missing required props', () => {
      expect(() => callValidateCalendarProps({ value: undefined })).toThrow(
        `"value" ${ERROR_MESSAGES.REQUIRED}`,
      );
      expect(() => callValidateCalendarProps({ onChange: undefined })).toThrow(
        `"onChange" ${ERROR_MESSAGES.REQUIRED}`,
      );
    });
  });

  describe('prop type validation', () => {
    const dateText = '2025-01-01' as any;

    it('throws error for invalid value type', () => {
      expect(() => callValidateCalendarProps({ value: dateText })).toThrow(
        `"value" ${ERROR_MESSAGES.INVALID_DAYJS}`,
      );
    });

    it('throws error for invalid defaultValue type', () => {
      expect(() => callValidateCalendarProps({ defaultValue: dateText })).toThrow(
        `"defaultValue" ${ERROR_MESSAGES.INVALID_DAYJS}`,
      );
    });

    it('throws error for invalid onChange type', () => {
      expect(() => callValidateCalendarProps({ onChange: 'not a function' as any })).toThrow(
        `"onChange" ${ERROR_MESSAGES.INVALID_FUNCTION}`,
      );
    });

    it('throws error for invalid language type', () => {
      expect(() => callValidateCalendarProps({ language: 'english' as any })).toThrow(
        ERROR_MESSAGES.INVALID_LANGUAGE,
      );
    });

    it('throws error for invalid minDate type', () => {
      expect(() => callValidateCalendarProps({ minDate: dateText })).toThrow(
        `"minDate" ${ERROR_MESSAGES.INVALID_DAYJS}`,
      );
    });

    it('throws error for invalid maxDate type', () => {
      expect(() => callValidateCalendarProps({ maxDate: dateText })).toThrow(
        `"maxDate" ${ERROR_MESSAGES.INVALID_DAYJS}`,
      );
    });

    it('throws error for invalid markedDates type', () => {
      expect(() => callValidateCalendarProps({ markedDates: 'not an array' as any })).toThrow(
        `"markedDates" ${ERROR_MESSAGES.INVALID_ARRAY}`,
      );
    });

    it('throws error for invalid marked date format', () => {
      expect(() => callValidateCalendarProps({ markedDates: ['2025/01/01'] })).toThrow(
        ERROR_MESSAGES.INVALID_MARKED_DATE_FORMAT,
      );
    });
  });

  describe('style validation', () => {
    it('throws error for invalid styles type', () => {
      expect(() => callValidateCalendarProps({ styles: 'not an object' as any })).toThrow(
        `"styles" ${ERROR_MESSAGES.INVALID_OBJECT}`,
      );
    });

    it('throws error for invalid colors type', () => {
      expect(() => callValidateCalendarProps({ colors: 'not an object' as any })).toThrow(
        `"colors" ${ERROR_MESSAGES.INVALID_OBJECT}`,
      );
    });
  });

  describe('date range validation', () => {
    const minDate = testDate.add(1, 'month');
    const maxDate = testDate.subtract(1, 'month');

    it('throws error for invalid min/max date combination', () => {
      expect(() => callValidateCalendarProps({ minDate, maxDate })).toThrow(
        ERROR_MESSAGES.INVALID_MIN_MAX,
      );
    });

    it('throws error for invalid minDate', () => {
      const minDate = testDate.add(1, 'month');
      expect(() => callValidateCalendarProps({ minDate })).toThrow(ERROR_MESSAGES.INVALID_MIN_DATE);
    });

    it('throws error for invalid maxDate', () => {
      expect(() => callValidateCalendarProps({ maxDate })).toThrow(ERROR_MESSAGES.INVALID_MAX_DATE);
    });
  });
});
