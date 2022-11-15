import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import logo from '../../../assets/logo.png';
import settingsLight from '../../../assets/settings-light.png';
import settingsDark from '../../../assets/settings-dark.png';
import { COLORS, SCREENS } from '../../constants';

const Header = ({ navigation, currentScreen }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? COLORS.darker : COLORS.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={styles.headerContainer}>
        <Image source={logo} style={styles.image} />
        <Text style={styles.title}>
          {currentScreen === SCREENS.HOME ? 'Song viewer' : 'Settings'}
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(
              currentScreen === SCREENS.HOME ? SCREENS.SETTINGS : SCREENS.HOME
            );
          }}
        >
          <Image
            source={isDarkMode ? settingsLight : settingsDark}
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
    color: COLORS.background,
    fontFamily: 'Roboto',
    fontWeight: '700',
  },
});

export default Header;
