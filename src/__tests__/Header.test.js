import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react-native';
import Header from '../src/components/Header/Header';
import { SCREENS } from '../src/constants';

jest.mock('@react-native-async-storage/async-storage');

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
  }),
}));

test('renders Home page', () => {
  const mockFn = jest.fn();

  render(
    <Header
      currentScreen={SCREENS.HOME}
      navigation={{
        navigate: mockFn,
      }}
    />
  );

  const headerTitle = screen.getByText('Song viewer');
  expect(headerTitle).toBeTruthy();

  // check if logo is present
  const logo = screen.getByTestId('header-logo');
  expect(logo).toBeTruthy();

  // check if settings icon is present
  const settingsIcon = screen.getByTestId('header-settings');
  expect(settingsIcon).toBeTruthy();
});

test('renders Settings page', () => {
  const mockFn = jest.fn();

  render(
    <Header
      currentScreen={SCREENS.SETTINGS}
      navigation={{
        navigate: mockFn,
      }}
    />
  );

  const headerTitle = screen.getByText('settings');
  expect(headerTitle).toBeTruthy();

  // check if logo is present
  const logo = screen.getByTestId('header-logo');
  expect(logo).toBeTruthy();

  // check if settings icon is present
  const settingsIcon = screen.getByTestId('header-settings');
  expect(settingsIcon).toBeTruthy();
});

test('navigates from Home page to Settings page', () => {
  const mockFn = jest.fn();

  render(
    <Header
      currentScreen={SCREENS.HOME}
      navigation={{
        navigate: mockFn,
      }}
    />
  );

  let headerTitle = screen.getByText('Song viewer');
  expect(headerTitle).toBeTruthy();

  // navigate to settings page
  const headerSettingsButton = screen.getByTestId('header-settings-button');
  fireEvent.press(headerSettingsButton);

  expect(mockFn).toHaveBeenCalledWith(SCREENS.SETTINGS);
});

test('navigates from Settings page to Home page', () => {
  const mockFn = jest.fn();

  render(
    <Header
      currentScreen={SCREENS.SETTINGS}
      navigation={{
        navigate: mockFn,
      }}
    />
  );

  let headerTitle = screen.getByText('settings');
  expect(headerTitle).toBeTruthy();

  // navigate to settings page
  const headerSettingsButton = screen.getByTestId('header-settings-button');
  fireEvent.press(headerSettingsButton);

  expect(mockFn).toHaveBeenCalledWith(SCREENS.HOME);
});
