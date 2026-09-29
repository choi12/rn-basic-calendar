import dayjs, { isDayjs } from 'dayjs';

import { ERROR_MESSAGES, MARKER_REGEX } from '../../constants';
import { CalendarProps } from '../Calendar/types';

export function validateCalendarProps({
  value,
  onChange,
  minDate,
  maxDate,
  defaultValue = dayjs(),
  language = 'en',
  styles = {},
  colors = {},
  markedDates = [],
}: CalendarProps): void {
  if (!value) {
    throw new Error(`"value" ${ERROR_MESSAGES.REQUIRED}`);
  }
  if (!onChange) {
    throw new Error(`"onChange" ${ERROR_MESSAGES.REQUIRED}`);
  }

  if (!isDayjs(value)) {
    throw new Error(`"value" ${ERROR_MESSAGES.INVALID_DAYJS}`);
  }
  if (typeof onChange !== 'function') {
    throw new Error(`"onChange" ${ERROR_MESSAGES.INVALID_FUNCTION}`);
  }
  if (minDate && !isDayjs(minDate)) {
    throw new Error(`"minDate" ${ERROR_MESSAGES.INVALID_DAYJS}`);
  }
  if (maxDate && !isDayjs(maxDate)) {
    throw new Error(`"maxDate" ${ERROR_MESSAGES.INVALID_DAYJS}`);
  }
  if (defaultValue && !isDayjs(defaultValue)) {
    throw new Error(`"defaultValue" ${ERROR_MESSAGES.INVALID_DAYJS}`);
  }

  if (language && !['en', 'ko'].includes(language)) {
    throw new Error(ERROR_MESSAGES.INVALID_LANGUAGE);
  }

  if (!Array.isArray(markedDates)) {
    throw new Error(`"markedDates" ${ERROR_MESSAGES.INVALID_ARRAY}`);
  }
  // may come from server data; a bad entry just never matches a day
  if (markedDates.some(date => !MARKER_REGEX.test(date))) {
    console.warn(ERROR_MESSAGES.INVALID_MARKED_DATE_FORMAT);
  }

  if (styles && typeof styles !== 'object') {
    throw new Error(`"styles" ${ERROR_MESSAGES.INVALID_OBJECT}`);
  }
  if (colors && typeof colors !== 'object') {
    throw new Error(`"colors" ${ERROR_MESSAGES.INVALID_OBJECT}`);
  }

  // date range
  if (minDate && maxDate && minDate.isAfter(maxDate)) {
    throw new Error(ERROR_MESSAGES.INVALID_MIN_MAX);
  }
  // value can leave the range without a coding mistake (editing a past item, midnight passing)
  if (minDate && value.isBefore(minDate, 'day')) {
    console.warn(ERROR_MESSAGES.INVALID_MIN_DATE);
  }
  if (maxDate && value.isAfter(maxDate, 'day')) {
    console.warn(ERROR_MESSAGES.INVALID_MAX_DATE);
  }
}
