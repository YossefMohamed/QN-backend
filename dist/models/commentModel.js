"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: true,
    },
    post: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "Post",
    },
    author: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "User",
    },
}, {
    timestamps: true,
});
commentSchema.pre(/^find/, function (next) {
    // this points to the current query
    this.populate({
        path: "author",
        // populate : {
        //   path : 'reviewId'
        // }
    });
    next();
});
const Comment = mongoose_1.default.model("Comment", commentSchema);
exports.default = Comment;
