import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    image: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },    
    likedMovies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
        },    
    ],
    watchlistMovies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
        },    
    ],
    ignoredMovies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Movie",
        },    
    ],
},
{
    timestamps: true,
}
);

export default mongoose.model("User", UserSchema);
