import React from 'react';

import { Modal, Pressable, Text } from 'react-native';

import { TEST_IDS } from '../../constants';
import { Calendar } from '../Calendar';
import { defaultStyles } from './styles';
import { getContainerStyles, getOverlayStyles } from './styleUtils';
import { CalendarModalProps } from './types';
import { validateModalProps } from './validateModalProps';

export function CalendarModal({
  isVisible,
  onClose,
  value,
  onChange,
  minDate,
  maxDate,
  title,
  styles = {},
  colors = {},
  language,
  defaultValue,
  overlayOpacity = 0.4,
  markedDates = [],
}: CalendarModalProps) {
  validateModalProps({
    isVisible,
    onClose,
    overlayOpacity,
    title,
  });

  const overlayStyles = getOverlayStyles(overlayOpacity, styles);
  const containerStyles = getContainerStyles(styles, colors);

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="fade"
      onRequestClose={onClose}
      testID={TEST_IDS.CALENDAR_MODAL.MODAL}
    >
      <Pressable style={overlayStyles} onPress={onClose} testID={TEST_IDS.CALENDAR_MODAL.OVERLAY}>
        <Pressable
          style={containerStyles}
          onPress={() => {}}
          testID={TEST_IDS.CALENDAR_MODAL.CONTAINER}
        >
          {title && <Text style={[defaultStyles.title, styles.modalTitleStyle]}>{title}</Text>}
          <Calendar
            value={value}
            onChange={onChange}
            minDate={minDate}
            maxDate={maxDate}
            language={language}
            defaultValue={defaultValue}
            styles={styles}
            colors={colors}
            markedDates={markedDates}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}
