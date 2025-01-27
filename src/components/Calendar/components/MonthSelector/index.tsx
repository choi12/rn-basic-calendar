import React from 'react';

import { View, Pressable, Text } from 'react-native';

import { defaultStyles } from './styles';
import { getArrowStyles, getMonthTextStyles } from './styleUtils';
import { MonthSelectorProps } from './types';
import { MONTH_FORMAT, NAVIGATION_BUTTON_TEXT, TEST_IDS } from '../../../../constants';
import { isMonthLimit } from '../../../../utils';

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
  const isPrevDisabled = isMonthLimit(selectedMonth, minDate);
  const isNextDisabled = isMonthLimit(selectedMonth, maxDate);

  const prevArrowStyles = getArrowStyles(isPrevDisabled, styles, colors);
  const nextArrowStyles = getArrowStyles(isNextDisabled, styles, colors);
  const monthTextStyles = getMonthTextStyles(styles, colors);

  return (
    <View
      style={[defaultStyles.container, styles.containerStyle]}
      testID={TEST_IDS.MONTH_SELECTOR.CONTAINER}
    >
      <Pressable
        onPress={onPreviousMonth}
        disabled={isPrevDisabled}
        style={[defaultStyles.button, styles.buttonStyle]}
        testID={TEST_IDS.MONTH_SELECTOR.PREVIOUS_BUTTON}
      >
        <Text style={prevArrowStyles} testID={TEST_IDS.MONTH_SELECTOR.PREVIOUS_BUTTON_TEXT}>
          {NAVIGATION_BUTTON_TEXT.PREV}
        </Text>
      </Pressable>
      <Text style={monthTextStyles}>
        {selectedMonth.locale(language).format(MONTH_FORMAT[language])}
      </Text>
      <Pressable
        onPress={onNextMonth}
        disabled={isNextDisabled}
        style={[defaultStyles.button, styles.buttonStyle]}
        testID={TEST_IDS.MONTH_SELECTOR.NEXT_BUTTON}
      >
        <Text style={nextArrowStyles} testID={TEST_IDS.MONTH_SELECTOR.NEXT_BUTTON_TEXT}>
          {NAVIGATION_BUTTON_TEXT.NEXT}
        </Text>
      </Pressable>
    </View>
  );
}

export default MonthSelector;
