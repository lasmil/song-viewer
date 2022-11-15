import React, { useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import Header from '../components/Header/Header';
import { COLORS, SCREENS } from '../constants';
import DocumentPicker, { isInProgress } from 'react-native-document-picker';
import { AudioPlayer } from 'react-native-simple-audio-player';
import { getFrequencyArray } from '../api/analyze';
import { AreaChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';
import * as shape from 'd3-shape';
import { getXAxis } from '../utils';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const HomeScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const [frequencies, setFrequencies] = useState(null);

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

  const contentInset = { top: 20, bottom: 20, left: 10, right: 10 };

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
          onPress={async () => {
            setResult(null);
            setFrequencies(null);

            try {
              const pickerResult = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
              });
              setResult(pickerResult);

              const frequencyArray = await getFrequencyArray(pickerResult);
              setFrequencies(frequencyArray);
            } catch (e) {
              console.log('error', e);
              handleError(e);
            }
          }}
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
                isLoading={
                  !frequencies?.frequencies ||
                  frequencies?.frequencies.length === 0
                }
                boneColor={COLORS.light}
                highlightColor={COLORS.background}
                animationType="pulse"
                layout={[
                  {
                    flexDirection: 'row',
                    width: '80%',
                    height: 100,
                    children: [
                      {
                        width: 20,
                        height: 100,
                        marginRight: 4,
                      },
                      {
                        flex: 1,
                        height: 100,
                      },
                    ],
                  },
                  {
                    flexDirection: 'row',
                    width: '80%',
                    height: 20,
                    marginTop: 4,
                    children: [
                      {
                        width: 20,
                        height: 20,
                        marginRight: 4,
                      },
                      {
                        flex: 1,
                        height: 20,
                      },
                    ],
                  },
                ]}
              >
                {frequencies?.frequencies && (
                  <View style={styles.chartContainer}>
                    <YAxis
                      contentInset={contentInset}
                      data={frequencies.frequencies}
                      svg={styles.svg}
                      formatLabel={value => `${value} Hz`}
                    />
                    <View style={styles.chartViewContainer}>
                      <AreaChart
                        style={styles.chart}
                        contentInset={contentInset}
                        data={frequencies.frequencies}
                        svg={{ fill: COLORS.background }}
                        curve={shape.curve}
                      >
                        <Grid />
                      </AreaChart>
                      <XAxis
                        data={getXAxis(frequencies.duration)}
                        formatLabel={value => value}
                        contentInset={contentInset}
                        svg={styles.svg}
                      />
                    </View>
                  </View>
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
  chartContainer: {
    height: 300,
    maxHeight: windowHeight / 2,
    flexDirection: 'row',
  },
  chartViewContainer: {
    width: windowWidth - 80,
  },
  chart: {
    height: 300,
  },
  svg: {
    fill: COLORS.background,
    fontSize: 14,
  },
});

export default HomeScreen;
