import express from "express";
import { deleteUser, deleteUserProfile, getUsers, loginUser, registerUser } from "../Controllers/UserController.js";
import { protect, admin } from "../middlewares/Auth.js"
import { keycloak } from "../services/keycloak.js";

const router = express.Router();

// PUBLIC ROUTES
router.post("/", registerUser)
router.post("/login", loginUser)

// ******** PRIVATE ROUTES ********
router.delete("/", protect, deleteUserProfile);

// ******** ADMIN ROUTES ********
router.delete("/:id", protect, admin, deleteUser);
router.get("/", keycloak.protect(), keycloak.protect('realm:admin'), getUsers);

export default router