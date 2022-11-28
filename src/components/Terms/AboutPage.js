import * as React from 'react';
import { ScrollView } from 'react-native';
import { Paragraph } from 'react-native-paper';
import { COLORS } from '../../constants';
import { useSettings } from '../../context/SettingsProvider';

export const AboutPage = () => {
  const { themeMode } = useSettings();
  const isDarkMode = themeMode === 'dark';

  return (
    <ScrollView>
      <Paragraph style={{ color: isDarkMode ? COLORS.lighter : COLORS.darker }}>
        Song viewer
      </Paragraph>
    </ScrollView>
  );
};
