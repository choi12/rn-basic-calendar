import { useEffect, useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import dayjs, { Dayjs } from 'dayjs';

import { CalendarModal } from '.';
import { CalendarModalProps } from './types';
import { COLORS } from '../../constants';
import OpenButton from '../../stories/components/OpenButton';
import {
  parseMarkedDates,
  toDayjs,
  generateSampleMarkedDates,
  calendarModalArgTypes,
  storyParameters,
  defaultStoryArgs,
} from '../../stories/utils';

const CalendarModalWrapper = (
  props: Omit<
    CalendarModalProps,
    | 'value'
    | 'onChange'
    | 'isVisible'
    | 'onClose'
    | 'minDate'
    | 'maxDate'
    | 'defaultValue'
    | 'markedDates'
  > & {
    initialValue?: Date | string;
    minDate?: Date | string;
    maxDate?: Date | string;
    markedDates?: string | string[];
    autoOpen?: boolean; // Auto-open modal for demo purposes
  },
) => {
  const [value, setValue] = useState<Dayjs>(() => toDayjs(props.initialValue));
  const [isVisible, setIsVisible] = useState(props.autoOpen || false);

  useEffect(() => {
    setValue(toDayjs(props.initialValue));
  }, [props.initialValue]);

  const handleDateChange = (date: Dayjs) => {
    setValue(date);
    if (!props.autoOpen) {
      setIsVisible(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleOpen = () => {
    setIsVisible(true);
  };

  const modalProps: CalendarModalProps = {
    ...props,
    value,
    onChange: handleDateChange,
    isVisible,
    onClose: handleClose,
    minDate: props.minDate ? toDayjs(props.minDate) : undefined,
    maxDate: props.maxDate ? toDayjs(props.maxDate) : undefined,
    markedDates: parseMarkedDates(props.markedDates || []),
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      {!isVisible && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: 16, color: COLORS.BLACK, fontSize: 14 }}>
            Selected Date: {value.format('YYYY-MM-DD')}
          </p>
          <OpenButton onPress={handleOpen} />
        </div>
      )}
      <CalendarModal {...modalProps} />
    </div>
  );
};

const meta: Meta<typeof CalendarModalWrapper> = {
  title: 'Components/CalendarModal',
  component: CalendarModalWrapper,
  parameters: storyParameters,
  argTypes: calendarModalArgTypes,
  args: {
    ...defaultStoryArgs,
    overlayOpacity: 0.4,
    autoOpen: true,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  args: { autoOpen: false },
  parameters: {
    controls: {
      exclude: /.*/,
    },
  },
};

export const CustomTitle: Story = {
  name: 'Custom Title',
  args: {
    title: '📅 Select Date',
  },
  parameters: {
    controls: {
      include: ['title'],
    },
  },
};

export const BackgroundOpacity: Story = {
  name: 'Background Opacity',
  args: {
    overlayOpacity: 0.7,
  },
  parameters: {
    controls: {
      include: ['overlayOpacity'],
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
    title: '📅 날짜 선택',
  },
  parameters: {
    controls: {
      include: ['language', 'title'],
    },
  },
};

export const DarkMode: Story = {
  name: 'Dark Mode',
  args: {
    overlayOpacity: 0.7,
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
    title: '📅 Select Date',
    overlayOpacity: 0.5,
    minDate: dayjs().subtract(1, 'month').toDate(),
    maxDate: dayjs().add(1, 'month').toDate(),
    markedDates: generateSampleMarkedDates(),
    colors: {
      primaryColor: COLORS.PRIMARY,
      backgroundColor: COLORS.WHITE,
      textColor: COLORS.BLACK,
    },
    styles: {
      modalOverlayStyle: {},
      modalContainerStyle: {},
      modalTitleStyle: {},

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
