import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { Switch } from 'react-native-paper';

import Header from '../components/Header/Header';
import { COLORS, LANGUAGES, SCREENS } from '../constants';
import { useSettings } from '../context/SettingsProvider';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-native-element-dropdown';
import { useAsyncStorage } from '../hooks/useAsyncStorage';
import { isIOS } from '../utils';
import Accordion from '../components/Accordion/Accordion';
import { TermsAndConditionsPage } from '../components/Terms/TermsAndConditionsPage';
import { PrivacyPage } from '../components/Terms/PrivacyPage';
import { AboutPage } from '../components/Terms/AboutPage';

const SettingsScreen = ({ navigation }) => {
  const [language, setLanguage] = useAsyncStorage('language', 'en');

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
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  const lng = language || i18n.language;

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

      <View style={styles.container}>
        <View style={styles.settingsContainer}>
          <Accordion
            isDarkMode={isDarkMode}
            title={t('about_page_About')}
            wrapperAvatarUri={require('../../assets/about.png')}
            wrapperAvatarStyle={styles.avatar}
            accordionBody={
              <View style={styles.accordionContainer}>
                <AboutPage />
              </View>
            }
          />
          <Accordion
            isDarkMode={isDarkMode}
            title={t('terms_and_conditions')}
            wrapperAvatarUri={require('../../assets/tnc.png')}
            wrapperAvatarStyle={styles.avatar}
            accordionBody={
              <View style={styles.accordionContainer}>
                <TermsAndConditionsPage />
              </View>
            }
          />
          <Accordion
            isDarkMode={isDarkMode}
            title={t('privacy_policy')}
            wrapperAvatarUri={require('../../assets/privacy.png')}
            wrapperAvatarStyle={styles.avatar}
            accordionBody={
              <View style={styles.accordionContainer}>
                <PrivacyPage />
              </View>
            }
          />
        </View>
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
    fontFamily: isIOS() ? 'System' : 'Roboto',
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

  container: {
    flex: 1,
    paddingTop: 20,
  },
  settingsContainer: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 48,
  },
  accordionContainer: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingTop: 8,
    paddingBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    marginLeft: 0,
    marginTop: 4,
    marginBottom: 4,
    marginRight: 0,
    backgroundColor: 'transparent',
  },
});

export default SettingsScreen;
