import mongoose from "mongoose";
import { PostInterface } from "./postModel";
import { UserInterface } from "./userModel";

interface CommentInterFace {
  content: string;
  post: mongoose.PopulatedDoc<PostInterface>;
  author: mongoose.PopulatedDoc<UserInterface>;
}

const commentSchema = new mongoose.Schema<CommentInterFace>(
  {
    content: {
      type: String,
      required: true,
    },
    post: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    author: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.pre(/^find/, function (this, next) {
  // this points to the current query
  this.populate({
    path: "author",
    // populate : {
    //   path : 'reviewId'
    // }
  });
  next();
});

const Comment = mongoose.model<CommentInterFace>("Comment", commentSchema);

export default Comment;
