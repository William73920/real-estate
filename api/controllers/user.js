import bcryptjs from "bcryptjs";
import User from "../models/user.js";
import { createError } from "../utils/error.js";

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
