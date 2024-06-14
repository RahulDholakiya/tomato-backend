import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRoute from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import Razorpay from "razorpay";
import paymentRouter from "./routes/paymentRoute.js";
import bodyParser from "body-parser";
import categoryRouter from "./routes/categoryRoute.js";
import ratingRouter from "./routes/ratingRoute.js";
import http from "http";
import { setupWebSocketServer } from "./controllers/webSocketController.js";
import { fileURLToPath } from "url";
import path from "path";
import uploadRouter from "./routes/upload.js";

const app = express();
const port = process.env.PORT || 4000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/api/food", foodRoute);
app.use("/images", express.static(path.join(__dirname, 'uploads')));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/category", categoryRouter);
app.use("/api/rating", ratingRouter);
app.use("/api",uploadRouter)

app.get("/", (req, res) => {
  res.send("API Working");
});

app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

const server = http.createServer(app);

setupWebSocketServer(server);

server.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
