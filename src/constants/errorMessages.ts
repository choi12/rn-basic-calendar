import { MARKER_FORMAT } from './calendar';

export const ERROR_MESSAGES = {
  REQUIRED: 'is required',

  INVALID_DAYJS: 'must be a valid dayjs object',
  INVALID_FUNCTION: 'must be a function',
  INVALID_BOOLEAN: 'must be a boolean',
  INVALID_STRING: 'must be a string',
  INVALID_ARRAY: 'must be an array',
  INVALID_OBJECT: 'must be an object',

  INVALID_LANGUAGE: '"language" must be either "en" or "ko',
  INVALID_MARKED_DATE_FORMAT: `"markedDates" must be in ${MARKER_FORMAT} format`,
  INVALID_OPACITY: '"overlayOpacity" must be a number between 0 and 1',

  INVALID_MIN_MAX: '"minDate" cannot be after "maxDate"',
  INVALID_MIN_DATE: '"value" cannot be before "minDate"',
  INVALID_MAX_DATE: '"value" cannot be after "maxDate"',
} as const;
