import { CalendarModalStyles } from '../../types';
import { CalendarProps } from '../Calendar/types';

export interface CalendarModalProps extends CalendarProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  styles?: CalendarModalStyles;
  overlayOpacity?: number;
}

export type ModalValidationProps = Pick<
  CalendarModalProps,
  'isVisible' | 'onClose' | 'overlayOpacity' | 'title'
>;
