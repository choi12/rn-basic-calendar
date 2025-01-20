import { useState } from 'react';

import dayjs, { Dayjs } from 'dayjs';

import { CalendarDay } from '../types/calendar';

interface UseCalendarStateProps {
  initialDate?: CalendarDay;
}

function useCalendarState({ initialDate = dayjs() }: UseCalendarStateProps) {
  const [currentMonth, setCurrentMonth] = useState<Dayjs>(initialDate);

  const handlePrevMonth = () => {
    setCurrentMonth(month => month.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(month => month.add(1, 'month'));
  };

  return {
    currentMonth,
    handlePrevMonth,
    handleNextMonth,
  };
}

export default useCalendarState;
