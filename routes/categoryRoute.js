import express from "express";
import multer from "multer";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/categoryController.js";

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const categoryRouter = express.Router();

categoryRouter.post("/add", upload.single("image"), addCategory);
categoryRouter.get("/allcategory", getAllCategories);
categoryRouter.delete("/delete/:categoryName",deleteCategory)

export default categoryRouter;
