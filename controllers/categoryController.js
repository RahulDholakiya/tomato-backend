import path from "path";
import categoryModel from "../models/categoryModel.js";
import foodModel from "../models/foodModel.js";

const addCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;

    if (!categoryName || categoryName.trim() === "") {
      return res.status(400).json({ success: false, error: "Category name is required" });
    }

    const existingCategory = await categoryModel.findOne({ categoryName: categoryName.trim() });
    if (existingCategory) {
      return res.status(400).json({ success: false, error: "Category already exists" });
    }

    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, error: "Image is required" });
    }

    const imagePath = req.file.path.replace(/^uploads[\\/]/, "");

    const newCategory = new categoryModel({
      categoryName: categoryName.trim(),
      image: imagePath,
    });

    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error adding category:", error.stack); 
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();

    const categoriesWithImageFilename = categories.map((category) => {
      const imageFilename = category.image ? path.basename(category.image) : "";
      return {
        ...category._doc,
        image: imageFilename,
      };
    });

    res
      .status(200)
      .json({ success: true, categories: categoriesWithImageFilename });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryName } = req.params;

    const category = await categoryModel.findOne({ categoryName });
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    await categoryModel.deleteOne({ categoryName });
    await foodModel.deleteMany({ category: categoryName });

    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addCategory, getAllCategories, deleteCategory };
