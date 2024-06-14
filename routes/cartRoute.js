import express from "express";
import {
  addItemToCart,
  addToCart,
  getCart,
  removeFromCart,
  removeItemToCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/get", authMiddleware, getCart);
cartRouter.post("/additem", authMiddleware, addItemToCart);
cartRouter.post("/removeitem", authMiddleware, removeItemToCart);

export default cartRouter;
