import { Request, Response } from "express";
import Comment from "../models/commentModel";
import Post from "../models/postModel";
import { catchError } from "../utiles/errorHandler";

// content: string;
// post: mongoose.PopulatedDoc<PostInterface>;
// author: mongoose.PopulatedDoc<UserInterface>;

export const addComment = catchError(async (req: any, res: Response) => {
  const post = req.params.id;
  console.log(post);
  const { content } = req.body;
  const author = req.user._id;
  const postCheck = await Post.exists({ _id: post });
  if (!postCheck) throw new Error("Post not found");
  const comment = await Comment.create({
    content,
    post,
    author,
  });
  res.status(200).json({
    status: "ok",
    data: comment,
  });
});

export const editComment = catchError(async (req: any, res: Response) => {
  const post = req.params.id;
  const commentId = req.params.comment;
  const { content } = req.body;
  const author = req.user._id;
  const postCheck = await Post.exists({ _id: post });
  if (!postCheck) throw new Error("Post not found");
  const comment = await Comment.findByIdAndUpdate(
    commentId,
    {
      content,
      post,
      author,
    },
    { new: true }
  );
  res.status(200).json({
    status: "ok",
    data: comment,
  });
});

export const deleteComment = catchError(async (req: any, res: Response) => {
  try {
    const post = req.params.id;
    const commentId = req.params.comment;
    console.log(req.params);

    const postCheck = await Post.exists({ _id: post });
    console.log(postCheck);
    if (!postCheck) throw new Error("Post not found");
    const comment = await Comment.findByIdAndDelete(commentId);
    res.status(200).json({
      status: "ok",
      data: comment,
    });
  } catch (error) {
    console.log(error);
  }
});

export const getComments = catchError(async (req: any, res: Response) => {
  const post = req.params.id;
  const postCheck = await Post.exists({ _id: post });

  if (!postCheck) throw new Error("Post not found");
  const comments = await Comment.find({ post }).sort("-createdAt");
  res.status(200).json({
    status: "ok",
    data: comments,
  });
});
