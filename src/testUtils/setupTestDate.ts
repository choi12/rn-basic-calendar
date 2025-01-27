const setupToday = () => {
  const mockToday = new Date('2025-01-24');
  jest.useFakeTimers();
  jest.setSystemTime(mockToday);
};

const cleanupTimers = () => {
  jest.useRealTimers();
};

export const withMockToday = (callback: () => void) => {
  setupToday();
  callback();
  cleanupTimers();
};
