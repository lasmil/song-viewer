import { BACKEND_API } from '@env';
import { getSongDuration, getFrequencyArray } from '../src/api/analyze';

function FormDataMock() {
  this.append = jest.fn();
}
global.FormData = FormDataMock;

test('getSongDuration', async () => {
  const file = {
    uri: 'test/uri.mp3',
    name: 'test.mp3',
    type: 'audio/mp3',
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          duration: 5,
        }),
    })
  );

  const songDuration = await getSongDuration(file);
  expect(songDuration.duration).toBe(5);

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(
    `${BACKEND_API}/api/getSongDuration`,
    {
      method: 'POST',
      body: {
        append: expect.any(Function),
      },
    }
  );

  global.fetch.mockClear();
  delete global.fetch;
});

test('getFrequencyArray', async () => {
  const file = {
    uri: 'test/uri.mp3',
    name: 'test.mp3',
    type: 'audio/mp3',
  };

  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          duration: 5,
        }),
    })
  );

  const frequencyArray = await getFrequencyArray({
    file,
    songPart: 1,
    totalParts: 5,
  });
  expect(frequencyArray.duration).toBe(5);

  expect(global.fetch).toHaveBeenCalledTimes(1);
  expect(global.fetch).toHaveBeenCalledWith(
    `${BACKEND_API}/api/getFrequencyArray`,
    {
      method: 'POST',
      body: {
        append: expect.any(Function),
      },
      headers: {
        songpart: 1,
        totalparts: 5,
      },
    }
  );

  global.fetch.mockClear();
  delete global.fetch;
});
