import React, { useState } from 'react';
import { ScrollView, StyleSheet, useColorScheme, View } from 'react-native';
import { Button } from 'react-native-paper';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Header from '../components/Header/Header';
import { COLORS, SCREENS, SKELETON_LAYOUT } from '../constants';
import DocumentPicker, { isInProgress } from 'react-native-document-picker';
import { AudioPlayer } from 'react-native-simple-audio-player';
import { getFrequencyArray, getSongDuration } from '../api/analyze';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import { getSongParts } from '../utils';
import { FrequencyChart } from '../components/FrequencyChart/FrequencyChart.js';

const HomeScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const [frequencies, setFrequencies] = useState([]);
  const [duration, setDuration] = useState(null);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
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

  return (
    <ScrollView style={backgroundStyle}>
      <Header currentScreen={SCREENS.HOME} navigation={navigation} />
      <View style={styles.mainContainer}>
        <Button
          style={styles.input}
          mode="contained"
          buttonColor={COLORS.background}
          textColor={COLORS.white}
          labelStyle={styles.input}
          onPress={onChoosePress}
        >
          CHOOSE FILE
        </Button>
        {result?.fileCopyUri && (
          <View style={styles.container}>
            <View>
              <AudioPlayer
                url={result.fileCopyUri}
                style={styles.audioPlayer}
              />
            </View>

            <View style={styles.container}>
              <SkeletonContent
                containerStyle={styles.skeleton}
                isLoading={frequencies.length === 0}
                boneColor={COLORS.light}
                highlightColor={COLORS.background}
                animationType="pulse"
                layout={SKELETON_LAYOUT}
              >
                {frequencies.length > 0 && (
                  <FrequencyChart
                    frequencies={frequencies}
                    duration={duration}
                  />
                )}
              </SkeletonContent>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
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
    fontFamily: 'Roboto',
    fontSize: 18,
    width: 180,
  },
  container: {
    marginTop: 24,
    width: '100%',
    alignItems: 'center',
  },
  audioPlayer: {
    backgroundColor: COLORS.background,
    padding: 8,
    paddingTop: 12,
  },
  skeleton: {
    flex: 1,
  },
});

export default HomeScreen;
