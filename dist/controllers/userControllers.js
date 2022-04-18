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
exports.logout = exports.updateMe = exports.getUserProfile = exports.getMe = exports.registerUser = exports.login = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const errorHandler_1 = require("../utiles/errorHandler");
const authControllers_1 = require("./authControllers");
exports.login = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email }).select("-__v +password");
    if (user && (yield user.matchPassword(password, user.password))) {
        const token = (0, authControllers_1.signIn)(user._id);
        req.session = { token };
        console.log({ data: {
                user,
                token
            }, });
        return res.status(201).json({
            status: "ok",
            data: {
                user,
                token
            },
        });
    }
    res.statusCode = 401;
    throw new Error("invalid email or password");
}));
exports.registerUser = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password, gander, lastName } = req.body;
    if (!name || !email || !password || !gander || !lastName) {
        res.status(401);
        throw new Error("Please Fill All The Inputs ");
    }
    const checkMail = yield userModel_1.default.findOne({ email });
    if (checkMail) {
        res.status(404);
        throw new Error("There's Account with this Email !");
    }
    const user = yield userModel_1.default.create({
        email,
        name,
        password,
        gander,
        lastName,
    });
    const token = (0, authControllers_1.signIn)(user._id);
    req.session = { token };
    res.status(201).json({
        status: "ok",
        data: {
            user,
            token
        },
    });
}));
exports.getMe = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        res.status(404);
        throw new Error("User Not Found !");
    }
    res.status(200).json({ status: "ok", data: req.user });
}));
exports.getUserProfile = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(req.params.id);
    if (!user)
        throw new Error("User not found !");
    res.status(200).json({ status: "ok", data: user });
}));
exports.updateMe = (0, errorHandler_1.catchError)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password, gander, lastName, oldPassword } = req.body;
    if (!name || !email || !password || !gander || !lastName) {
        throw new Error("Please Fill All Fields !");
    }
    req.user.email = email;
    req.user.name = name;
    req.user.lastName = lastName;
    req.user.gander = gander;
    if (req.body.password) {
        if (req.body.password !== req.body.confirmPassword) {
            res.status(400);
            throw new Error("Password And Confirm Password Not Equal !");
        }
        if (req.user &&
            !(yield req.user.matchPassword(oldPassword, req.user.password))) {
            res.status(400);
            throw new Error("Incorrect Password");
        }
        req.user.password = req.body.password;
    }
    const user = yield req.user.save();
    res.status(200).json({ status: "ok", data: user });
}));
const logout = (req, res) => {
    res.clearCookie("session", { path: "/" });
    res.status(204).json({
        status: "ok",
    });
};
exports.logout = logout;
