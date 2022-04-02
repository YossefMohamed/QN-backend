import { Response } from "express";
import User from "../models/userModel";
import { catchError } from "../utiles/errorHandler";
import { IRequest, IResponse, signIn } from "./authControllers";

export const login = catchError(async (req: any, res: Response) => {
  const { email, password } = req.body;
  const user: any = await User.findOne({ email }).select("-__v +password");

  if (user && (await user.matchPassword(password, user.password))) {
    req.session = { token: signIn(user._id) };

    return res.status(201).json({
      status: "ok",
      data: {
        user,
      },
    });
  }
  res.statusCode = 401;
  throw new Error("invalid email or password");
});

export const registerUser = catchError(async (req: any, res: Response) => {
  const { email, name, password, gander, lastName } = req.body;
  if (!name || !email || !password || !gander || !lastName) {
    res.status(401);
    throw new Error("Please Fill All The Inputs ");
  }
  const checkMail = await User.findOne({ email });
  if (checkMail) {
    res.status(404);
    throw new Error("There's Account with this Email !");
  }
  const user: any = await User.create({
    email,
    name,
    password,
    gander,
    lastName,
  });
  req.session = { token: signIn(user._id) };

  res.status(201).json({
    status: "ok",
    data: {
      ...user._doc,
      token: signIn(user._id),
    },
  });
});

export const getMe = catchError(async (req: any, res: Response) => {
  if (!req.user) {
    res.status(404);
    throw new Error("User Not Found !");
  }
  res.status(200).json({ status: "ok", data: req.user });
});

export const getUserProfile = catchError(async (req: any, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new Error("User not found !");
  res.status(200).json({ status: "ok", data: user });
});

export const updateMe = catchError(async (req: any, res: Response) => {
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
    if (
      req.user &&
      !(await req.user.matchPassword(oldPassword, req.user.password))
    ) {
      res.status(400);
      throw new Error("Incorrect Password");
    }

    req.user.password = req.body.password;
  }
  const user = await req.user.save();
  res.status(200).json({ status: "ok", data: user });
});

export const logout = (req: any, res: any) => {
  res.clearCookie("session", { path: "/" });

  res.status(204).json({
    status: "ok",
  });
};
