import React from 'react';

import { StyleSheet } from 'react-native';

import { render, fireEvent } from '@testing-library/react-native';
import dayjs from 'dayjs';

import Day from '../';
import { COLORS, MARKER_FORMAT, TEST_IDS, TODAY_LABEL } from '../../../../../constants';
import {
  withMockToday,
  BASE_TEST_DATE,
  expectViewStyleToMatch,
  expectTextStyleToMatch,
} from '../../../../../testUtils';
import { MarkedDates } from '../../../../../types';
import { DayProps } from '../types';

describe('Day Component✨', () => {
  const mockOnSelect = jest.fn();
  const testDate = BASE_TEST_DATE;

  const defaultProps: DayProps = {
    date: testDate,
    selectedDate: testDate,
    currentMonth: testDate,
    onSelect: mockOnSelect,
    weekdayIndex: 3,
    language: 'en',
  };

  const renderDayComponent = (props: Partial<DayProps> = {}) =>
    render(<Day {...defaultProps} {...props} />);

  describe('initialization', () => {
    it('renders date number', () => {
      const { getByText } = renderDayComponent();

      expect(getByText('1')).toBeTruthy();
    });

    it('renders date marker when provided', () => {
      const markedDates: MarkedDates = [testDate.format(MARKER_FORMAT)];
      const { getByTestId } = renderDayComponent({ markedDates });

      expectViewStyleToMatch(getByTestId(TEST_IDS.DAY.MARKER), { backgroundColor: COLORS.WHITE });
    });
  });

  describe('selection', () => {
    beforeEach(() => {
      mockOnSelect.mockClear();
    });

    it('calls onSelect on press', () => {
      const { getByTestId } = renderDayComponent();

      fireEvent.press(getByTestId(TEST_IDS.DAY.DAY_BUTTON));
      expect(mockOnSelect).toHaveBeenCalledWith(testDate);
    });

    it('disables dates outside allowed range', () => {
      const minDate = testDate.add(1, 'day');
      const maxDate = testDate.subtract(1, 'day');

      const { getByTestId: getMinDateButton } = renderDayComponent({ minDate });
      const { getByTestId: getMaxDateButton } = renderDayComponent({ maxDate });

      const beforeMinDateButton = getMinDateButton(TEST_IDS.DAY.DAY_BUTTON);
      const afterMaxDateButton = getMaxDateButton(TEST_IDS.DAY.DAY_BUTTON);

      expect(beforeMinDateButton).toBeDisabled();
      expect(afterMaxDateButton).toBeDisabled();

      fireEvent.press(beforeMinDateButton);
      fireEvent.press(afterMaxDateButton);
      expect(mockOnSelect).not.toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('labels the full date in the selected language', () => {
      const en = renderDayComponent();
      expect(en.getByTestId(TEST_IDS.DAY.DAY_BUTTON).props.accessibilityLabel).toBe(
        'January 1, 2025',
      );

      const ko = renderDayComponent({ language: 'ko' });
      expect(ko.getByTestId(TEST_IDS.DAY.DAY_BUTTON).props.accessibilityLabel).toBe(
        '2025년 1월 1일',
      );

      withMockToday(() => {
        const today = renderDayComponent({ date: dayjs(), selectedDate: dayjs() });
        expect(today.getByTestId(TEST_IDS.DAY.DAY_BUTTON).props.accessibilityLabel).toBe(
          'January 24, 2025, Today',
        );
      });
    });

    it('exposes a button with selected and disabled state', () => {
      const selected = renderDayComponent().getByTestId(TEST_IDS.DAY.DAY_BUTTON);
      expect(selected.props.accessibilityRole).toBe('button');
      expect(selected.props.accessibilityState).toEqual({ selected: true, disabled: false });

      const disabled = renderDayComponent({
        selectedDate: testDate.add(1, 'day'),
        minDate: testDate.add(1, 'day'),
      }).getByTestId(TEST_IDS.DAY.DAY_BUTTON);
      expect(disabled.props.accessibilityState).toEqual({ selected: false, disabled: true });
    });
  });

  describe('localization', () => {
    it('renders Today label in selected language', () => {
      withMockToday(() => {
        const today = dayjs();
        const { getByText, rerender } = renderDayComponent({ date: today });

        expect(getByText(TODAY_LABEL.en)).toBeTruthy();

        rerender(<Day {...defaultProps} date={today} language="ko" />);

        expect(getByText(TODAY_LABEL.ko)).toBeTruthy();
      });
    });
  });

  describe('styling', () => {
    it('applies weekend styles', () => {
      const weekendDate = dayjs('2025-01-04'); // saturday
      const { getByText } = renderDayComponent({
        date: weekendDate,
        weekdayIndex: 6,
      });

      expectTextStyleToMatch(getByText('4'), { color: COLORS.PRIMARY });
    });

    it('applies selected date styles', () => {
      const { getByText, getByTestId } = renderDayComponent();

      expectTextStyleToMatch(getByText('1'), { color: COLORS.WHITE });
      expectViewStyleToMatch(getByTestId(TEST_IDS.DAY.DAY_BUTTON), {
        backgroundColor: COLORS.PRIMARY,
      });
    });

    it('does not highlight the selected date in a cell of another month', () => {
      // Jan 1 shown as a trailing cell of December must not look selected (disabled gray on primary)
      const { getByTestId } = renderDayComponent({ currentMonth: testDate.subtract(1, 'month') });
      const button = getByTestId(TEST_IDS.DAY.DAY_BUTTON);

      expect(StyleSheet.flatten(button.props.style).backgroundColor).not.toBe(COLORS.PRIMARY);
      expect(button.props.accessibilityState).toEqual({ selected: false, disabled: true });
    });

    it('applies custom styles', () => {
      const customStyles = {
        containerStyle: { backgroundColor: 'green' },
        textStyle: { fontSize: 10 },
        todayLabelStyle: { fontSize: 12 },
      };

      withMockToday(() => {
        const { getByText, getByTestId } = renderDayComponent({
          date: dayjs(),
          styles: customStyles,
        });

        expectViewStyleToMatch(getByTestId(TEST_IDS.DAY.DAY_BUTTON), {
          backgroundColor: 'green',
        });
        expectTextStyleToMatch(getByText('24'), { fontSize: 10 });
        expectTextStyleToMatch(getByText(TODAY_LABEL.en), { fontSize: 12 });
      });
    });
  });
});
