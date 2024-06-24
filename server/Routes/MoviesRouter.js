import express from "express";
// import { protect, admin } from "../middlewares/Auth.js";
import * as moviesController from "../Controllers/MoviesController.js";

import { keycloak } from "../services/keycloak.js";

const router = express.Router();

// ******** PUBLIC ROUTES ********
router.post("/import", moviesController.importMovies);
router.get("/", moviesController.getMovies);
router.get("/:id", moviesController.getMovieById);
router.get("/rated/top", moviesController.getTopRatedMovies);
router.get("/random/all", moviesController.getRandomMovies);

// ******** PRIVATE ROUTES ********
router.post("/:id/reviews", keycloak.protect(), moviesController.createMovieReview);

// ******** ADMIN ROUTES ********
router.put("/:id", keycloak.protect(), keycloak.protect('realm:admin'), moviesController.updateMovie);
router.delete("/:id", keycloak.protect(), keycloak.protect('realm:admin'), moviesController.deleteMovie);
router.delete("/", keycloak.protect(), keycloak.protect('realm:admin'), moviesController.deleteAllMovies);
router.post("/", keycloak.protect(), keycloak.protect('realm:admin'), moviesController.createMovie);

export default router;
