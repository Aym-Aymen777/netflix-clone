// utils/tmdbAxios.js
import axios from "axios";
import { envVars } from "../utils/envVars.js";

const tmdbAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + envVars.TMDB_API_KEY,
  },
});

export default tmdbAxios;
