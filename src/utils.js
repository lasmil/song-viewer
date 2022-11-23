import { Platform } from 'react-native';
import { SONG_DURATION_THRESHOLD_SECONDS } from './constants';

export const getMaxFrequency = frequencies => {
  let max = 0;

  if (frequencies?.length > 0) {
    for (let i = 0; i < frequencies.length; i++) {
      if (frequencies[i] > max) {
        max = frequencies[i];
      }
    }
  }

  return parseInt(max + 50, 10);
};

export const getXAxis = duration => {
  const xAxis = [];
  for (let i = 0; i <= duration; i++) {
    xAxis.push(i);
  }

  return xAxis;
};

export const getSongParts = ({ songDuration }) => {
  if (songDuration <= 0) {
    return 0;
  }
  let addedValue = 1;
  if ((songDuration / SONG_DURATION_THRESHOLD_SECONDS) % 1 === 0) {
    addedValue = 0;
  }

  return (
    parseInt(songDuration / SONG_DURATION_THRESHOLD_SECONDS, 10) + addedValue
  );
};

export const transformFrequencies = frequencies => {
  const transformedFrequencies = [];

  for (let i = 0; i < frequencies.length; i++) {
    transformedFrequencies.push({
      x: i,
      y: parseInt(frequencies[i], 10),
    });
  }

  return transformedFrequencies;
};

export const isIOS = () => {
  const platform = Platform.OS;
  return platform === 'ios';
};
