import { MoviesData } from "../Data/MovieData.js"
import Movie from "../Models/MoviesModel.js";
import asyncHandler from "express-async-handler";

// ************ PUBLIC CONTROLLERS ************
// @desc    import movies
// @route   POST /api/movies/import
// @access  Public

const importMovies = asyncHandler(async (req, res) => {
  // first we make sure our Movies table is empty by delete all documents
  await Movie.deleteMany({});
  // then we insert all movies from MoviesData
  const movies = await Movie.insertMany(MoviesData);
  res.status(201).json(movies);
});

export {
    importMovies,
}