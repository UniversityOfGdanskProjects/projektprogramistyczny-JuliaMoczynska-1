import asyncHandler from "express-async-handler"
import User from "../Models/UserModels.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../middlewares/Auth.js"

// @desc Register user
// @route POST /api/users/
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const {fullName, email, password, image} = req.body

  try {
      const userExists = await User.findOne({email})
      // check if user exists
      if (userExists) {
          res.status(400)
          throw new Error("User already exists")
      }
      //hash password        
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      // create user in DB
      const user = await User.create({
          fullName,
          email,
          password: hashedPassword,
      });

      if (user) {
        res.status(200).json({ created: true });
      } else {
        res.status(200).json({ created: false });
      }
    
  } catch (error) {
      res.status(500).json({ message: "Server Error" });
  }
})

// @desc Login user 
// @route POST /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
    try {
        // find user in DB
        const user = await User.findOne({ email });
        // if user exists compare password with hashed password then send data and token to client
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email:user.email,
                isAdmin: user.isAdmin,
                image: user.image,
                token: generateToken(user._id)
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
    deleteUserProfile, 
    getUsers,
    deleteUser
};