import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';
import dayjs from 'dayjs';

import { Calendar } from '../';
import { MARKER_FORMAT, MONTH_FORMAT, TEST_IDS } from '../../../constants';
import {
  withMockToday,
  expectViewStyleToMatch,
  expectTextStyleToMatch,
  BASE_TEST_DATE,
} from '../../../testUtils';
import { MarkedDates, CalendarColors } from '../../../types';
import { CalendarProps } from '../types';

describe('Calendar Component✨', () => {
  const mockOnChange = jest.fn();
  const testDate = BASE_TEST_DATE;

  const defaultProps: CalendarProps = {
    value: testDate,
    onChange: mockOnChange,
  };

  const renderCalendarComponent = (props: Partial<CalendarProps> = {}) =>
    render(<Calendar {...defaultProps} {...props} />);

  describe('initialization', () => {
    it('renders calendar with initial date', () => {
      const { getByText, getByTestId } = renderCalendarComponent();

      expect(getByTestId(TEST_IDS.CALENDAR.CONTAINER)).toBeTruthy();
      expect(getByText(testDate.format(MONTH_FORMAT.en))).toBeTruthy();
    });

    it('renders current date without defaultValue', () => {
      withMockToday(() => {
        const today = dayjs();
        const { getByText } = renderCalendarComponent();

        expect(getByText(today.format(MONTH_FORMAT.en))).toBeTruthy();
      });
    });

    it('renders February in leap year', () => {
      const leapYearDate = dayjs('2024-02-01');
      const { getAllByText } = renderCalendarComponent({ value: leapYearDate });

      expect(getAllByText('29')[1]).toBeTruthy();
    });
  });

  describe('date selection', () => {
    beforeEach(() => {
      mockOnChange.mockClear();
    });

    it('handles date selection', () => {
      const { getByText } = renderCalendarComponent();

      fireEvent.press(getByText('10'));
      expect(mockOnChange).toHaveBeenCalledWith(testDate.set('date', 10));
    });

    it('allows selection only within min/max range', () => {
      const minDate = testDate.add(4, 'day'); // 2025-01-05
      const maxDate = testDate.add(14, 'day'); // 2025-01-15
      const { getByText } = renderCalendarComponent({ minDate, maxDate });

      fireEvent.press(getByText('4')); // before minDate
      expect(mockOnChange).not.toHaveBeenCalled();

      fireEvent.press(getByText('16')); // after maxDate
      expect(mockOnChange).not.toHaveBeenCalled();

      fireEvent.press(getByText('10')); // within range
      expect(mockOnChange).toHaveBeenCalledWith(testDate.set('date', 10));
    });
  });

  describe('navigation', () => {
    it('navigates between months', () => {
      const { getByTestId, getByText } = renderCalendarComponent();

      const prevButton = getByTestId(TEST_IDS.MONTH_SELECTOR.PREVIOUS_BUTTON);
      const nextButton = getByTestId(TEST_IDS.MONTH_SELECTOR.NEXT_BUTTON);

      fireEvent.press(prevButton);
      expect(getByText(testDate.subtract(1, 'month').format(MONTH_FORMAT.en))).toBeTruthy();

      fireEvent.press(nextButton);
      expect(getByText(testDate.format(MONTH_FORMAT.en))).toBeTruthy();
    });

    it('prevents navigation beyond boundaries', () => {
      const { getByText, getByTestId } = renderCalendarComponent({
        minDate: testDate,
        maxDate: testDate,
      });

      const prevButton = getByTestId(TEST_IDS.MONTH_SELECTOR.PREVIOUS_BUTTON);
      const nextButton = getByTestId(TEST_IDS.MONTH_SELECTOR.NEXT_BUTTON);

      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeDisabled();

      fireEvent.press(prevButton);
      expect(getByText(testDate.format(MONTH_FORMAT.en))).toBeTruthy();

      fireEvent.press(nextButton);
      expect(getByText(testDate.format(MONTH_FORMAT.en))).toBeTruthy();
    });
  });

  describe('markers', () => {
    it('renders date markers', () => {
      const markedDates: MarkedDates = [
        testDate.format(MARKER_FORMAT),
        testDate.add(1, 'day').format(MARKER_FORMAT),
      ];
      const { getAllByTestId } = renderCalendarComponent({ markedDates });

      expect(getAllByTestId(TEST_IDS.DAY.MARKER)).toHaveLength(2);
    });

    it('renders without markers', () => {
      const { queryAllByTestId } = renderCalendarComponent({ markedDates: [] });

      expect(queryAllByTestId(TEST_IDS.DAY.MARKER)).toHaveLength(0);
    });
  });

  describe('styling', () => {
    it('applies container and layout styles', () => {
      const customStyles = {
        containerStyle: { backgroundColor: 'red' },
        daysContainerStyle: { backgroundColor: 'orange' },
        weekStyle: { backgroundColor: 'yellow' },
      };
      const { getByTestId, getAllByTestId } = renderCalendarComponent({ styles: customStyles });

      expectViewStyleToMatch(getByTestId(TEST_IDS.CALENDAR.CONTAINER), {
        backgroundColor: 'red',
      });
      expectViewStyleToMatch(getByTestId(TEST_IDS.CALENDAR.DAYS_CONTAINER), {
        backgroundColor: 'orange',
      });
      expectViewStyleToMatch(getAllByTestId(TEST_IDS.CALENDAR.WEEK_CONTAINER)[0], {
        backgroundColor: 'yellow',
      });
    });

    it('applies color theme styles', () => {
      const customColors: CalendarColors = {
        primaryColor: 'red',
        backgroundColor: 'orange',
        textColor: 'yellow',
      };
      const { getByTestId, getAllByTestId, getByText } = renderCalendarComponent({
        colors: customColors,
      });

      // primaryColor
      expectTextStyleToMatch(getByText(testDate.format(MONTH_FORMAT.en)), { color: 'red' });
      expectTextStyleToMatch(getByTestId(TEST_IDS.MONTH_SELECTOR.PREVIOUS_BUTTON_TEXT), {
        color: 'red',
      });
      expectTextStyleToMatch(getByTestId(TEST_IDS.MONTH_SELECTOR.NEXT_BUTTON_TEXT), {
        color: 'red',
      });

      const weekdayTexts = getAllByTestId(TEST_IDS.WEEKDAY_HEADER.WEEKDAY_TEXT);
      expectTextStyleToMatch(weekdayTexts[0], { color: 'red' });
      expectTextStyleToMatch(weekdayTexts[6], { color: 'red' });

      expectViewStyleToMatch(getAllByTestId(TEST_IDS.DAY.DAY_BUTTON)[3], {
        backgroundColor: 'red',
      }); // selected date

      // backgroundColor
      expectViewStyleToMatch(getByTestId(TEST_IDS.CALENDAR.CONTAINER), {
        backgroundColor: 'orange',
      });

      // textColor
      expectTextStyleToMatch(weekdayTexts[1], { color: 'yellow' });
      expectTextStyleToMatch(getByText('10'), { color: 'yellow' });
    });
  });
});
