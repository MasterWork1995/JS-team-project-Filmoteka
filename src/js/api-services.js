const API_KEY = 'b74c0dc966c6718b20701d7c34776374';
export default class ApiServices {
  constructor() {
    this.page = 1;
    this.query = '';
    this.movieId;
  }

  async fetchFindMovies() {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${this.query}&page=${this.page}`;
    const res = await fetch(URL);
    const { results, total_results } = await res.json();

    const totalResults = total_results;
    const newResults = this.newResults(totalResults);
    this.addPage();

    return { results, totalResults, newResults };
  }

  async fetchDetailedMovie() {
    const URL = `https://api.themoviedb.org/3/movie/${this.movieId}?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(URL);
    const obj = await res.json();
    return await obj;
  }

  async fetchPopularMovies() {
    const URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${this.page}`;
    const res = await fetch(URL);
    const { results, total_results } = await res.json();

    const totalResults = total_results;
    const newResults = this.newResults(totalResults);
    this.addPage();

    return { results, totalResults, newResults };
  }

  async fetchGenreMovies() {
    const URL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
    const res = await fetch(URL);
    const obj = await res.json();
    return await obj.genres;
  }

  newResults(number) {
    return number - (this.page * 20) + 20;
  }

  resetPage() {
    this.page = 1;
  }

  addPage() {
    this.page += 1;
  }

  set currentQuery(newQuery) {
    this.query = newQuery;
  }

  get currentQuery() {
    return this.query;
  }

  set currentId(newId) {
    this.movieId = newId;
  }

  get currentId() {
    return this.movieId;
  }
}
