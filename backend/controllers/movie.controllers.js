import { fetchFromTMDB } from "../services/TMDB.service.js";

export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "cannot get movie details" });
    }
    res.status(200).json({ success: true, data: randomMovie});
  } catch (error) {
    console.log("error in getTrendingMovie controller : ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getMovieTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "cannot get movie details" });
    }
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log("error in  getMovieTrailers controller : ", error.message);
    if (error.message.includes("404")) {
      return res.status(404).json({ success: true, data: null });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "cannot get movie details" });
    }
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log("error in getMovieDetails controller : ", error.message);
    if (error.message.includes("404")) {
      return res.status(404).json({ success: true, data: null });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSimilarMovies = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "cannot get movie details" });
    }
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log("error in getSimilarMovies controller : ", error.message);
    if (error.message.includes("404")) {
      return res.status(404).json({ success: true, data: null });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getMoviesCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "cannot get movie details" });
    }
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log("error in getMoviesCategory  controller : ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


