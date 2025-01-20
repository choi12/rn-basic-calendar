import { StyleSheet } from 'react-native';

export const defaultStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    minHeight: 40,
    minWidth: 40,
  },
  marker: {
    borderRadius: 2,
    bottom: 4,
    height: 4,
    position: 'absolute',
    width: 4,
  },
  text: {
    fontSize: 14,
  },
  todayLabel: {
    bottom: 3,
    fontSize: 7,
    position: 'absolute',
  },
});
