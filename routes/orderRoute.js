import express from "express";
import {
  foodStatusUpdateForAdminPAnel,
  listOrdersForAdminPanel,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/list",listOrdersForAdminPanel);
orderRouter.post("/status", foodStatusUpdateForAdminPAnel);

export default orderRouter;
