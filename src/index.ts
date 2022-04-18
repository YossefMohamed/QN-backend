import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./db";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import deathRouter from "./routes/deathRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";
import cookies from "cookie-parser";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import cloudinary from "cloudinary";

const app = express();
app.use(cookies());
app.use(express.static("public"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

dotenv.config({ path: path.join(__dirname, "./.env") });
console.log(process.env.CLOUDINARY_NAME);

connectDB();
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.JWT_SECRET || "YOSSEFSSECRET"],

    maxAge: 24 * 60 * 60 * 1000,
  })
);
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 8000;

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/death", deathRouter);
app.use("/api/favorite", favoriteRoutes);

app.use((err: any, req: Request, res: Response, next: any) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    status: "failed",
    message: err.message,
    stack: err.stack,
  });
});

app.listen(port, () => console.log(`Running on port : ${port}!`));
