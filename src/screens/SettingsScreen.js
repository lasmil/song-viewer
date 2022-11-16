import React from 'react';
import { SafeAreaView, useColorScheme } from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Header from '../components/Header/Header';
import { SCREENS } from '../constants';

const SettingsScreen = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Header currentScreen={SCREENS.SETTINGS} navigation={navigation} />
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
// });

export default SettingsScreen;
