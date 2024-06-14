import ratingModel from "../models/ratingModel.js";
import foodModel from "../models/foodModel.js";

const createRating = async (req, res) => {
  const { foodId, rating, comment } = req.body;
  const userId = req.user._id;

  try {
    const newRating = await ratingModel.create({
      foodId,
      userId,
      rating,
      comment,
    });
    res.status(201).json({ success: true, data: newRating });
  } catch (error) {
    console.error("Error creating rating:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAverageRating = async (req, res) => {
  const { foodId } = req.params;
  try {
    const ratings = await ratingModel.find({ foodId });
    const totalRatings = ratings.reduce(
      (acc, rating) => acc + rating.rating,
      0
    );
    const averageRating = totalRatings / ratings.length || 0;

    res.status(200).json({ success: true, averageRating });
  } catch (error) {
    console.error("Error fetching average rating:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const getAllReviews = async (req, res) => {
  const { search } = req.query;
  try {
    let query = {};

    if (search) {
      const foodItems = await foodModel.find({
        name: { $regex: search, $options: "i" },
      });
      const foodIds = foodItems.map((food) => food._id);
      query = { foodId: { $in: foodIds } };
    }

    const reviews = await ratingModel
      .find(query)
      .populate("foodId", "name")
      .populate("userId", "name");
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { createRating, getAverageRating, getAllReviews };
