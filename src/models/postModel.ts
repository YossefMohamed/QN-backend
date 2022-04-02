import mongoose from "mongoose";
import { UserInterface } from "./userModel";

export interface PostInterface {
  image: string;
  content: string;
  likes: mongoose.PopulatedDoc<UserInterface>[];
  author: mongoose.PopulatedDoc<UserInterface>;
  title: string;
  category: string;
}
const postSchema = new mongoose.Schema<PostInterface>(
  {
    image: String,
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Who Is The Author ?"],
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  {
    timestamps: true,
  }
);

postSchema.set("toJSON", { virtuals: true });
postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "post",
  localField: "_id",
});

postSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.populate({
    path: "comments",
    // populate : {
    //   path : 'reviewId'
    // }
  });
  next();
});
const Post = mongoose.model<PostInterface>("Post", postSchema);

export default Post;
