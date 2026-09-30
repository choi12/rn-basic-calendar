import React from 'react';

import { render, fireEvent } from '@testing-library/react-native';

import { CalendarModal } from '../';
import { TEST_IDS } from '../../../constants';
import { BASE_TEST_DATE, expectTextStyleToMatch, expectViewStyleToMatch } from '../../../testUtils';
import { CalendarModalProps } from '../types';

describe('CalendarModal Component✨', () => {
  const mockOnChange = jest.fn();
  const mockOnClose = jest.fn();
  const testDate = BASE_TEST_DATE;

  const defaultProps: CalendarModalProps = {
    isVisible: true,
    value: testDate,
    defaultValue: testDate,
    onChange: mockOnChange,
    onClose: mockOnClose,
  };

  const renderCalendarModalComponent = (props: Partial<CalendarModalProps> = {}) =>
    render(<CalendarModal {...defaultProps} {...props} />);

  describe('initialization', () => {
    it('shows/hides based on isVisible prop', () => {
      const { queryByTestId, getByTestId, rerender } = renderCalendarModalComponent({
        isVisible: false,
      });

      // React Native's Modal mock renders nothing while hidden, so the host element is absent
      expect(queryByTestId(TEST_IDS.CALENDAR_MODAL.MODAL)).toBeNull();

      rerender(<CalendarModal {...defaultProps} isVisible={true} />);

      expect(getByTestId(TEST_IDS.CALENDAR_MODAL.MODAL).props.visible).toBe(true);
    });

    it('renders provided title', () => {
      const title = 'Select Date';
      const { getByText } = renderCalendarModalComponent({ title });

      expect(getByText(title)).toBeTruthy();
    });
  });

  describe('interactions', () => {
    beforeEach(() => {
      mockOnChange.mockClear();
      mockOnClose.mockClear();
    });

    it('closes on overlay press', () => {
      const { getByTestId } = renderCalendarModalComponent();

      fireEvent.press(getByTestId(TEST_IDS.CALENDAR_MODAL.OVERLAY));
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('prevents event bubbling from container', () => {
      const { getByTestId } = renderCalendarModalComponent();

      fireEvent.press(getByTestId(TEST_IDS.CALENDAR_MODAL.CONTAINER));
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('calls onChange with selected date', () => {
      const { getByText } = renderCalendarModalComponent();

      fireEvent.press(getByText('10'));
      expect(mockOnChange).toHaveBeenCalledWith(testDate.set('date', 10));
    });
  });

  describe('accessibility', () => {
    it('keeps day cells reachable by not grouping them into the overlay', () => {
      const { getByTestId } = renderCalendarModalComponent();

      expect(getByTestId(TEST_IDS.CALENDAR_MODAL.OVERLAY).props.accessible).toBe(false);
      expect(getByTestId(TEST_IDS.CALENDAR_MODAL.CONTAINER).props.accessible).toBe(false);
    });

    it('closes on the screen reader escape gesture', () => {
      mockOnClose.mockClear();
      const { getByTestId } = renderCalendarModalComponent();

      fireEvent(getByTestId(TEST_IDS.CALENDAR_MODAL.CONTAINER), 'accessibilityEscape');
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('styling', () => {
    it('applies overlay opacity', () => {
      const { getByTestId } = renderCalendarModalComponent({ overlayOpacity: 0.8 });

      expectViewStyleToMatch(getByTestId(TEST_IDS.CALENDAR_MODAL.OVERLAY), {
        backgroundColor: `rgba(0, 0, 0, 0.8)`,
      });
    });

    it('applies custom styles', () => {
      const customStyles = {
        modalOverlayStyle: { backgroundColor: 'red' },
        modalContainerStyle: { backgroundColor: 'orange' },
        modalTitleStyle: { fontSize: 40 },
      };
      const title = 'Select Date';

      const { getByTestId, getByText } = renderCalendarModalComponent({
        styles: customStyles,
        title,
      });

      expectViewStyleToMatch(getByTestId(TEST_IDS.CALENDAR_MODAL.OVERLAY), {
        backgroundColor: 'red',
      });
      expectViewStyleToMatch(getByTestId(TEST_IDS.CALENDAR_MODAL.CONTAINER), {
        backgroundColor: 'orange',
      });
      expectTextStyleToMatch(getByText(title), { fontSize: 40 });
    });
  });
});
