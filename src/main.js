import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const loadMoreBtn = document.querySelector('.load-more');

  let query = '';
  let page = 1;
  let totalPages = 0;

  form.addEventListener('submit', async event => {
    event.preventDefault();
    query = event.target.elements.searchQuery.value.trim();

    if (!query) {
      iziToast.warning({ message: 'Please enter a search term' });
      return;
    }

    clearGallery();
    page = 1;
    hideLoadMoreButton();
    showLoader();

    try {
      const data = await getImagesByQuery(query, page);
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'No results',
          message: 'Sorry, there are no images matching your search query.',
        });
        return;
      }

      createGallery(data.hits);
      totalPages = Math.ceil(data.totalHits / 15);

      if (totalPages > 1) {
        showLoadMoreButton();
      }
    } catch (error) {
      hideLoader();
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
      });
    } finally {
      hideLoader();
    }
  });
  document.querySelector('.load-more').addEventListener('click', async () => {
    page++;
    showLoader();
    hideLoadMoreButton();
    try {
      const data = await getImagesByQuery(query, page);
      createGallery(data.hits);

      if (page >= totalPages) {
        hideLoadMoreButton();
        iziToast.info({ message: 'End of search results' });
      } else {
        showLoadMoreButton();
      }
      const cardHeight = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect().height;
      window.scrollBy({ top: cardHeight * 2.5, behavior: 'smooth' });
    } catch (error) {
      iziToast.error({ message: 'Failed to load more images' });
    } finally {
      hideLoader();
    }
  });
});
