import { CalendarModalStyles } from '../../types';
import { CalendarProps } from '../Calendar/types';

export interface CalendarModalProps extends CalendarProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  styles?: CalendarModalStyles;
  overlayOpacity?: number;
}
