import { StyleProp, ViewStyle } from 'react-native';

import { defaultStyles } from './styles';
import { COLORS } from '../../constants';
import { CalendarColors } from '../../types';

export const getOverlayStyles = (
  overlayOpacity: number,
  styles?: {
    modalOverlayStyle?: StyleProp<ViewStyle>;
  },
) => [
  defaultStyles.overlay,
  { backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` },
  styles?.modalOverlayStyle,
];

export const getContainerStyles = (
  styles: {
    modalContainerStyle?: StyleProp<ViewStyle>;
  },
  colors?: CalendarColors,
) => [
  defaultStyles.content,
  { backgroundColor: colors?.backgroundColor || COLORS.WHITE },
  styles.modalContainerStyle,
];
