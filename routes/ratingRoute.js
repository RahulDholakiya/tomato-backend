import express from "express";
import {
  createRating,
  getAverageRating,
  getAllReviews
} from "../controllers/ratingController.js";
import authMiddleware from "../middleware/auth.js";

const ratingRouter = express.Router();

ratingRouter.post("/review", authMiddleware, createRating);
ratingRouter.get("/average/:foodId", getAverageRating);
ratingRouter.get("/reviews", authMiddleware, getAllReviews);

export default ratingRouter;
