import React, { useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  Chart,
  VerticalAxis,
  HorizontalAxis,
  Area,
  Line,
  Tooltip,
} from 'react-native-responsive-linechart';
import { COLORS, CHART_WINDOW_THRESHOLD_SECONDS } from '../../constants';
import { transformFrequencies } from '../../utils';

import arrowLight from '../../../assets/arrow-light.png';
import arrowDark from '../../../assets/arrow-dark.png';
import { useSettings } from '../../context/SettingsProvider';

const windowHeight = Dimensions.get('window').height;

export const FrequencyChart = ({ frequencies, duration, maxFrequency }) => {
  const { themeMode } = useSettings();
  const isDarkMode = themeMode === 'dark';

  const [currentView, setCurrentView] = useState({
    start: 0,
    end: CHART_WINDOW_THRESHOLD_SECONDS,
  });

  const axisStyle = {
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    color: isDarkMode ? COLORS.lighter : COLORS.background,
  };

  const chartStyle = {
    backgroundColor: isDarkMode ? COLORS.darker : COLORS.lighter,
  };

  // use currentView to calculate the start and end index of the frequencies array
  const startIndex = Math.floor(
    (currentView.start / duration) * frequencies.length
  );
  const endIndex = Math.floor(
    (currentView.end / duration) * frequencies.length
  );

  const slicedFrequencies = frequencies.slice(startIndex, endIndex);

  return (
    <View style={styles.frequenciesContainer}>
      <TouchableOpacity
        style={[currentView.start === 0 && styles.disabled]}
        disabled={currentView.start === 0}
        onPress={() => {
          setCurrentView({
            start: currentView.start - CHART_WINDOW_THRESHOLD_SECONDS,
            end: currentView.end - CHART_WINDOW_THRESHOLD_SECONDS,
          });
        }}
      >
        <Image
          source={isDarkMode ? arrowDark : arrowLight}
          style={styles.image}
        />
      </TouchableOpacity>
      <Chart
        style={[styles.chartContainer, chartStyle]}
        data={transformFrequencies(slicedFrequencies)}
        padding={{ left: 80, bottom: 20, right: 20, top: 20 }}
        xDomain={{ min: 0, max: slicedFrequencies.length }}
        yDomain={{ min: 0, max: maxFrequency }}
      >
        <VerticalAxis
          tickCount={20}
          theme={{
            labels: {
              formatter: v => `${parseInt(v, 10)} Hz`,
              label: axisStyle,
            },
          }}
        />
        <HorizontalAxis
          tickCount={2}
          theme={{
            labels: {
              formatter: v => {
                // get time from start seconds
                let minutes = Math.floor(
                  Math.min(currentView.end, duration) / 60
                );
                let seconds = Math.floor(
                  Math.min(currentView.end, duration) % 60
                );

                if (v === 0) {
                  minutes = Math.floor(currentView.start / 60);
                  seconds = Math.floor(currentView.start % 60);
                }

                // format minutes and seconds
                minutes = minutes < 10 ? `0${minutes}` : minutes;
                seconds = seconds < 10 ? `0${seconds}` : seconds;

                return `${minutes}:${seconds}`;
              },
              label: axisStyle,
            },
          }}
        />
        <Area
          theme={{
            gradient: {
              from: { color: isDarkMode ? COLORS.lighter : COLORS.background },
              to: {
                color: isDarkMode ? COLORS.lighter : COLORS.background,
                opacity: 0.8,
              },
            },
          }}
        />
        <Line
          tooltipComponent={<Tooltip />}
          theme={{
            stroke: {
              color: isDarkMode ? COLORS.lighter : COLORS.background,
              width: 1,
            },
            scatter: {
              default: {
                width: 2,
                height: 2,
                rx: 2,
                color: isDarkMode ? COLORS.lighter : COLORS.background,
              },
              selected: { color: isDarkMode ? COLORS.white : COLORS.black },
            },
          }}
        />
      </Chart>
      <TouchableOpacity
        style={[currentView.end >= duration && styles.disabled]}
        disabled={currentView.end >= duration}
        onPress={() => {
          setCurrentView({
            start: currentView.start + CHART_WINDOW_THRESHOLD_SECONDS,
            end: currentView.end + CHART_WINDOW_THRESHOLD_SECONDS,
          });
        }}
      >
        <Image
          source={isDarkMode ? arrowDark : arrowLight}
          style={[styles.image, styles.rightArrow]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    height: 300,
    maxHeight: windowHeight / 2,
    flex: 1,
  },
  image: {
    width: 40,
    height: 40,
  },
  rightArrow: {
    transform: [{ rotate: '180deg' }],
  },
  frequenciesContainer: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
