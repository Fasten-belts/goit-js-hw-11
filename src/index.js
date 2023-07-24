import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImages } from './search-api.js';
import { createImageCard } from './create-mark.js';
import { Loading, Notify } from 'notiflix';

const form = document.querySelector('.search-form');
const imageDiv = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let searchQuery = '';

let lb = new SimpleLightbox('.gallery a');

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  loadMoreBtn.style.display = 'none';
  searchQuery = form.elements.searchQuery.value.trim();
  if (searchQuery === '') return;

  currentPage = 1;
  imageDiv.innerHTML = '';

  Loading.hourglass();

  try {
    const data = await fetchImages(searchQuery, currentPage);
    if (data.totalHits === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    createImageCard(data.hits);
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
    lb.refresh();
    showLoadMoreButton(data.totalHits);
  } catch (error) {
    Notify.failure('Error fetching images. Please try again later.');
  } finally {
    Loading.remove();
  }
}

async function onLoadMore() {
  currentPage += 1;

  Loading.hourglass('Loading more images...');
  try {
    const data = await fetchImages(searchQuery, currentPage);
    createImageCard(data.hits);
    lb.refresh();
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
    window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    if (currentPage === Math.round(data.totalHits / 40)) {
      loadMoreBtn.style.display = 'none';
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    }
  } catch (error) {
    Notify.failure('Error loading more images. Please try again later.');
  } finally {
    Loading.remove();
  }
}

function showLoadMoreButton(totalHits) {
  if (currentPage * 40 < totalHits) {
    loadMoreBtn.style.display = 'block';
  }
}
