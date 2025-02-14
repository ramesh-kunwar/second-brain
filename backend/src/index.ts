import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";

import bcrypt from "bcryptjs";
import { UserModel } from "./models/user.model";
import { connectDb } from "./config/connectDb";
import jwt from "jsonwebtoken";
import { userMiddleware } from "./middleware";
import { ContentModel } from "./models/content.model";
const app = express();
app.use(express.json());
connectDb();

app.get("/ping", async (req: Request, res: Response) => {
  res.json({
    msg: "Ping...",
  });
});

app.post("/api/v1/signup", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    if (!email || !password) {
      res.status(400).json({
        success: false,
        msg: "All fields are required.",
      });
      return;
    }

    const existingUsr = await UserModel.findOne({ email });

    if (existingUsr) {
      res.status(409).json({
        success: false,
        msg: "User already exists",
      });
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      msg: "User created successfully",

      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "Sing Up failed ",
    });
    return;
  }
});

app.post("/api/v1/signin", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: false,
        msg: "Invalid credentials",
      });
      return;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "3d",
    });
    res.status(500).json({
      success: false,
      msg: "User signed in successfully",
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: `User logged in failed. ${error}`,
    });
  }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const { link, type, title } = req.body;

  const content = await ContentModel.create({
    link,
    type,
    title,
    // @ts-ignore
    userId: req.userId,
    tags: [],
  });

  res.status(201).json({
    success: true,
    msg: "Content Added Successfully",
    data: content,
  });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  // @ts-ignore
  const userId = req.userId;
  // console.log(req);
  const content = await ContentModel.find({
    userId: userId,
  }).populate("userId", "username _id");

  res.status(200).json({
    success: true,
    message: "Content fetched successfully",
    data: content,
    userId,
  });
});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(4000, () => {
  console.log(`App is running at port 4000`);
});
