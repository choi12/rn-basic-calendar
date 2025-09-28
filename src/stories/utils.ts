import dayjs, { Dayjs } from 'dayjs';

export const parseMarkedDates = (markedDates: string | string[]): string[] => {
  if (Array.isArray(markedDates)) {
    return markedDates.filter(date => date && dayjs(date).isValid());
  }
  if (!markedDates || markedDates.trim() === '') return [];

  return markedDates
    .split(',')
    .map(date => date.trim())
    .filter(date => date && dayjs(date).isValid());
};

export const toDayjs = (date?: Date | string): Dayjs => {
  if (!date) return dayjs();

  const parsed = dayjs(date);
  if (!parsed.isValid()) {
    console.warn(`Invalid date provided: ${date}, using current date instead`);
    return dayjs();
  }

  return parsed;
};

export const generateSampleMarkedDates = (): string => {
  return [
    dayjs().subtract(8, 'day').format('YYYY-MM-DD'),
    dayjs().subtract(3, 'day').format('YYYY-MM-DD'),
    dayjs().add(2, 'day').format('YYYY-MM-DD'),
    dayjs().add(7, 'day').format('YYYY-MM-DD'),
  ].join(',');
};

export const calendarArgTypes = {
  initialValue: {
    description: 'Initial selected date',
    control: { type: 'date' as const },
    table: {
      type: { summary: 'Date | string' },
      category: 'Date Control',
    },
  },
  minDate: {
    description: 'Minimum selectable date (CalendarDay type)',
    control: { type: 'date' as const },
    table: {
      type: { summary: 'CalendarDay (Dayjs)' },
      category: 'Date Control',
    },
  },
  maxDate: {
    description: 'Maximum selectable date (CalendarDay type)',
    control: { type: 'date' as const },
    table: {
      type: { summary: 'CalendarDay (Dayjs)' },
      category: 'Date Control',
    },
  },
  markedDates: {
    description: 'Dates to mark (comma-separated for Storybook testing)',
    control: { type: 'text' as const },
    table: {
      type: {
        summary: 'string | string[]',
        detail: `Storybook: 2024-12-25, 2024-12-31
Code usage: ["2024-12-25", "2024-12-31"]`,
      },
      category: 'Date Features',
    },
  },
  language: {
    description: 'Calendar language',
    control: { type: 'select' as const },
    options: ['en', 'ko'],
    table: {
      type: { summary: "'en' | 'ko'" },
      category: 'Localization',
    },
  },
  colors: {
    description: 'Color theme configuration object',
    control: { type: 'object' as const },
    table: {
      type: {
        summary: 'CalendarColors',
        detail: `{
  primaryColor?: string;
  backgroundColor?: string;
  textColor?: string;
}`,
      },
      category: 'Styling',
    },
  },
  styles: {
    description: 'Custom style overrides',
    control: { type: 'object' as const },
    table: {
      type: { summary: 'CalendarStyles' },
      category: 'Styling',
    },
  },
} as const;

export const calendarModalArgTypes = {
  ...calendarArgTypes,
  title: {
    description: 'Optional modal title text',
    control: { type: 'text' as const },
    table: {
      type: { summary: 'string | undefined' },
      category: 'Modal Properties',
    },
  },
  overlayOpacity: {
    description: 'Background overlay opacity',
    control: { type: 'range' as const, min: 0, max: 1, step: 0.1 },
    table: {
      type: { summary: 'number | undefined' },
      defaultValue: { summary: '0.4' },
      category: 'Modal Properties',
    },
  },
  autoOpen: {
    description: 'Auto-open modal for demo purposes (Storybook only)',
    control: { type: 'boolean' as const },
    table: {
      type: { summary: 'boolean' },
      category: 'Demo Controls',
    },
  },
} as const;

export const storyParameters = {
  layout: 'centered' as const,
  viewport: {
    defaultViewport: 'iphone13pro',
  },
  controls: {
    expanded: true,
  },
  docs: {
    canvas: {
      sourceState: 'none' as const,
    },
  },
};

export const defaultStoryArgs = {
  initialValue: dayjs().subtract(2, 'day').toDate(),
  language: 'en' as const,
};
