import React, { useContext, useState, createContext } from 'react';
import { useColorScheme } from 'react-native';

const SettingsContext = createContext({});

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [themeMode, setThemeMode] = useState(isDarkMode ? 'dark' : 'light');
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
