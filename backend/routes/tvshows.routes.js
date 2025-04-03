import express from "express";
import {
  getTvShowDetails,
  getTvShowsCategory,
  getTvShowTrailers,
  getSimilarTvShows,
  getTrendingTvShow,
} from "../controllers/tvshow.controllers.js";

const router = express.Router();

router.get("/trending", getTrendingTvShow);
router.get("/:id/trailers", getTvShowTrailers);
router.get("/:id/details", getTvShowDetails);
router.get("/:id/similar", getSimilarTvShows);
router.get("/:category", getTvShowsCategory);

export const tvShowsRoutes = router;