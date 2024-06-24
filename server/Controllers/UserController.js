import asyncHandler from "express-async-handler"
import User from "../Models/UserModels.js"
import bcrypt from "bcryptjs"
// import keycloak from '../services/keycloak.js'
import { generateToken } from "../middlewares/Auth.js"
// import { registerUserInKeycloak } from '../services/keycloakService.js';

// @desc Register user
// @route POST /api/users/
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, image } = req.body;

  try {
    // Sprawdzenie, czy użytkownik już istnieje w bazie danych lokalnej
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Dane użytkownika do zarejestrowania w Keycloak
    // const userData = {
    //   username: fullName,
    //   email: email,
    //   enabled: true, 
    //   credentials: [{
    //     type: 'password',
    //     value: password,
    //     temporary: false
    //   }],
    // };

    // Rejestracja użytkownika w Keycloak
    // const keycloakUser = await registerUserInKeycloak(userData);

    // Haszowanie hasła dla bazy danych lokalnej
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Zapis użytkownika w bazie danych lokalnej
    const userDB = await User.create({
      fullName,
      email,
      password: hashedPassword,
      image,
    });

    // Odpowiedź z sukcesem
    res.status(201).json({
      _id: userDB._id,
      fullName: userDB.fullName,
      email: userDB.email,
      isAdmin: userDB.isAdmin,
      image: userDB.image,
      // token: generateToken(userDB._id),
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});


// const registerUser = asyncHandler(async (req, res) => {
//     const {fullName, email, password, image} = req.body
//     try {
//         const userExists = await User.findOne({email})
//         // check if user exists
//         if (userExists) {
//             res.status(400)
//             throw new Error("User already exists")
//         }
//         //hash password        
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
        
//         // create user in DB
//         const user = await User.create({
//             fullName,
//             email,
//             password: hashedPassword,
//             image,
//         });

//         // if user created successfully send user data and token client
//         if (user) {
//             res.status(201).json({
//                 _id: user._id,
//                 fullName: user.fullName,
//                 email:user.email,
//                 isAdmin: user.isAdmin,
//                 image: user.image,
//                 token: generateToken(user._id)
//             });
//         } else {
//       res.status(400).json({ message: "Invalid user data" });
//         }
//     } catch (error) {
//         res.status(500).json({ message: "Server Error" });
//     }
// })

// @desc Login user 
// @route POST /api/users/login
// @access Public

// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;

//   try {
//       const user = await User.findOne({ email });
//       if (!user) {
//           res.status(401);
//           throw new Error("Invalid email or password");
//       }

//       keycloak.login({
//           username: email,
//           password: password,
//       }, async function(err, userKeycloak) {
//           if (err) {
//               console.error('Błąd logowania:', err);
//               res.status(500).json({ error: 'Internal Server Error' });
//           } else {
//               // Użytkownik został uwierzytelniony pomyślnie w Keycloak

//               // Sprawdź, czy hasło użytkownika pasuje do hasła w bazie danych
//               const passwordMatched = await bcrypt.compare(password, user.password);

//               // Jeśli hasło się nie zgadza, zwróć błąd
//               if (!passwordMatched) {
//                   res.status(401);
//                   throw new Error("Invalid email or password");
//               }
//               if (userKeycloak && (await bcrypt.compare(password, user.password))) {
//                 // Zwróć dane użytkownika i token JWT z Keycloak
//                 res.json({
//                     _id: user._id,
//                     fullName: user.fullName,
//                     email: user.email,
//                     isAdmin: user.isAdmin,
//                     image: user.image,
//                     // token: userKeycloak.access_token // Użyj tokena dostępu z Keycloak
//                     token: generateToken(user._id)
//                 });
//               }
//           }
//       });
//   } catch (error) {
//       res.status(400).json({ message: error.message });
//   }
// });

const loginUser = asyncHandler(async (req, res) => {
    try {
        // find user in DB
        const { email } = req.kauth.grant.access_token.content;
        const user = await User.findOne({ email });

        if (user) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email:user.email,
                isAdmin: user.isAdmin,
                image: user.image,
                // token: generateToken(user._id)
            });
        //if user not found or password not match send error message
        } else {
            res.status(401);
            throw new Error("Invalid email or password");
        } 
    } catch (error) {
        res.status(400).json({ message: error.message})
    }
});

// ************ PRIVATE CONTROLLERS ***********

// @desc Update user profile
// @route PUT /api/use rs/profile
// @access Private

const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullName, email, image } = req.body;
    try {
      // find user in DB
      const user = await User.findById(req.user._id);
      // if user exists update user data and save it in DB
      if (user) {
        user.fullName = fullName || user.fullName;
        user.email = email || user.email;
        user.image = image || user.image;
  
        const updatedUser = await user.save();
        // .save(); > send updated user data and token to client
        res.json({
          _id: updatedUser._id,
          fullName: updatedUser.fullName,
          email: updatedUser.email,
          image: updatedUser.image,
          // isAdmin: updatedUser.isAdmin,
          // token: generateToken(updatedUser._id),
        });
      }
      // else send error message
      else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// @desc Delete user profile
// @route DELETE /api/users
// @access Private
const deleteUserProfile = asyncHandler(async (req, res) => {
    try {
      // find user in DB
      const user = await User.findById(req.user._id);
      // if user exists delete user from DB
      if (user) {
        // if user is admin throw error message
        if (user.isAdmin) {
          res.status(400);
          throw new Error("Can't delete admin user");
        }
        // else delete user from DB
        await user.remove();
        res.json({ message: "User deleted successfully" });
      }
      // else send error message
      else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// @desc Change user password
// @route PUT /api/users/password
// @access Private
const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
      // find user in DB
      const user = await User.findById(req.user._id);
      // if user exists compare old password with hashed password then update user password and save it in DB
      if (user && (await bcrypt.compare(oldPassword, user.password))) {
        // hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.json({ message: "Password changed!!" });
      }
      // else send error message
      else {
        res.status(401);
        throw new Error("Invalid old password");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});


// LIKED MOVIES 

// @desc Get all liked movies
// @route GET /api/users/favorites
// @access Private
const getLikedMovies = asyncHandler(async (req, res) => {
    try {
      // find user in DB
      const user = await User.findById(req.user._id).populate("likedMovies");
      // if user exists send liked movies to client
      if (user) {
        res.json(user.likedMovies);
      }
      // else send error message
      else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// @desc Add movie to liked movies
// @route POST /api/users/favorites
// @access Private
const addLikedMovie = asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    try {
      // find user in DB
      const user = await User.findById(req.user._id);
      // if user exists add movie to liked movies and save it in DB
      if (user) {
        // check if movie already liked
        // if movie already liked send error message
        if (user.likedMovies.includes(movieId)) {
          res.status(400);
          throw new Error("Movie already liked");
        }
        // else add movie to liked movies and save it in DB
        user.likedMovies.push(movieId);
        await user.save();
        res.json(user.likedMovies);
      }
      // else send error message
      else {
        res.status(404);
        throw new Error("Movie not found");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});
  
// @desc Delete all liked movies
// @route DELETE /api/users/favorites
// @access Private
const deleteLikedMovies = asyncHandler(async (req, res) => {
    try {
      // find user in DB
      const user = await User.findById(req.user._id);
      // if user exists delete all liked movies and save it in DB
      if (user) {
        user.likedMovies = [];
        await user.save();
        res.json({ message: "Your favorites movies deleted successfully" });
      }
      // else send error message
      else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});


//  WATCHLIST MOVIES 

// @desc Get all watchlist movies
// @route GET /api/users/watchlist
// @access Private
const getWatchlistMovies = asyncHandler(async (req, res) => {
    try {
      // find user in DB
      const user = await User.findById(req.user._id).populate("watchlistMovies");
      // if user exists send watchlist movies to client
      if (user) {
        res.json(user.watchlistMovies);
      }
      // else send error message
      else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// @desc Add movie to watchlist movies
// @route POST /api/users/watchlist
// @access Private
const addWatchlistMovie = asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    try {
      // find user in DB
      const user = await User.findById(req.user._id);
      // if user exists add movie to watchlist and save it in DB
      if (user) {
        // check if movie already added
        // if movie already added send error message
        if (user.watchlistMovies.includes(movieId)) {
          res.status(400);
          throw new Error("Movie already added to watchlist");
        }
        // else add movie to watchlist and save it in DB
        user.watchlistMovies.push(movieId);
        await user.save();
        res.json(user.watchlistMovies);
      }
      // else send error message
      else {
        res.status(404);
        throw new Error("Movie not found");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});
  
// @desc Delete all watchlist movies
// @route DELETE /api/users/watchlist
// @access Private
const deleteWatchlistMovies = asyncHandler(async (req, res) => {
    try {
      // find user in DB
      const user = await User.findById(req.user._id);
      // if user exists delete watchlist and save it in DB
      if (user) {
        user.watchlistMovies = [];
        await user.save();
        res.json({ message: "Your watchlist deleted successfully" });
      }
      // else send error message
      else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});


//  IGNORED MOVIES 

// @desc Get all ignored movies
// @route GET /api/users/ignore
// @access Private
const getIgnoredMovies = asyncHandler(async (req, res) => {
    try {
      // find user in DB
      const user = await User.findById(req.user._id).populate("ignoredMovies");
      // if user exists send ignored movies to client
      if (user) {
        res.json(user.ignoredMovies);
      }
      // else send error message
      else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// @desc Add movie to ignored movies
// @route POST /api/users/ignore
// @access Private
const addIgnoredMovie = asyncHandler(async (req, res) => {
    const { movieId } = req.body;
    try {
      // find user in DB
      const user = await User.findById(req.user._id);
      // if user exists add movie to ignored movies and save it in DB
      if (user) {
        // check if movie already ignored
        // if movie already ignored send error message
        if (user.ignoredMovies.includes(movieId)) {
          res.status(400);
          throw new Error("Movie already ignored");
        }
        // else add movie to ignored movies and save it in DB
        user.ignoredMovies.push(movieId);
        await user.save();
        res.json(user.ignoredMovies);
      }
      // else send error message
      else {
        res.status(404);
        throw new Error("Movie not found");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});
  
// @desc Delete all ignored movies
// @route DELETE /api/users/ignore
// @access Private
const deleteIgnoredMovies = asyncHandler(async (req, res) => {
    try {
      // find user in DB
      const user = await User.findById(req.user._id);
      // if user exists delete all ignored movies and save it in DB
      if (user) {
        user.ignoredMovies = [];
        await user.save();
        res.json({ message: "Your ignored movies deleted successfully" });
      }
      // else send error message
      else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

//  ************** ADMIN CONTROLLERS **************

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    try {
      // find all users in DB
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    try {
      // find user in DB
      const user = await User.findById(req.params.id);
      // if user exists delete user from DB
      if (user) {
        // if user is admin throw error message
        if (user.isAdmin) {
          res.status(400);
          throw new Error("Can't delete admin user");
        }
        // else delete user from DB
        await user.deleteOne();
        res.json({ message: "User deleted successfully" });
      }
      // else send error message
      else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

export { 
    registerUser,
    loginUser,
    updateUserProfile, 
    deleteUserProfile, 
    changeUserPassword, 
    getLikedMovies, 
    getWatchlistMovies, 
    getIgnoredMovies, 
    addLikedMovie, 
    deleteLikedMovies, 
    addWatchlistMovie, 
    deleteWatchlistMovies,
    addIgnoredMovie, 
    deleteIgnoredMovies,
    getUsers,
    deleteUser
};