import express from "express";
import { addIgnoredMovie, addLikedMovie, addWatchlistMovie, changeUserPassword, deleteIgnoredMovies, deleteLikedMovies, deleteUser, deleteUserProfile, deleteWatchlistMovies, getIgnoredMovies, getLikedMovies, getUsers, getWatchlistMovies, loginUser, registerUser, updateUserProfile } from "../Controllers/UserController.js";
// import { protect, admin } from "../middlewares/Auth.js"

import { keycloak } from "../services/keycloak.js";
const router = express.Router();

// PUBLIC ROUTES
router.post("/", registerUser)
router.post("/login", keycloak.protect(), loginUser)

// ******** PRIVATE ROUTES ********
router.put("/", keycloak.protect(), updateUserProfile);
router.delete("/", keycloak.protect(), deleteUserProfile);
router.put("/password", keycloak.protect(), changeUserPassword);

router.get("/favorites", keycloak.protect(), getLikedMovies);
router.post("/favorites", keycloak.protect(), addLikedMovie);
router.delete("/favorites", keycloak.protect(), deleteLikedMovies);

router.get("/watchlist", keycloak.protect(), getWatchlistMovies);
router.post("/watchlist", keycloak.protect(), addWatchlistMovie);
router.delete("/watchlist", keycloak.protect(), deleteWatchlistMovies);

router.get("/ignore", keycloak.protect(), getIgnoredMovies);
router.post("/ignore", keycloak.protect(), addIgnoredMovie);
router.delete("/ignore", keycloak.protect(), deleteIgnoredMovies);

// ******** ADMIN ROUTES ********
router.get("/", keycloak.protect(), keycloak.protect('realm:admin'), getUsers);
router.delete("/:id", keycloak.protect(), keycloak.protect('realm:admin'), deleteUser);

export default router