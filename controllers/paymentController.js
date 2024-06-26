import { instance } from "../index.js";
import orderModel from "../models/orderModel.js";
import paymentModel from "../models/paymentModel.js";
import crypto from "crypto";

const checkout = async (req, res) => {
  try {
    const amount = Number(req.body.orderDataAmount * 100);
    if (isNaN(amount) || amount <= 0) {
      throw new Error("Invalid order amount");
    }
    const options = {
      amount: amount,
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.json({ success: true, data: order });
  } catch (error) {
    console.error("Error creating order:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const paymentVerification = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await paymentModel.create({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      const { address, items, amount } = orderData;
      const userId = req.user._id;
      await orderModel.create({
        userId,
        address,
        items,
        amount,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        payment: true,
      });

      res.redirect(
        `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
      );
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.log("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Error" });
  }
};

export { checkout, paymentVerification };
