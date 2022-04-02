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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    lastName: { type: String, required: true },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: [true, "Please Enter Your Email !"],
    },
    gander: {
        type: String,
        enum: ["male", "female"],
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: [8, "Password Must Be More Than 8 Chars !"],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    img: {
        type: String,
        default: "static/img/default.jpg",
    },
}, {
    timestamps: true,
});
userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });
userSchema.virtual("fullName").get(function () {
    return `${this.name} ${this.lastName}`;
});
userSchema.virtual("favorite", {
    ref: "Favorite",
    localField: "_id",
    foreignField: "user",
});
// const schema = new Schema<IUser, UserModel>({ name: String });
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.img = `https://avatars.dicebear.com/api/${this.gander}/${this.name}-${this.lastName}.svg`;
        if (!this.isModified("password"))
            return next();
        this.password = yield bcrypt_1.default.hash(this.password, 8);
        next();
    });
});
userSchema.pre(/^find/, function (next) {
    this.populate("favorite");
    next();
});
userSchema.methods.matchPassword = function (enteredPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(enteredPassword, this.password);
    });
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
