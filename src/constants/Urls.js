const config = require("../../package.json");

const TMDB_Base_URL = "https://api.themoviedb.org/3";
const TMDB_Image_Base_URL = "https://image.tmdb.org/t/p";
const Youtube_Base_URL = "https://www.youtube.com/watch";

const TMDB_API_KEY = config.projectConfig.apiKey;

const EndPoints = {
  Now_Playing_Movies: "/movie/now_playing?language=es",
  Upcoming_Movies: "/movie/upcoming?language=es?limit=20",
  Genres: "/genre/movie/list?language=es",
  Movies: "/movie",
};

const Append_To_Response = {
  Videos: "videos",
  Credits: "credits",
  Recommendations: "recommendations",
  Similar: "similar",
};

export {
  TMDB_Base_URL,
  TMDB_API_KEY,
  TMDB_Image_Base_URL,
  EndPoints,
  Append_To_Response,
  Youtube_Base_URL,
};
