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
            image,
        });

        // if user created successfully send user data and token client
        if (user) {
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                email:user.email,
                isAdmin: user.isAdmin,
                image: user.image,
                token: generateToken(user._id)
            });
        } else {
      res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.error(error); // Dodaj tę linię
        res.status(500).json({ message: "Server Error" });
    }
})

// @desc Login user 
// @route POST /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
    const {email, password } = req.body
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

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private


export { registerUser, loginUser };