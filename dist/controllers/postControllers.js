"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = exports.getPost = exports.likePost = exports.editPost = exports.deletePost = exports.addPost = void 0;
const errorHandler_1 = require("../utiles/errorHandler");
const postModel_1 = __importDefault(require("./../models/postModel"));
const cloudinary_1 = __importDefault(require("cloudinary"));
exports.addPost = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, title, category } = req.body;
        const { path } = req.file;
        const author = req.user._id;
        const imageNew = yield cloudinary_1.default.v2.uploader.upload(path);
        let newPost = yield postModel_1.default.create({
            content,
            title,
            author,
            category,
            image: imageNew.secure_url,
        });
        newPost = yield newPost.populate("author", "name img");
        res.status(201).json({
            status: "ok",
            data: newPost,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
/*

*/
exports.deletePost = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postID = req.params.id;
    const deletedPost = yield postModel_1.default.findById(postID).populate("author", "name img");
    if (!deletedPost)
        throw new Error("Post Not Found");
    if (!deletedPost.author._id.equals(req.user._id))
        throw new Error("not authorized");
    yield deletedPost.delete();
    res.status(202).json({
        status: "ok",
        data: deletedPost,
    });
}));
exports.editPost = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, title, category } = req.body;
    if (!title || !content)
        throw new Error("Enter content and title");
    const postId = req.params.id;
    const editedPost = yield postModel_1.default.findByIdAndUpdate(postId, {
        content,
        title,
        category,
    }, { new: true }).populate("author", "name img");
    console.log(editedPost, postId);
    if (!editedPost)
        throw new Error("Post Not Found");
    if (!editedPost.author._id.equals(req.user._id))
        throw new Error("not authorized");
    res.status(200).json({
        status: "ok",
        data: editedPost,
    });
}));
exports.likePost = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    console.log(postId);
    const post = yield postModel_1.default.findById(postId).populate("author", "name img");
    console.log(post);
    if (!post)
        throw new Error("Post Not Found");
    if (post.likes.includes(req.user._id)) {
        post.likes = post.likes.filter((id) => {
            return !id.equals(req.user.id);
        });
        yield post.save();
        return res.status(200).json({ status: "ok", data: post });
    }
    post.likes.push(req.user.id);
    yield post.save();
    res.status(200).json({
        status: "ok",
        data: post,
    });
}));
exports.getPost = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postID = req.params.id;
    console.log("postID");
    const post = yield postModel_1.default.findById(postID).populate([
        {
            path: "author",
            select: "name img",
        },
    ]);
    console.log(post.id);
    if (!post)
        throw new Error("Post not found");
    res.status(200).json({
        status: "ok",
        data: post,
    });
}));
exports.getPosts = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docNum = Math.ceil((yield postModel_1.default.countDocuments()) / 9);
    console.log(docNum);
    const pageNumber = Number(req.query.page) + 1;
    const posts = yield postModel_1.default.find()
        .limit(pageNumber * 9)
        .skip((pageNumber - 1) * 9)
        .populate("author", "name img")
        .sort("-createdAt");
    if (!posts.length)
        throw new Error("Posts Not Found");
    return res.status(200).json({
        status: "ok",
        data: {
            totalPages: docNum,
            posts,
        },
    });
}));
