import { fetchFromTMDB } from "../services/TMDB.service.js";

export const getTrendingTvShow = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const randomTvShow = data.results[Math.floor(Math.random() * data.results?.length)];
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "cannot get TvShow details" });
    }
    res.status(200).json({ success: true, data: randomTvShow});
  } catch (error) {
    console.log("error in getTrendingTvShow controller : ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getTvShowTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "cannot get TvShow details" });
    }
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log("error in  getTvShowTrailers controller : ", error.message);
    if (error.message.includes("404")) {
      return res.status(404).json({ success: true, data: null });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getTvShowDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "cannot get TvShow details" });
    }
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log("error in getTvShowDetails controller : ", error.message);
    if (error.message.includes("404")) {
      return res.status(404).json({ success: true, data: null });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSimilarTvShows = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "cannot get TvShow details" });
    }
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log("error in getSimilarTvShows controller : ", error.message);
    if (error.message.includes("404")) {
      return res.status(404).json({ success: true, data: null });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getTvShowsCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
    if (!data) {
      return res
        .status(400)
        .json({ success: false, message: "cannot get TvShow details" });
    }
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log("error in getTvShowsCategory  controller : ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


