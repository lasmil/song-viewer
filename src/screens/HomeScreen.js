import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';

import Header from '../components/Header/Header';
import { COLORS, SCREENS, SKELETON_LAYOUT } from '../constants';
import DocumentPicker, { isInProgress } from 'react-native-document-picker';
import { AudioPlayer } from 'react-native-simple-audio-player';
import { getFrequencyArray, getSongDuration } from '../api/analyze';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { getSongParts, getMaxFrequency, isIOS } from '../utils';
import { FrequencyChart } from '../components/FrequencyChart/FrequencyChart.js';
import { useSettings } from '../context/SettingsProvider';
import { useTranslation } from 'react-i18next';

const HomeScreen = ({ navigation }) => {
  const { themeMode } = useSettings();
  const { t } = useTranslation();

  const isDarkMode = themeMode === 'dark';

  const [result, setResult] = useState(null);
  const [frequencies, setFrequencies] = useState([]);
  const [duration, setDuration] = useState(null);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? COLORS.background : COLORS.lighter,
    height: '100%',
  };

  const audiPlayerStyle = {
    backgroundColor: isDarkMode ? COLORS.darker : COLORS.background,
  };

  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered'
      );
    } else {
      throw err;
    }
  };

  const onChoosePress = async () => {
    setResult(null);
    setFrequencies([]);
    setDuration(null);
    let newFrequencies = [];

    try {
      const pickerResult = await DocumentPicker.pickSingle({
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      setResult(pickerResult);
      const { duration: songDuration } = await getSongDuration(pickerResult);

      if (songDuration) {
        setDuration(songDuration);

        const partsOfSong = getSongParts({ songDuration });
        for (let i = 0; i < partsOfSong; i++) {
          const frequencyArray = await getFrequencyArray({
            file: pickerResult,
            songPart: i + 1,
            totalParts: partsOfSong,
          });

          // set frequencies using previous value
          newFrequencies = [...newFrequencies, ...frequencyArray];
          setFrequencies(newFrequencies);
        }
      }
    } catch (e) {
      console.log('error', e);
      handleError(e);
    }
  };

  const maxFrequency = getMaxFrequency(frequencies);

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView stickyHeaderIndices={[0]}>
        <Header currentScreen={SCREENS.HOME} navigation={navigation} />
        <View style={styles.mainContainer}>
          <Button
            style={styles.input}
            mode="contained"
            buttonColor={isDarkMode ? COLORS.lighter : COLORS.background}
            textColor={isDarkMode ? COLORS.darker : COLORS.lighter}
            labelStyle={styles.input}
            onPress={onChoosePress}
          >
            {t('choose_file')}
          </Button>
          {result?.fileCopyUri && (
            <View style={styles.container}>
              <View>
                <AudioPlayer
                  url={result.fileCopyUri}
                  style={[styles.audioPlayer, audiPlayerStyle]}
                />
              </View>

              <View style={styles.container}>
                <SkeletonContent
                  containerStyle={styles.skeleton}
                  isLoading={frequencies.length === 0}
                  boneColor={isDarkMode ? COLORS.background : COLORS.lighter}
                  highlightColor={
                    isDarkMode ? COLORS.lighter : COLORS.background
                  }
                  animationType="pulse"
                  layout={SKELETON_LAYOUT}
                >
                  {frequencies.length > 0 && (
                    <FrequencyChart
                      frequencies={frequencies}
                      duration={duration}
                      maxFrequency={maxFrequency}
                    />
                  )}
                </SkeletonContent>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 32,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 16,
    alignItems: 'center',
  },
  input: {
    fontWeight: '700',
    fontFamily: isIOS() ? 'System' : 'Roboto',
    fontSize: 18,
    width: 180,
  },
  container: {
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
  },
  audioPlayer: {
    padding: 8,
    paddingTop: 12,
  },
  skeleton: {
    flex: 1,
  },
});

export default HomeScreen;
