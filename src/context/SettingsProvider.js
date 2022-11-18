import React, { useContext, createContext } from 'react';
import { useColorScheme } from 'react-native';
import { useAsyncStorage } from '../hooks/useAsyncStorage';

const SettingsContext = createContext({});

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const [themeMode, setThemeMode] = useAsyncStorage(
    'themMode',
    isDarkMode ? 'dark' : 'light'
  );

  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const onToggleThemeMode = () =>
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');

  return (
    <SettingsContext.Provider
      value={{
        themeMode,
        onToggleThemeMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
