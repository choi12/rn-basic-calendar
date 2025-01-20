import { StyleSheet } from 'react-native';

import { COLORS } from '../../../../constants/colors';

export const defaultStyles = StyleSheet.create({
  container: {
    borderBottomColor: COLORS.GRAY,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingVertical: 10,
  },
  weekday: {
    fontSize: 11,
    textAlign: 'center',
    width: 40,
  },
});
