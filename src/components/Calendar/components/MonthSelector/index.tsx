import React from 'react';

import { View, Pressable, Text } from 'react-native';

import { defaultStyles } from './styles';
import { getArrowStyles, getMonthTextStyles } from './styleUtils';
import { MonthSelectorProps } from './types';
import { MONTH_FORMAT } from '../../../../constants/calendar';
import { isMonthOutOfRange } from '../../../../utils/date';

function MonthSelector({
  selectedMonth,
  onPreviousMonth,
  onNextMonth,
  minDate,
  maxDate,
  language,
  styles = {},
  colors,
}: MonthSelectorProps) {
  const isPrevDisabled = isMonthOutOfRange(selectedMonth, minDate);
  const isNextDisabled = isMonthOutOfRange(selectedMonth, maxDate);

  const prevArrowStyles = getArrowStyles(isPrevDisabled, styles, colors);
  const nextArrowStyles = getArrowStyles(isNextDisabled, styles, colors);
  const monthTextStyles = getMonthTextStyles(styles, colors);

  return (
    <View style={[defaultStyles.container, styles.containerStyle]}>
      <Pressable
        onPress={onPreviousMonth}
        disabled={isPrevDisabled}
        style={[defaultStyles.button, styles.buttonStyle]}
      >
        <Text style={prevArrowStyles}>{'<'}</Text>
      </Pressable>
      <Text style={monthTextStyles}>
        {selectedMonth.locale(language).format(MONTH_FORMAT[language])}
      </Text>
      <Pressable
        onPress={onNextMonth}
        disabled={isNextDisabled}
        style={[defaultStyles.button, styles.buttonStyle]}
      >
        <Text style={nextArrowStyles}>{'>'}</Text>
      </Pressable>
    </View>
  );
}

export default MonthSelector;
