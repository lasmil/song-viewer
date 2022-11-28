import React from 'react';
import { Pressable, StyleSheet, Image } from 'react-native';
import { useSettings } from '../../context/SettingsProvider';
import arrowLight from '../../../assets/arrow-light.png';
import arrowDark from '../../../assets/arrow-dark.png';
import { ARROW_ORIENTATIONS } from '../../constants';

const IconButton = ({ arrowOrientation, onPress }) => {
  const { themeMode } = useSettings();
  const isDarkMode = themeMode === 'dark';

  const arrowStyle = {
    transform: [
      {
        rotate:
          arrowOrientation === ARROW_ORIENTATIONS.DOWN ? '-90deg' : '90deg',
      },
    ],
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Image
        source={isDarkMode ? arrowDark : arrowLight}
        style={[styles.image, arrowStyle]}
      />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    width: 20,
    height: 20,
  },
});
