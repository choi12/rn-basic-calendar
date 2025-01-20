import { StyleSheet } from 'react-native';

import { COLORS } from '../../constants/colors';

export const defaultStyles = StyleSheet.create({
  content: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    overflow: 'hidden',
  },
  overlay: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    alignSelf: 'center',
    color: COLORS.DARK_BLACK,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 20,
    maxWidth: 300,
  },
});
