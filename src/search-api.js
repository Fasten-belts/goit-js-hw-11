import axios from 'axios';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function fetchImages(searchQuery, currentPage) {
  const params = new URLSearchParams({
    key: '38416379-238676dbcbb7f9c6c32e98c6d',
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: currentPage,
    per_page: 40,
  });

  Loading.hourglass();

  return await axios.get(`?${params}`).then(async response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return await response.data;
  });
}

export { fetchImages };
