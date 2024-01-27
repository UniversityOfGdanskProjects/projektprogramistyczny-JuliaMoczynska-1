import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    userImage: { type: String },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const roomSchema = mongoose.Schema(
  {
    userName: { type: String, required: true },
    message: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const moviesSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    titleImage: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    video: {
      type: String,
      required: false,
    },
    rate: {
      type: Number,
      required: false,
      default: 0,
    },
    numberOfReviews: {
      type: Number,
      required: false,
      default: 0,
    },
    reviews: [reviewSchema],
    casts: [
      {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        photo: { type: String, required: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Movie", moviesSchema);
