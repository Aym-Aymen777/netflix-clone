// utils/fetchFromTMDB.js
import tmdbAxios from "./TMDBAXIOS.service.js";

export const fetchFromTMDB = async (path, params = {}) => {
  try {
    const { data } = await tmdbAxios.get(path, { params });
    return data;
  } catch (error) {
    console.error("TMDB API Error:", error.message);
    throw new Error("Failed to fetch from TMDB: " + error.message);
  }
};
