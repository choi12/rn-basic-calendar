import React from 'react';

import { Modal, Pressable, Text } from 'react-native';

import { Calendar } from '../Calendar';
import { defaultStyles } from './styles';
import { getContainerStyles, getOverlayStyles } from './styleUtils';
import { CalendarModalProps } from './types';

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
  const overlayStyles = getOverlayStyles(overlayOpacity, styles);
  const containerStyles = getContainerStyles(styles, colors);

  return (
    <Modal transparent visible={isVisible} animationType="fade" onRequestClose={onClose}>
      <Pressable style={overlayStyles} onPress={onClose}>
        <Pressable style={containerStyles} onPress={e => e.stopPropagation()}>
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
