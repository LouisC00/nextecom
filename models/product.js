import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import Category from "@/models/category";
import Tag from "@/models/tag";
import User from "@/models/user";

const ratingSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      maxLength: 2000,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 250,
      text: true,
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 1000000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 6,
      validate: {
        validator: function (value) {
          return value !== 0;
        },
        message: "Price must be greater than 0",
      },
    },
    previousPrice: Number,
    color: String,
    brand: String,
    stock: Number,
    shipping: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    images: [
      {
        secure_url: {
          type: String,
          default: "",
        },
        public_id: {
          type: String,
          default: "",
        },
      },
    ],
    sold: {
      type: Number,
      default: 0,
    },
    // likes: [likeSchema],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    ratings: [ratingSchema],
  },
  { timestamps: true }
);

productSchema.plugin(uniqueValidator, { message: " already exists" });

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
