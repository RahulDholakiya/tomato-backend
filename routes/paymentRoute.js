import express from "express";
import { checkout, paymentVerification } from "../controllers/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/checkout", checkout);
paymentRouter.post("/paymentverification",paymentVerification)

export default paymentRouter;
