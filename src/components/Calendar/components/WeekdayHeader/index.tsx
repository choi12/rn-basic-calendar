import React, { useMemo } from 'react';

import { View, Text } from 'react-native';

import { defaultStyles } from './styles';
import { getWeekdayTextStyles } from './styleUtils';
import { WeekdayHeaderProps } from './types';
import { TEST_IDS, WEEKDAYS } from '../../../../constants';
import { checkWeekend } from '../../../../utils';

function WeekdayHeader({ language, styles = {}, colors }: WeekdayHeaderProps) {
  const weekdayTextStyles = useMemo(
    () => (weekdayIndex: number) => {
      const isWeekend = checkWeekend(weekdayIndex);
      return getWeekdayTextStyles(isWeekend, styles, colors);
    },
    [styles, colors],
  );

  return (
    <View
      style={[defaultStyles.container, styles.containerStyle]}
      testID={TEST_IDS.WEEKDAY_HEADER.CONTAINER}
    >
      {WEEKDAYS[language].map((day, index) => {
        return (
          <Text
            key={day}
            style={weekdayTextStyles(index)}
            testID={TEST_IDS.WEEKDAY_HEADER.WEEKDAY_TEXT}
          >
            {day}
          </Text>
        );
      })}
    </View>
  );
}

export default WeekdayHeader;
