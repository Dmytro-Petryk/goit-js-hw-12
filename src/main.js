import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = form.elements['search-text'];

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      title: 'Oops',
      message: 'Please enter a search term!',
    });
    return;
  }

  clearGallery();
  showLoader(); // <--- тут з'являється лоадер і текст

  try {
    const data = await getImagesByQuery(query);
    hideLoader(); // <--- після відповіді бекенду ховаємо

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query.',
      });
      return;
    }

    createGallery(data.hits);
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
    });
  }
});
