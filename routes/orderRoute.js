import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  foodStatusUpdateForAdminPAnel,
  listOrdersForAdminPanel,
  placeOrder,
  userOrders,
  verifyOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrdersForAdminPanel);
orderRouter.post("/status", foodStatusUpdateForAdminPAnel);

export default orderRouter;
