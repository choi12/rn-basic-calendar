import type { Preview } from '@storybook/react-native-web-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        date: /Date$/,
      },
    },
    backgrounds: {
      options: {
        light: { name: 'light', value: '#fff' },
        dark: { name: 'dark', value: '#333' },
      },
    },
    options: {
      storySort: {
        order: ['Components', ['Calendar', ['Default']]],
      },
    },
  },
  initialGlobals: {
    backgrounds: { value: 'light' },
  },
};

export default preview;
