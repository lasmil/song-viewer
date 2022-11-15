import { BACKEND_API } from '@env';

export const getFrequencyArray = async file => {
  const body = new FormData();
  body.append('file', file);

  const response = await fetch(`${BACKEND_API}/api/getFrequencyArray`, {
    method: 'POST',
    body,
  });

  return response.json();
};
