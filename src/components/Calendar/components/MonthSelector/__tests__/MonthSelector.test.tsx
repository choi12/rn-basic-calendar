import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';

import MonthSelector from '../';
import { MONTH_FORMAT, NAVIGATION_BUTTON_TEXT, TEST_IDS } from '../../../../../constants';
import {
  BASE_TEST_DATE,
  expectTextStyleToMatch,
  expectViewStyleToMatch,
} from '../../../../../testUtils';
import { MonthSelectorProps } from '../types';

describe('MonthSelector Component✨', () => {
  const mockPreviousMonth = jest.fn();
  const mockNextMonth = jest.fn();
  const testDate = BASE_TEST_DATE;

  const defaultProps: MonthSelectorProps = {
    selectedMonth: testDate,
    onPreviousMonth: mockPreviousMonth,
    onNextMonth: mockNextMonth,
    language: 'en',
  };

  const renderMonthSelectorComponent = (props: Partial<MonthSelectorProps> = {}) =>
    render(<MonthSelector {...defaultProps} {...props} />);

  describe('initialization', () => {
    it('renders month and navigation controls', () => {
      const { getByText } = renderMonthSelectorComponent();

      expect(getByText(testDate.format(MONTH_FORMAT.en))).toBeTruthy();
      expect(getByText(NAVIGATION_BUTTON_TEXT.PREV)).toBeTruthy();
      expect(getByText(NAVIGATION_BUTTON_TEXT.NEXT)).toBeTruthy();
    });
  });

  describe('navigation', () => {
    beforeEach(() => {
      mockPreviousMonth.mockClear();
      mockNextMonth.mockClear();
    });

    it('navigates between months', () => {
      const { getByText } = renderMonthSelectorComponent();

      fireEvent.press(getByText(NAVIGATION_BUTTON_TEXT.PREV));
      expect(mockPreviousMonth).toHaveBeenCalled();

      fireEvent.press(getByText(NAVIGATION_BUTTON_TEXT.NEXT));
      expect(mockNextMonth).toHaveBeenCalled();
    });

    it('disables navigation beyond boundaries', () => {
      const { getByTestId } = renderMonthSelectorComponent({
        minDate: testDate,
        maxDate: testDate,
      });

      const prevButton = getByTestId(TEST_IDS.MONTH_SELECTOR.PREVIOUS_BUTTON);
      const nextButton = getByTestId(TEST_IDS.MONTH_SELECTOR.NEXT_BUTTON);

      expect(prevButton).toBeDisabled();
      expect(nextButton).toBeDisabled();

      fireEvent.press(prevButton);
      fireEvent.press(nextButton);
      expect(mockPreviousMonth).not.toHaveBeenCalled();
      expect(mockNextMonth).not.toHaveBeenCalled();
    });

    it('enables navigation within valid range', () => {
      const { getByTestId } = renderMonthSelectorComponent({
        minDate: testDate.subtract(1, 'month'),
        maxDate: testDate.add(1, 'month'),
      });

      const prevButton = getByTestId(TEST_IDS.MONTH_SELECTOR.PREVIOUS_BUTTON);
      const nextButton = getByTestId(TEST_IDS.MONTH_SELECTOR.NEXT_BUTTON);

      expect(prevButton).toBeEnabled();
      expect(nextButton).toBeEnabled();

      fireEvent.press(prevButton);
      expect(mockPreviousMonth).toHaveBeenCalled();

      fireEvent.press(nextButton);
      expect(mockNextMonth).toHaveBeenCalled();
    });
  });

  describe('localization', () => {
    it('renders month name in selected language', () => {
      const { getByText, rerender } = renderMonthSelectorComponent({ language: 'en' });

      expect(getByText(testDate.format(MONTH_FORMAT.en))).toBeTruthy();

      rerender(<MonthSelector {...defaultProps} language="ko" />);

      expect(getByText(testDate.format(MONTH_FORMAT.ko))).toBeTruthy();
    });
  });

  describe('styling', () => {
    it('applies custom styles', () => {
      const customStyles = {
        containerStyle: { padding: 10 },
        buttonStyle: { padding: 20 },
        monthTextStyle: { fontSize: 15 },
        arrowStyle: { fontSize: 16 },
        disabledArrowStyle: { fontSize: 17 },
      };
      const maxDate = testDate.add(30, 'day');

      const { getByTestId, getByText } = renderMonthSelectorComponent({
        styles: customStyles,
        maxDate,
      });

      expectViewStyleToMatch(getByTestId(TEST_IDS.MONTH_SELECTOR.CONTAINER), { padding: 10 });
      expectViewStyleToMatch(getByTestId(TEST_IDS.MONTH_SELECTOR.PREVIOUS_BUTTON), { padding: 20 });
      expectTextStyleToMatch(getByText(testDate.format(MONTH_FORMAT.en)), { fontSize: 15 });
    });
  });
});
