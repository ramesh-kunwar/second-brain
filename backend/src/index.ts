import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";

import bcrypt from "bcryptjs";
import { UserModel } from "./models/user.model";
import { connectDb } from "./config/connectDb";

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
      throw new Error("All fields are required");
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
      error: "Sing Up failed",
    });
  }
});

app.post("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(4000, () => {
  console.log(`App is running at port 4000`);
});
