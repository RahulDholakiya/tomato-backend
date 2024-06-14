import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const categoryModel =
  mongoose.models.category || mongoose.model("Category", categorySchema);
export default categoryModel;
