import express from "express";
import {
  loginUser,
  registerUser,
  getUserRoleCount,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/count/users", getUserRoleCount);

export default userRouter;
