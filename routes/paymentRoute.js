import express from "express";
import {
  checkout,
  paymentVerification,
} from "../controllers/paymentController.js";
import authMiddleware from "../middleware/auth.js";

const paymentRouter = express.Router();

paymentRouter.post("/checkout", checkout);
paymentRouter.post("/paymentverification", authMiddleware, paymentVerification);

export default paymentRouter;
