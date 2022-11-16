import { Colors } from 'react-native/Libraries/NewAppScreen';

export const SCREENS = {
  HOME: 'Home',
  SETTINGS: 'Settings',
};

export const COLORS = {
  ...Colors,
  background: '#3e3f3e',
};

export const SONG_DURATION_THRESHOLD_SECONDS = 20;

export const SKELETON_LAYOUT = [
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
];

export const CHART_WINDOW_THRESHOLD_SECONDS = 5;
