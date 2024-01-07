import express from "express";
import { addIgnoredMovie, addLikedMovie, addWatchlistMovie, changeUserPassword, deleteIgnoredMovies, deleteLikedMovies, deleteUser, deleteUserProfile, deleteWatchlistMovies, getIgnoredMovies, getLikedMovies, getUsers, getWatchlistMovies, loginUser, registerUser, updateUserProfile } from "../Controllers/UserController.js";
import { protect, admin } from "../middlewares/Auth.js"

const router = express.Router();

// PUBLIC ROUTES
router.post("/", registerUser)
router.post("/login", loginUser)

// ******** PRIVATE ROUTES ********
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);

router.get("/favorites", protect, getLikedMovies);
router.post("/favorites", protect, addLikedMovie);
router.delete("/favorites", protect, deleteLikedMovies);

router.get("/watchlist", protect, getWatchlistMovies);
router.post("/watchlist", protect, addWatchlistMovie);
router.delete("/watchlist", protect, deleteWatchlistMovies);

router.get("/ignore", protect, getIgnoredMovies);
router.post("/ignore", protect, addIgnoredMovie);
router.delete("/ignore", protect, deleteIgnoredMovies);

// ******** ADMIN ROUTES ********
router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUser);

export default router