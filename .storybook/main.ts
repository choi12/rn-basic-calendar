import type { StorybookConfig } from '@storybook/react-native-web-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
};

export default config;
