import foodModel from "../models/foodModel.js";
import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { itemId, quantity = 1 } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const product = await foodModel.findById(itemId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = user.cartData || [];

    const existingItemIndex = cartData.findIndex(
      (item) => item.itemId?.toString() === itemId?.toString()
    );
    if (existingItemIndex !== -1) {
      cartData[existingItemIndex].quantity += quantity;
    } else {
      cartData.push({
        itemId: product._id,
        name: product.name,
        price: product.price,
        description: product.description,
        quantity,
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );
    if (!updatedUser) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to update cart data" });
    }

    res.json({
      success: true,
      message: "Added to cart successfully",
      cartData: updatedUser.cartData,
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Error adding to cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    // console.log("userId", userId);
    const { itemId } = req.body;
    // console.log("itemId",itemId);

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    let user = await userModel.findById(userId);
    // console.log("user",user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = user.cartData || [];
    // console.log("cartData",cartData);

    const itemIndex = cartData.findIndex(
      (item) => item.itemId.toString() === itemId.toString()
    );
    // console.log("itemIndex",itemIndex);

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    if (cartData[itemIndex].quantity > 1) {
      cartData[itemIndex].quantity -= 1;
    } else {
      cartData.splice(itemIndex, 1);
    }

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({
      success: true,
      message: "Removed from cart successfully",
      cartData,
    });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res
      .status(500)
      .json({ success: false, message: "Error removing from cart" });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log("userId",userId);

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = user.cartData || [];

    const cartWithProductDetails = await Promise.all(cartData.map(async (item) => {
      const product = await foodModel.findById(item.itemId);
      return { ...item.toObject(), product };
    }));

    res.json({ success: true, cartData: cartWithProductDetails });
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).json({ success: false, message: "Error fetching cart data" });
  }
};

export { addToCart, removeFromCart, getCart };
