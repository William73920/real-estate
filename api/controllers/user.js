import bcryptjs from "bcryptjs";
import User from "../models/user.js";
import { createError } from "../utils/error.js";
import listing from "../models/listing.js";

export const updateUser = async (req, res, next) => {
  const { id } = req.params;

  if (req.user.id !== id) {
    return next(createError(403, "You can only update your account!"));
  }

  try {
    if (req.body.password) {
      const salt = await bcryptjs.genSalt(10);
      req.body.password = await bcryptjs.hash(req.body.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      {
        new: true,
      }
    );

    const { password, ...others } = updatedUser._doc;

    res.status(200).json({
      ...others,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(createError(403, "You can only delete your account!"));
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getUserListiings = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return next(createError(401, "You can only see your listings!"));
    }

    const listings = await listing.find({ userRef: req.params.id });

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
