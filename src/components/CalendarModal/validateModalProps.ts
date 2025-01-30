import { ModalValidationProps } from './types';
import { ERROR_MESSAGES } from '../../constants';

export function validateModalProps({
  isVisible,
  onClose,
  overlayOpacity = 0.4,
  title,
}: ModalValidationProps): void {
  if (isVisible === undefined || isVisible === null) {
    throw new Error(`"isVisible" ${ERROR_MESSAGES.REQUIRED}`);
  }
  if (!onClose) {
    throw new Error(`"onClose" ${ERROR_MESSAGES.REQUIRED}`);
  }

  if (typeof isVisible !== 'boolean') {
    throw new Error(`"isVisible" ${ERROR_MESSAGES.INVALID_BOOLEAN}`);
  }
  if (typeof onClose !== 'function') {
    throw new Error(`"onClose" ${ERROR_MESSAGES.INVALID_FUNCTION}`);
  }
  if (typeof overlayOpacity !== 'number' || overlayOpacity < 0 || overlayOpacity > 1) {
    throw new Error(ERROR_MESSAGES.INVALID_OPACITY);
  }
  if (title && typeof title !== 'string') {
    throw new Error(`"title" ${ERROR_MESSAGES.INVALID_STRING}`);
  }
}
