import express from "express";
import {
  searchPerson,
  searchMovie,
  searchTvShow,
  searchHistory,
  deleteSearchHistory,
} from "../controllers/search.controllers.js";

const router = express.Router();

router.get("/person/:query", searchPerson);
router.get("/movie/:query", searchMovie);
router.get("/tv/:query", searchTvShow);
router.get("/history", searchHistory);

router.delete("/history/:id", deleteSearchHistory);

export const searchRoutes = router;
