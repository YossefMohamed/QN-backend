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
exports.getComments = exports.deleteComment = exports.editComment = exports.addComment = void 0;
const commentModel_1 = __importDefault(require("../models/commentModel"));
const postModel_1 = __importDefault(require("../models/postModel"));
const errorHandler_1 = require("../utiles/errorHandler");
// content: string;
// post: mongoose.PopulatedDoc<PostInterface>;
// author: mongoose.PopulatedDoc<UserInterface>;
exports.addComment = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = req.params.id;
    console.log(post);
    const { content } = req.body;
    const author = req.user._id;
    const postCheck = yield postModel_1.default.exists({ _id: post });
    if (!postCheck)
        throw new Error("Post not found");
    const comment = yield commentModel_1.default.create({
        content,
        post,
        author,
    });
    res.status(200).json({
        status: "ok",
        data: comment,
    });
}));
exports.editComment = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = req.params.id;
    const commentId = req.params.comment;
    const { content } = req.body;
    const author = req.user._id;
    const postCheck = yield postModel_1.default.exists({ _id: post });
    if (!postCheck)
        throw new Error("Post not found");
    const comment = yield commentModel_1.default.findByIdAndUpdate(commentId, {
        content,
        post,
        author,
    }, { new: true });
    res.status(200).json({
        status: "ok",
        data: comment,
    });
}));
exports.deleteComment = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = req.params.id;
        const commentId = req.params.comment;
        console.log(req.params);
        const postCheck = yield postModel_1.default.exists({ _id: post });
        console.log(postCheck);
        if (!postCheck)
            throw new Error("Post not found");
        const comment = yield commentModel_1.default.findByIdAndDelete(commentId);
        res.status(200).json({
            status: "ok",
            data: comment,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.getComments = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = req.params.id;
    const postCheck = yield postModel_1.default.exists({ _id: post });
    if (!postCheck)
        throw new Error("Post not found");
    const comments = yield commentModel_1.default.find({ post }).sort("-createdAt");
    res.status(200).json({
        status: "ok",
        data: comments,
    });
}));
