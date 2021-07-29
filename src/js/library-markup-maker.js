import ApiServices from './api-services.js';
import createFilmCard from '../templates/film-card-library.hbs';

const apiServices = new ApiServices();

const libraryList = document.querySelector('.js-library-list');
const btnLibWatched = document.querySelector('.js-button-library-watched');
const btnLibQueue = document.querySelector('.js-button-library-queue');

const parsedWatchedFilmsIds = JSON.parse(localStorage.getItem('watchedFilmsIds'));
const parsedQueueFilmsIds = JSON.parse(localStorage.getItem('queueFilmsIds'));

btnLibWatched.addEventListener('click', () => parseWatchedFilmsMarkup());
btnLibQueue.addEventListener('click', () => parseQueueFilmsMarkup());

function parseWatchedFilmsMarkup() {
  if (parsedWatchedFilmsIds) {
    libraryList.innerHTML = '';
    btnLibWatched.classList.add('focus');
    btnLibQueue.classList.remove('focus');
    parsedWatchedFilmsIds.forEach(loadFilm);
  } else return;
}

function parseQueueFilmsMarkup() {
  if (parsedQueueFilmsIds) {
    libraryList.innerHTML = '';
    btnLibWatched.classList.remove('focus');
    btnLibQueue.classList.add('focus');
    parsedQueueFilmsIds.forEach(loadFilm);
  } else return;
}

function loadFilm(id) {
  apiServices.movieId = id;
  (async () => {
    const detailMovie = await apiServices.fetchDetailedMovie();
    detailMovie.year = detailMovie.release_date ? detailMovie.release_date.split('-')[0] : 'n/a';

    if (detailMovie.genres.length > 3) {
      detailMovie.genres = detailMovie.genres.slice(0, 2).flat().concat({ name: 'Other' });
    }
    parseOneCardMarkup(detailMovie);
  })();
}
function parseOneCardMarkup(films) {
  libraryList.insertAdjacentHTML('beforeend', createFilmCard(films));
}
parseWatchedFilmsMarkup();

// import { onOpenModalFilmCard as onOpenModalFilmCardLib } from '../js/main-markup-maker.js';

// libraryList.addEventListener('click', onOpenModalFilmCardLib);
