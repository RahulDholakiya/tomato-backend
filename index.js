import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRoute from "./routes/foodRoute.js";

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

// api endpoint
app.use("/api/food", foodRoute);
app.use("/images",express.static('uploads'))

app.get("/", (req, res) => {
  res.send("Api Working");
});

app.listen(port, (req, res) => {
  console.log(`Server Started on http://localhost:${port}`);
});
