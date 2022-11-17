import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import logo from '../../../assets/logo.png';
import settingsLight from '../../../assets/settings-light.png';
import settingsDark from '../../../assets/settings-dark.png';
import arrowLight from '../../../assets/arrow-light.png';
import arrowDark from '../../../assets/arrow-dark.png';
import { COLORS, SCREENS } from '../../constants';
import { useSettings } from '../../context/SettingsProvider';
import { useTranslation } from 'react-i18next';

const Header = ({ navigation, currentScreen }) => {
  const { t } = useTranslation();

  const { themeMode } = useSettings();
  const isDarkMode = themeMode === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? COLORS.darker : COLORS.lighter,
  };

  const titleStyle = {
    color: isDarkMode ? COLORS.lighter : COLORS.darker,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.headerContainer}>
        <Image source={logo} style={styles.image} />
        <Text style={[styles.title, titleStyle]}>
          {currentScreen === SCREENS.HOME ? 'Song viewer' : t('settings')}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(
              currentScreen === SCREENS.HOME ? SCREENS.SETTINGS : SCREENS.HOME
            );
          }}
        >
          <Image
            source={
              currentScreen === SCREENS.HOME
                ? isDarkMode
                  ? settingsLight
                  : settingsDark
                : isDarkMode
                ? arrowDark
                : arrowLight
            }
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    height: 52,
    paddingLeft: 8,
    paddingRight: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.background,
  },
  image: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
});

export default Header;
