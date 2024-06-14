import orderModel from "../models/orderModel.js";

const listOrdersForAdminPanel = async (req, res) => {
  try {
    const orders = await orderModel.find();
    const totalOrders = orders.length;
    const totalAmount = orders.reduce((sum, order) => sum + order.amount, 0);
    res.json({ success: true, data: orders, totalOrders, totalAmount });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const foodStatusUpdateForAdminPAnel = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    let updateQuery = { status: status };

    if (status === "Accepted") {
      updateQuery = { ...updateQuery, acceptedAt: Date.now() };
    } else if (status === "Rejected") {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: true, message: "Order Rejected" });
    }

    await orderModel.findByIdAndUpdate(orderId, updateQuery);
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { listOrdersForAdminPanel, foodStatusUpdateForAdminPAnel };
