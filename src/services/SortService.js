import {TMDB_API_KEY} from "../constants/Urls";

const genres = {
 "All": "All",
  12: 'Aventura',
  14: 'Fantasia',
  16: 'Animación',
  18: 'Drama',
  27: 'Horror',
  28: 'Acción',
  35: 'Comedia',
  36: 'Historía',
  37: 'Viejo Oeste',
  53: 'Thriller',
  80: 'Crimen',
  99: 'Documentales',
  878: 'Ciencía Ficción',
  9648: 'Misterio',
  10402: 'Musica',
  10749: 'Romance',
  10751: 'Familia',
  10752: 'Guerra',
  10770: 'TV',
};

const genresT = {
  "Todos": "All",
  'Aventura': 12,
  'Fantasía': 14,
  'Animación': 16,
  'Drama': 18,
  'Terror': 27,
  'Acción': 28,
  'Comedia': 35,
  'Historia': 36,
  'Western': 37,
  'Thriller': 53,
  'Crimen': 80,
  'Documental': 99,
  'Ciencia ficción': 878,
  'Suspense': 9648,
  'Misterio': 9648,
  'Música': 10402,
  'Romance': 10749,
  'Familia': 10751,
  'Bélica': 10752,
  'Película de TV': 10770,
 };



const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=es&sort_by=popularity.desc&page=1`;
const getImagePath = (path) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;



  export const getMovies = async ({activeGenre, setLoadingS}) => {

    const { results } = await fetch(`${API_URL}&with_genres=${genresT[activeGenre]}`).then((x) => x.json());
    const movies = results.map(
      ({
        id,
        title,
        poster_path,
        backdrop_path,
        vote_average,
        overview,
        release_date,
        genre_ids,
      }) => ({
        key: String(id),
        title: title,
        poster: getImagePath(poster_path),
        backdrop: (!getBackdropPath(backdrop_path)) ? getImagePath(poster_path) : getBackdropPath(backdrop_path),
        rating: vote_average,
        description: overview,
        releaseDate: release_date,
        genres: genre_ids.map((genre) => genres[genre]),
      })
    );
    
    setLoadingS(false)
    return movies;
  }
