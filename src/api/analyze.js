import { BACKEND_API } from '@env';

export const getFrequencyArray = async ({ file, songPart, totalParts }) => {
  const body = new FormData();
  body.append('file', file);

  const url = `${BACKEND_API}/api/getFrequencyArray`;
  const response = await fetch(url, {
    method: 'POST',
    body,
    headers: {
      songpart: songPart,
      totalparts: totalParts,
    },
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
};

export const getSongDuration = async file => {
  const body = new FormData();
  body.append('file', file);

  const url = `${BACKEND_API}/api/getSongDuration`;
  const response = await fetch(url, {
    method: 'POST',
    body,
  });

  if (!response.ok) {
    return {
      duration: 0,
    };
  }

  return response.json();
};
