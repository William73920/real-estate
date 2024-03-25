import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 10);

  try {
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password: userPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(createError(404, "User not found"));
    }

    const isPasswordCorrect = await bcryptjs.compare(
      userPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong password or email"));
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT
    );

    const { password, ...others } = user._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...others });
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT
      );

      const { password, ...others } = user._doc;

      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);

      const hashedPassword = await bcryptjs.hash(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-3),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });

      await newUser.save();

      const token = jwt.sign(
        {
          id: newUser._id,
        },
        process.env.JWT
      );

      const { password, ...others } = newUser._doc;

      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(others);
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been signed out.");
  } catch (error) {
    next(error);
  }
};
