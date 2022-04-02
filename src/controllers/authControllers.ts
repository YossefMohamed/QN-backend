import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import User from "../models/userModel";

export interface IRequest extends Request {
  user: any;
}

export interface IResponse extends Response {}

export const signIn = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "randomSecret", {
    expiresIn: "30d",
  });
};

export const protect = async (req: any, res: Response, next: any) => {
  let token;

  try {
    if (req.session.token) {
      token = req.session.token;
    }

    if (!token) {
      res.status(400);
      return next(new Error("PLease Login !"));
    }

    // 2- validate token
    const login: any = jwt.verify(
      token,
      process.env.JWT_SECRET || "randomSecret"
    );

    const freshUser = await User.findById(login.id);

    if (!freshUser) {
      return next(new Error("Please Login Again !"));
    }

    req.user = freshUser;
    next();
  } catch (error) {
    next(error);
  }
};
