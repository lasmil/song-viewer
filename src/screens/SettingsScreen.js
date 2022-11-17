import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Switch } from 'react-native-paper';

import Header from '../components/Header/Header';
import { COLORS, LANGUAGES, SCREENS } from '../constants';
import { useSettings } from '../context/SettingsProvider';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-native-element-dropdown';

const SettingsScreen = ({ navigation }) => {
  const { i18n, t } = useTranslation();

  const { themeMode, onToggleThemeMode } = useSettings();
  const isDarkMode = themeMode === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? COLORS.background : COLORS.lighter,
    height: '100%',
  };

  const textStyle = {
    color: isDarkMode ? COLORS.lighter : COLORS.black,
  };

  const onToggleSwitch = () => onToggleThemeMode();

  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  const lng = i18n.language;

  return (
    <SafeAreaView style={backgroundStyle}>
      <Header currentScreen={SCREENS.SETTINGS} navigation={navigation} />

      <View style={styles.setting}>
        <Text style={[styles.text, textStyle]}>{t('light_mode')}</Text>
        <Switch
          style={styles.switchStyle}
          value={themeMode === 'dark'}
          onValueChange={onToggleSwitch}
          color={isDarkMode ? COLORS.lighter : COLORS.background}
        />
        <Text style={[styles.text, textStyle]}>{t('dark_mode')}</Text>
      </View>

      <View style={styles.setting}>
        <Dropdown
          style={[styles.dropdown, textStyle]}
          selectedTextStyle={[styles.text, textStyle]}
          itemContainerStyle={textStyle}
          itemTextStyle={[styles.text, styles.itemTextStyle]}
          data={LANGUAGES}
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={lng}
          onChange={item => {
            changeLanguage(item.value);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  setting: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  switchStyle: {
    marginLeft: 12,
    marginRight: 12,
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: '700',
  },
  dropdown: {
    borderBottomColor: COLORS.black,
    borderBottomWidth: 1,
    flex: 0.5,
    paddingLeft: 12,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
  itemTextStyle: {
    color: COLORS.black,
  },
});

export default SettingsScreen;
