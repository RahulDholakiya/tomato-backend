import categoryModel from "../models/categoryModel.js";
import foodModel from "../models/foodModel.js";
import fs from "fs";

const addFood = async (req, res) => {
  let image_filename = `${req.file?.filename}`;

  const { name, description, price, category } = req.body;

  if (!category) {
    return res.json({ success: false, message: "Category is required" });
  }

  const food = new foodModel({
    name,
    description,
    price,
    image: image_filename,
    category,
  });

  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const listFood = async (req, res) => {
  const category = req.query.category;
  try {
    let products;
    if (category && category !== "All") {
      products = await foodModel.find({ category });
    } else {
      products = await foodModel.find({});
    }
    const totalItems = products.length;
    res.json({ success: true, data: products, totalItems });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (food) {
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) console.error("Error deleting image:", err);
      });
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Food Removed" });
    } else {
      res.status(404).json({ success: false, message: "Food not found" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("req.params",req.params);
    const { name, description, price, category } = req.body;
    console.log("req.body",req.body);

    const updatedFood = await foodModel.findByIdAndUpdate(
      id,
      { name, description, price, category },
      { new: true }
    );
    console.log("updatedFood",updatedFood);

    if (!updatedFood) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    res.json({
      success: true,
      message: "Food updated successfully",
      data: updatedFood,
    });
  } catch (error) {
    console.error("Error updating food:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const foodCategoryForAdminPanel = async (req, res) => {
  try {
    const categories = await categoryModel.aggregate([
      {
        $lookup: {
          from: "foods",
          localField: "categoryName",
          foreignField: "category",
          as: "products",
        },
      },
      {
        $project: {
          categoryName: 1,
          count: { $size: "$products" },
        },
      },
    ]);

    res.json({ success: true, categories });
  } catch (error) {
    console.error("Error fetching category data:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addFood, listFood, removeFood, updateFood, foodCategoryForAdminPanel };
