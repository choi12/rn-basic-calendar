import React from 'react';

import { render } from '@testing-library/react-native';

import WeekdayHeader from '../';
import { WEEKDAYS, COLORS, TEST_IDS, WEEKDAY_INDEXES } from '../../../../../constants';
import { expectTextStyleToMatch, expectViewStyleToMatch } from '../../../../../testUtils';
import { WeekdayHeaderProps } from '../types';

describe('WeekdayHeader Component✨', () => {
  const defaultProps: WeekdayHeaderProps = {
    language: 'en',
  };

  const renderWeekdayHeaderComponent = (props: Partial<WeekdayHeaderProps> = {}) =>
    render(<WeekdayHeader {...defaultProps} {...props} />);

  describe('initialization', () => {
    it('renders weekday labels in correct order', () => {
      const { getByText } = renderWeekdayHeaderComponent();

      WEEKDAYS.en.forEach(day => {
        expect(getByText(day)).toBeTruthy();
      });
    });
  });

  describe('localization', () => {
    it('renders weekdays in selected language', () => {
      const { getByText, rerender } = renderWeekdayHeaderComponent();

      WEEKDAYS.en.forEach(day => {
        expect(getByText(day)).toBeTruthy();
      });

      rerender(<WeekdayHeader {...defaultProps} language="ko" />);

      WEEKDAYS.ko.forEach(day => {
        expect(getByText(day)).toBeTruthy();
      });
    });
  });

  describe('styling', () => {
    it('applies weekend styles', () => {
      const { getAllByTestId } = renderWeekdayHeaderComponent();

      const weekdayTexts = getAllByTestId(TEST_IDS.WEEKDAY_HEADER.WEEKDAY_TEXT);

      expectTextStyleToMatch(weekdayTexts[WEEKDAY_INDEXES.SUNDAY], { color: COLORS.PRIMARY });
      expectTextStyleToMatch(weekdayTexts[WEEKDAY_INDEXES.SATURDAY], { color: COLORS.PRIMARY });
      expectTextStyleToMatch(weekdayTexts[WEEKDAY_INDEXES.MONDAY], { color: COLORS.BLACK });
    });

    it('applies custom styles', () => {
      const customStyles = {
        containerStyle: { padding: 30 },
        weekdayTextStyle: { fontSize: 18 },
        weekendTextStyle: { fontSize: 19 },
      };
      const { getByTestId, getAllByTestId } = renderWeekdayHeaderComponent({
        styles: customStyles,
      });

      const weekdayTexts = getAllByTestId(TEST_IDS.WEEKDAY_HEADER.WEEKDAY_TEXT);

      expectViewStyleToMatch(getByTestId(TEST_IDS.WEEKDAY_HEADER.CONTAINER), { padding: 30 });
      expectTextStyleToMatch(weekdayTexts[WEEKDAY_INDEXES.MONDAY], { fontSize: 18 });
      expectTextStyleToMatch(weekdayTexts[WEEKDAY_INDEXES.SATURDAY], { fontSize: 19 });
    });
  });
});
