import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  foodStatusUpdateForAdminPAnel,
  listOrdersForAdminPanel,
  userOrders,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/list", listOrdersForAdminPanel);
orderRouter.post("/status", foodStatusUpdateForAdminPAnel);

export default orderRouter;
