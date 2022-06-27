const axios = require("axios").default;
import {
  TMDB_Base_URL,
  TMDB_API_KEY,
  TMDB_Image_Base_URL,
  EndPoints,
  Youtube_Base_URL,
} from "../constants/Urls";

const TMDB_Http_Request = axios.create({
  baseURL: TMDB_Base_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});



const getNowPlayingMovies = () =>
  TMDB_Http_Request.get(EndPoints.Now_Playing_Movies);

const getUpcomingMovies = () =>
  TMDB_Http_Request.get(EndPoints.Upcoming_Movies);

const getMovieById = (movieId, append_to_response = "") =>
  TMDB_Http_Request.get(
    `${EndPoints.Movies}/${movieId}?language=es`,
    append_to_response ? { params: { append_to_response } } : null
  );

const getAllGenres = () => TMDB_Http_Request.get(EndPoints.Genres);

const getPoster = (path) => `${TMDB_Image_Base_URL}/original${path}`;

const getVideo = (key) => `${Youtube_Base_URL}?v=${key}`;

export {
  getNowPlayingMovies,
  getUpcomingMovies,
  getAllGenres,
  getMovieById,
  getPoster,
  getVideo,
};
