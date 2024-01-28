import express from "express";
import { protect, admin } from "../middlewares/Auth.js";
import * as categoriesController from "../Controllers/CategoriesController.js";

const router = express.Router();

// ************ PUBLIC ROUTES ************
router.get("/", categoriesController.getCategories);

// ************ ADMIN ROUTES ************
router.post("/", protect, admin, categoriesController.createCategory);

export default router;
