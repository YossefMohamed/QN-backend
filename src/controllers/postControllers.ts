import { catchError } from "../utiles/errorHandler";
import { Response } from "express";
import Post from "./../models/postModel";
import { Types } from "mongoose";
import cloudinary from "cloudinary";
export const addPost = catchError(async (req: any, res: Response) => {
  try {
    const { content, title, category } = req.body;
    const { path } = req.file;
    const author = req.user._id;
    const imageNew = await cloudinary.v2.uploader.upload(path);
    let newPost = await Post.create({
      content,
      title,
      author,
      category,
      image: imageNew.secure_url,
    });
    newPost = await newPost.populate("author", "name img");

    res.status(201).json({
      status: "ok",
      data: newPost,
    });
  } catch (error: any) {
    console.log(error);
  }
});

/*

*/
export const deletePost = catchError(async (req: any, res: Response) => {
  const postID = req.params.id;
  const deletedPost: any = await Post.findById(postID).populate(
    "author",
    "name img"
  );
  if (!deletedPost) throw new Error("Post Not Found");
  if (!deletedPost.author._id.equals(req.user._id))
    throw new Error("not authorized");
  await deletedPost.delete();
  res.status(202).json({
    status: "ok",
    data: deletedPost,
  });
});

export const editPost = catchError(async (req: any, res: Response) => {
  const { content, title, category } = req.body;
  if (!title || !content) throw new Error("Enter content and title");
  const postId = req.params.id;
  const editedPost: any = await Post.findByIdAndUpdate(
    postId,
    {
      content,
      title,
      category,
    },
    { new: true }
  ).populate("author", "name img");
  console.log(editedPost, postId);
  if (!editedPost) throw new Error("Post Not Found");
  if (!editedPost.author._id.equals(req.user._id))
    throw new Error("not authorized");

  res.status(200).json({
    status: "ok",
    data: editedPost,
  });
});

export const likePost = catchError(async (req: any, res: Response) => {
  const postId = req.params.id;
  console.log(postId);
  const post: any = await Post.findById(postId).populate("author", "name img");
  console.log(post);
  if (!post) throw new Error("Post Not Found");

  if (post.likes.includes(req.user._id)) {
    post.likes = post.likes.filter((id: Types.ObjectId) => {
      return !id.equals(req.user.id);
    });
    await post.save();
    return res.status(200).json({ status: "ok", data: post });
  }

  post.likes.push(req.user.id);
  await post.save();
  res.status(200).json({
    status: "ok",
    data: post,
  });
});

export const getPost = catchError(async (req: any, res: Response) => {
  const postID = req.params.id;
  console.log("postID");
  const post:any = await Post.findById(postID).populate([
    {
      path: "author",
      select: "name img",
    },
  ]);
  console.log(post.id)
  if (!post) throw new Error("Post not found");
  res.status(200).json({
    status: "ok",
    data: post,
  });
});

export const getPosts = catchError(async (req: any, res: Response) => {
  const docNum = Math.ceil((await Post.countDocuments()) / 9);
  console.log(docNum);
  const pageNumber = Number(req.query.page) + 1;
  const posts = await Post.find()
    .limit(pageNumber * 9)
    .skip((pageNumber - 1) * 9)
    .populate("author", "name img")
    .sort("-createdAt");
  if (!posts.length) throw new Error("Posts Not Found");
  return res.status(200).json({
    status: "ok",
    data: {
      totalPages: docNum,
      posts,
    },
  });
});
