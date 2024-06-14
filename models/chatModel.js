import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const chatModel = mongoose.model.Chat || mongoose.model("Chat", chatSchema);
export default chatModel;
