import express from "express";
import { updateUser } from "../controllers/user.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello from user");
});

router.post("/update/:id", verifyToken, updateUser);

export default router;
