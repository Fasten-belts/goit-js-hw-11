function createImageCard(data) {
  const imageCardsContainer = document.querySelector('.gallery');

  const cardHTML = data
    .map(
      image => `
      <a href="${image.largeImageURL}"><div class="photo-card">
      <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${image.likes}</p>
        <p class="info-item"><b>Views:</b> ${image.views}</p>
        <p class="info-item"><b>Comments:</b> ${image.comments}</p>
        <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
      </div>
    </div></a>
  `
    )
    .join('');

  imageCardsContainer.insertAdjacentHTML('beforeend', cardHTML);
}

export { createImageCard };
