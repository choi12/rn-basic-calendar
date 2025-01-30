/* eslint-disable @typescript-eslint/no-explicit-any */
import { ERROR_MESSAGES } from '../../../constants';
import { ModalValidationProps } from '../types';
import { validateModalProps } from '../validateModalProps';

describe('validateModalProps✨', () => {
  const validProps: ModalValidationProps = {
    isVisible: true,
    onClose: () => {},
    overlayOpacity: 0.4,
    title: 'Select Date',
  };

  const callValidateModalProps = (props: Partial<ModalValidationProps>) =>
    validateModalProps({ ...validProps, ...props });

  describe('required props validation', () => {
    it('throws error for missing required props', () => {
      expect(() => callValidateModalProps({ isVisible: undefined })).toThrow(
        `"isVisible" ${ERROR_MESSAGES.REQUIRED}`,
      );
      expect(() => callValidateModalProps({ onClose: undefined })).toThrow(
        `"onClose" ${ERROR_MESSAGES.REQUIRED}`,
      );
    });
  });

  describe('prop type validation', () => {
    it('throws error for invalid isVisible type', () => {
      expect(() => callValidateModalProps({ isVisible: 'true' as any })).toThrow(
        `"isVisible" ${ERROR_MESSAGES.INVALID_BOOLEAN}`,
      );
    });

    it('throws error for invalid onClose type', () => {
      expect(() => callValidateModalProps({ onClose: 'not a function' as any })).toThrow(
        `"onClose" ${ERROR_MESSAGES.INVALID_FUNCTION}`,
      );
    });

    it('throws error for invalid overlayOpacity values', () => {
      const invalidOpacityValues = [-0.1, 1.1, '0.5'];

      invalidOpacityValues.forEach(value => {
        expect(() => callValidateModalProps({ overlayOpacity: value as any })).toThrow(
          ERROR_MESSAGES.INVALID_OPACITY,
        );
      });
    });

    it('throws error for invalid title type', () => {
      expect(() => callValidateModalProps({ title: 123 as any })).toThrow(
        `"title" ${ERROR_MESSAGES.INVALID_STRING}`,
      );
    });
  });
});
