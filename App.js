import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Provider as PaperProvider } from 'react-native-paper';
import { SettingsProvider } from './src/context/SettingsProvider';

import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const App = () => {
  const Stack = createNativeStackNavigator();

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

export default App;
