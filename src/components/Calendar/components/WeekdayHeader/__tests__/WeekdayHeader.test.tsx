import React from 'react';

import { render } from '@testing-library/react-native';

import WeekdayHeader from '../';
import { WEEKDAYS, COLORS, TEST_IDS } from '../../../../../constants';
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

      const texts = getAllByTestId(TEST_IDS.WEEKDAY_HEADER.WEEKDAY_TEXT);

      expectTextStyleToMatch(texts[0], { color: COLORS.PRIMARY }); // sunday
      expectTextStyleToMatch(texts[6], { color: COLORS.PRIMARY }); // saturday
      expectTextStyleToMatch(texts[1], { color: COLORS.BLACK }); // weekday
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

      const texts = getAllByTestId(TEST_IDS.WEEKDAY_HEADER.WEEKDAY_TEXT);

      expectViewStyleToMatch(getByTestId(TEST_IDS.WEEKDAY_HEADER.CONTAINER), { padding: 30 });
      expectTextStyleToMatch(texts[1], { fontSize: 18 }); // weekday
      expectTextStyleToMatch(texts[0], { fontSize: 19 }); // weekend
    });
  });
});
