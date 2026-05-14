import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// PLACE ORDER
const placeOrder = async (req, res) => {
  try {
    // 🔴 auth check
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const { items, address } = req.body;
    const userId = req.user.id;

    // 🔴 validate input
    if (!items || items.length === 0) {
      return res.json({ success: false, message: "Cart is empty" });
    }

    // ✅ calculate total on backend (never trust frontend)
    let totalAmount = 0;
    items.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });

    const DELIVERY_FEE = 0;
    totalAmount += DELIVERY_FEE;

    // ✅ save order
    const newOrder = new orderModel({
      userId,
      items,
      amount: totalAmount,
      address,
      status: "pending"
    });

    await newOrder.save();

    // 🔴 init Razorpay INSIDE function (no crash)
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    // 🔴 extra safety
    if (!process.env.RAZORPAY_KEY_ID) {
      return res.json({ success: false, message: "Payment config missing" });
    }

    // ✅ create order
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      receipt: "order_" + newOrder._id
    });

    res.json({
      success: true,
      order: razorpayOrder,
      orderId: newOrder._id
    });

  } catch (error) {
    console.log("PLACE ORDER ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// VERIFY PAYMENT
 

const verifyOrder = async (req, res) => {

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderId
  } = req.body;

  try {

    // Payment failed before completion
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {

      await orderModel.findByIdAndDelete(orderId);

      return res.json({
        success: false,
        status: "failed",
        message: "Payment Failed"
      });
    }

    // Generate signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    // Signature matched
    if (expectedSignature === razorpay_signature) {

      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        status: "success",
        razorpay_order_id,
        razorpay_payment_id
      });

      return res.json({
        success: true,
        status: "success",
        message: "Payment Verified"
      });
    }

    // Signature mismatch
    await orderModel.findByIdAndDelete(orderId);

    return res.json({
      success: false,
      status: "failed",
      message: "Invalid Signature"
    });

  } catch (error) {

    console.log(error);

    // Optional cleanup
    if (orderId) {
      await orderModel.findByIdAndDelete(orderId);
    }

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const userId = req.user.id;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log("GET MY ORDERS ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getAllOrders = async(req,res) =>{
   try{
const orders = await orderModel.find({})

  res.status(200).json({
    success:true,
    data:orders
  })
   }catch(error){
console.log(error)
   }
}

// api fore updation  order status

const updateOrderStatus = async(req,res) =>{

  try {
    const { orderId, status } = req.body;

    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.log("UPDATE ORDER STATUS ERROR:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { placeOrder, verifyOrder, getMyOrders,getAllOrders, updateOrderStatus };