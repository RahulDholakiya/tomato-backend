// import mongoose from "mongoose";

// const orderDetailsSchema = new mongoose.Schema({
//   orderId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Order",
//     required: true,
//   },
//   message: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     default: null,
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const orderDetailsModel = mongoose.model("OrderChat", orderDetailsSchema);
// export default orderDetailsModel;


import mongoose from "mongoose";

const orderDetailsSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const orderDetailsModel = mongoose.model("OrderChat", orderDetailsSchema);
export default orderDetailsModel;
