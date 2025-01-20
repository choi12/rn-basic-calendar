import React, { useMemo } from 'react';

import { View, Text } from 'react-native';

import { defaultStyles } from './styles';
import { getWeekdayTextStyles } from './styleUtils';
import { WeekdayHeaderProps } from './types';
import { WEEKDAYS } from '../../../../constants/calendar';
import { checkWeekend } from '../../../../utils/date';

function WeekdayHeader({ language, styles = {}, colors }: WeekdayHeaderProps) {
  const weekdayTextStyles = useMemo(
    () => (weekdayIndex: number) => {
      const isWeekend = checkWeekend(weekdayIndex);
      return getWeekdayTextStyles(isWeekend, styles, colors);
    },
    [styles, colors],
  );

  return (
    <View style={[defaultStyles.container, styles.containerStyle]}>
      {WEEKDAYS[language].map((day, index) => {
        return (
          <Text key={day} style={weekdayTextStyles(index)}>
            {day}
          </Text>
        );
      })}
    </View>
  );
}

export default WeekdayHeader;
