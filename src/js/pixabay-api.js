import axios from 'axios';

const API_KEY = '49659545-2259a1a5c522b42738e4f2b2d';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return response.data;
}
