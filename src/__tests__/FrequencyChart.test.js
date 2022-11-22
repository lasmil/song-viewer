import React from 'react';

import { render, screen } from '@testing-library/react-native';
import { FrequencyChart } from '../src/components/FrequencyChart/FrequencyChart';

jest.mock('@react-native-async-storage/async-storage');

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
  }),
}));

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

test('renders Frequency chart page', () => {
  const frequencies = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
  const duration = 5;
  const maxFrequency = 1000;

  render(
    <FrequencyChart
      frequencies={frequencies}
      duration={duration}
      maxFrequency={maxFrequency}
    />
  );

  const leftArrow = screen.getByTestId('left-arrow');
  expect(leftArrow).toBeTruthy();

  const rightArrow = screen.getByTestId('right-arrow');
  expect(rightArrow).toBeTruthy();
});
