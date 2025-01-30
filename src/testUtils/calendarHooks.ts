import { renderHook } from '@testing-library/react-native';

import useCalendar, { UseCalendarProps } from '../hooks/useCalendar';
import useCalendarState, { UseCalendarStateProps } from '../hooks/useCalendarState';

export const renderCalendarStateHook = (props: UseCalendarStateProps = {}) => {
  return renderHook(() => useCalendarState(props));
};

export const renderCalendarHook = (props: UseCalendarProps) => {
  return renderHook(() => useCalendar(props));
};
