import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';

import logo from './assets/logo.png';

import { Provider as PaperProvider } from 'react-native-paper';
import { SettingsProvider } from './src/context/SettingsProvider';
import { useAsyncStorage } from './src/hooks/useAsyncStorage';

import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { useTranslation } from 'react-i18next';
import * as BootSplash from 'react-native-bootsplash';
import { COLORS } from './src/constants';
import { Animated, StyleSheet, Dimensions } from 'react-native';

const App = () => {
  const [bootSplashIsVisible, setBootSplashIsVisible] = useState(true);
  const [bootSplashLogoIsLoaded, setBootSplashLogoIsLoaded] = useState(false);

  const opacity = useRef(new Animated.Value(1));
  const translateY = useRef(new Animated.Value(0));

  const [language] = useAsyncStorage('language', 'en');
  const { i18n } = useTranslation();

  const init = async () => {
    try {
      await BootSplash.hide();

      Animated.stagger(500, [
        Animated.spring(translateY.current, {
          useNativeDriver: true,
          toValue: -48,
        }),
        Animated.spring(translateY.current, {
          useNativeDriver: true,
          toValue: Dimensions.get('window').height,
        }),
      ]).start();

      Animated.timing(opacity.current, {
        useNativeDriver: true,
        toValue: 0,
        duration: 500,
        delay: 350,
      }).start(() => {
        setBootSplashIsVisible(false);
      });
    } catch (error) {
      setBootSplashIsVisible(false);
    }
  };

  useEffect(() => {
    bootSplashLogoIsLoaded && init();
  }, [bootSplashLogoIsLoaded]);

  useEffect(() => {
    if (language !== i18n.language) {
      i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  const Stack = createNativeStackNavigator();

  if (bootSplashIsVisible) {
    return (
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          styles.bootsplash,
          { opacity: opacity.current },
        ]}
      >
        <Animated.Image
          source={logo}
          fadeDuration={0}
          resizeMode="contain"
          onLoadEnd={() => setBootSplashLogoIsLoaded(true)}
          style={[
            styles.logo,
            { transform: [{ translateY: translateY.current }] },
          ]}
        />
      </Animated.View>
    );
  }

  return (
    <PaperProvider>
      <SettingsProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </SettingsProvider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    margin: 20,
    lineHeight: 28,
    color: COLORS.dark,
    textAlign: 'center',
  },
  bootsplash: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  logo: {
    height: 88,
    width: 100,
  },
});

export default App;
