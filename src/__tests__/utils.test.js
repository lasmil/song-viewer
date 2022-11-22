import {
  getMaxFrequency,
  getXAxis,
  getSongParts,
  transformFrequencies,
} from '../utils';

test('getMaxFrequency', () => {
  const frequencies = [1, 2, 3, 4, 5];
  const maxFrequency = getMaxFrequency(frequencies);
  expect(maxFrequency).toBe(55);
});

test('getMaxFrequency with empty or null array', () => {
  const frequencies = [];
  const maxFrequency = getMaxFrequency(frequencies);
  expect(maxFrequency).toBe(50);
});

test('getMaxFrequency with random unordered values', () => {
  const frequencies = [5, 3, 1, 4, 2];
  const maxFrequency = getMaxFrequency(frequencies);
  expect(maxFrequency).toBe(55);
});

test('getXAxis', () => {
  const xAxis = getXAxis(5);
  expect(xAxis).toEqual([0, 1, 2, 3, 4, 5]);
});

test('getXAxis where the duration is a big number', () => {
  const xAxis = getXAxis(100000);
  expect(xAxis.length).toBe(100001);
});

test('getXAxis where the duration is a negative number', () => {
  const xAxis = getXAxis(-100000);
  expect(xAxis).toEqual([]);
});

test('getSongParts', () => {
  const songParts = getSongParts({ songDuration: 100 });
  expect(songParts).toBe(5);
});

test('getSongParts where the song duration is a big number', () => {
  const songParts = getSongParts({ songDuration: 100000 });
  expect(songParts).toBe(5000);
});

test('getSongParts where the song duration is 0', () => {
  const songParts = getSongParts({ songDuration: 0 });
  expect(songParts).toBe(0);
});

test('transformFrequencies', () => {
  const frequencies = [1, 2, 3, 4, 5];
  const transformedFrequencies = transformFrequencies(frequencies);
  expect(transformedFrequencies).toEqual([
    { x: 0, y: 1 },
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 4 },
    { x: 4, y: 5 },
  ]);
});

test('transformFrequencies with empty or null array', () => {
  const frequencies = [];
  const transformedFrequencies = transformFrequencies(frequencies);
  expect(transformedFrequencies).toEqual([]);
});

test('transformFrequencies with random unordered values', () => {
  const frequencies = [5, 3, 1, 4, 2];
  const transformedFrequencies = transformFrequencies(frequencies);
  expect(transformedFrequencies).toEqual([
    { x: 0, y: 5 },
    { x: 1, y: 3 },
    { x: 2, y: 1 },
    { x: 3, y: 4 },
    { x: 4, y: 2 },
  ]);
});
