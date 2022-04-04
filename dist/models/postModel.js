"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Who Is The Author ?"],
    },
    likes: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
}, {
    timestamps: true,
});
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
const Post = mongoose_1.default.model("Post", postSchema);
exports.default = Post;
