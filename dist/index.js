"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const deathRoutes_1 = __importDefault(require("./routes/deathRoutes"));
const favoriteRoutes_1 = __importDefault(require("./routes/favoriteRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_session_1 = __importDefault(require("cookie-session"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static("public"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)({
    credentials: true,
    origin: true,
}));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "./.env") });
console.log(process.env.CLOUDINARY_NAME);
(0, db_1.default)();
app.use((0, cookie_session_1.default)({
    name: "session",
    keys: [process.env.JWT_SECRET || "YOSSEFSSECRET"],
    maxAge: 24 * 60 * 60 * 1000,
}));
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const port = process.env.PORT || 8000;
app.use("/api/user", userRoutes_1.default);
app.use("/api/post", postRoutes_1.default);
app.use("/api/death", deathRoutes_1.default);
app.use("/api/favorite", favoriteRoutes_1.default);
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        status: "failed",
        message: err.message,
        stack: err.stack,
    });
});
app.listen(port, () => console.log(`Running on port : ${port}!`));
