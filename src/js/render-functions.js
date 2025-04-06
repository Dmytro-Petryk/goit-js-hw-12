import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
  const markup = images
    .map(
      image => `
    <li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img class="images" src="${image.webformatURL}" alt="${image.tags}" />
      </a>
      <div class="info">
        <p><b>Likes:</b><br> ${image.likes}</p>
        <p><b>Views:</b><br>${image.views}</p>
        <p><b>Comments:</b><br> ${image.comments}</p>
        <p><b>Downloads:</b><br> ${image.downloads}</p>
      </div>
    </li>
  `
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
export function clearGallery() {
  galleryContainer.innerHTML = '';
}

const loaderContainer = document.querySelector('.loader-container');

export function showLoader() {
  loaderContainer.classList.add('visible');
}

export function hideLoader() {
  loaderContainer.classList.remove('visible');
}
