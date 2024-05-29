import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRoute from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import Razorpay from "razorpay";
import paymentRouter from "./routes/paymentRoute.js";
// import adminRouter from "./routes/adminRoute.js";
import bodyParser from "body-parser";

// app config
const app = express();
const port = 4000;

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json())

//db connection
connectDB();

// api endpoint
app.use("/api/food", foodRoute);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment", paymentRouter);
// app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Api Working");
});

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

app.listen(port, (req, res) => {
  console.log(`Server Started on http://localhost:${port}`);
});
