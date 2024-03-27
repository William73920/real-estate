import express from "express";
import {
  deleteUser,
  getUserListiings,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from user");
});

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);
router.get("/listings/:id", verifyToken, getUserListiings);

export default router;
