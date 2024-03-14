import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minLength: 1,
      maxLength: 160,
      text: true,
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 1000000,
      text: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    featuredImage: {
      secure_url: {
        type: String,
        default: "",
      },
      public_id: {
        type: String,
        default: "",
      },
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

blogSchema.plugin(uniqueValidator);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
