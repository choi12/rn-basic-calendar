import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import dayjs, { Dayjs } from 'dayjs';

import { Calendar } from '.';
import { CalendarProps } from './types';
import { COLORS } from '../../constants';
import {
  parseMarkedDates,
  toDayjs,
  generateSampleMarkedDates,
  calendarArgTypes,
  storyParameters,
  defaultStoryArgs,
} from '../../stories/utils';

const CalendarWrapper = (
  props: Omit<
    CalendarProps,
    'value' | 'onChange' | 'minDate' | 'maxDate' | 'defaultValue' | 'markedDates'
  > & {
    initialValue?: Date | string;
    minDate?: Date | string;
    maxDate?: Date | string;
    markedDates?: string | string[];
  },
) => {
  const [value, setValue] = useState<Dayjs>(() => toDayjs(props.initialValue));

  useEffect(() => {
    setValue(toDayjs(props.initialValue));
  }, [props.initialValue]);

  const calendarProps: CalendarProps = {
    ...props,
    value,
    onChange: setValue,
    minDate: props.minDate ? toDayjs(props.minDate) : undefined,
    maxDate: props.maxDate ? toDayjs(props.maxDate) : undefined,
    markedDates: parseMarkedDates(props.markedDates || []),
  };

  return <Calendar {...calendarProps} />;
};

const meta: Meta<typeof CalendarWrapper> = {
  title: 'Components/Calendar',
  component: CalendarWrapper,
  parameters: storyParameters,
  argTypes: calendarArgTypes,
  args: defaultStoryArgs,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  parameters: {
    controls: {
      exclude: /.*/, // Hide all controls - show pure default usage
    },
  },
};

export const MarkedDates: Story = {
  name: 'Marked Dates',
  args: {
    markedDates: generateSampleMarkedDates(),
  },
  parameters: {
    controls: {
      include: ['markedDates', 'initialValue'],
    },
  },
};

export const DateRangeRestricted: Story = {
  name: 'Date Range Restricted',
  args: {
    minDate: dayjs().subtract(1, 'week').toDate(),
    maxDate: dayjs().add(1, 'week').toDate(),
  },
  parameters: {
    controls: {
      include: ['minDate', 'maxDate', 'initialValue'],
    },
  },
};

export const KoreanLanguage: Story = {
  name: 'Korean Language',
  args: {
    language: 'ko',
  },
  parameters: {
    controls: {
      include: ['language', 'initialValue'],
    },
  },
};

export const DarkMode: Story = {
  name: 'Dark Mode',
  args: {
    colors: {
      primaryColor: COLORS.PRIMARY,
      backgroundColor: COLORS.DARK_BLACK,
      textColor: COLORS.WHITE,
    },
  },
  parameters: {
    controls: {
      include: ['colors'],
    },
    backgrounds: { default: 'dark' },
  },
};

export const Playground: Story = {
  name: 'Playground',
  args: {
    minDate: dayjs().subtract(1, 'month').toDate(),
    maxDate: dayjs().add(1, 'month').toDate(),
    markedDates: generateSampleMarkedDates(),
    colors: {
      primaryColor: COLORS.PRIMARY,
      backgroundColor: COLORS.WHITE,
      textColor: COLORS.BLACK,
    },
    styles: {
      containerStyle: {},
      daysContainerStyle: {},
      weekStyle: {},

      dayContainerStyle: {},
      dayTextStyle: {},
      selectedDayStyle: {},
      selectedDayTextStyle: {},
      todayLabelStyle: {},
      weekendDayTextStyle: {},
      disabledDayTextStyle: {},

      monthSelectorContainerStyle: {},
      monthSelectorButtonStyle: {},
      monthTextStyle: {},
      arrowStyle: {},
      disabledArrowStyle: {},

      weekdayHeaderContainerStyle: {},
      weekdayTextStyle: {},
      weekendHeaderTextStyle: {},
    },
  },
};
