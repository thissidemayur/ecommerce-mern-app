import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import Coupan from "../model/Coupan.model.js";
import { razorpayInstance } from "../utils/razorpayInstance.js";
import crypto from "crypto";
import Product from "../model/product.model.js";
import { RAZORPAY_API_SECRET } from "../config.js";
import { Order } from "../model/order.model.js";
//----------------------------- PAYMENT INTEGREATION- razorpay -----------------------------

// Create Order Endpoint
export const createRazorpayOrder = asyncHandler(async (req, res) => {
  const {
    productId,
    deliveryAddress,
    deliveryCharge,
    packageCharge,
    tax,
    totalAmount,
    totalPayableAmount,
    orderedUser,
    orderedItemList,
    paymentMethod,
    orderType,
  } = req.body;
  console.log("TOtal amount: ", totalAmount);

  try {
    // 🔒 Fetch product & price securely from DB
    const product = await Product.findById(productId);
    const amount = product.variants[0].price * 100;
    const razorpayOrderAmountInfo = {
      amount: amount,
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };

    // create razo pay order
    const razorpayOrder = await razorpayInstance.orders.create(
      razorpayOrderAmountInfo
    );

    // save to db
    const newOrder = new Order({
      deliveryAddress,
      deliveryCharge,
      packageCharge,
      tax,
      totalAmount,
      totalPayableAmount,
      orderedUser,
      orderedItemList,
      paymentMethod,
      orderType,
      razorpayOrderId: razorpayOrder.id,
    });

    await newOrder.save();

    const order = {
      newOrder,
      razorpayOrder,
    };

    // return order info + razor pay order
    res
      .status(200)
      .json(
        new ApiResponse(200, order, "razor pay order created successfully")
      );
  } catch (error) {
    console.error("error:: createRazorpayOrder -->: ", error);
    throw new ApiError(400, "failed to create razorpay order");
  }
});

// verify razorpay payement
export const verifyRazorpayOrder = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  try {
    // Step 1: Create HMAC SHA256 signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed!" });
    }

    // Step 2: Update order status in DB
    const order = await Order.findByIdAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        $set: {
          paymentStaus: "Fullfilled",
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: "Paid",
        },
      },
      { new: true }
    );

    //
    if (!order) {
      throw new ApiError(400, "Order not found");
    }

    res
      .status(200)
      .json(new ApiResponse(200, order, "Payment verified successfully!"));
  } catch (error) {
    console.error(
      "Payment verification failed: ::verifyRazorpayOrder --->: ",
      error
    );
    throw new ApiError(400, "Internal server error ::verifyRazorpayOrder -->!");
  }
});

// TASK: CRUD on Coupan

export const createCoupan = asyncHandler(async (req, res) => {
  const { code, amount } = req.body;
  if (!code || !amount) throw new ApiError(200, "all field are mendatory!");

  const coupan = await Coupan.create({ code, amount });
  return res
    .status(200)
    .json(new ApiResponse(200, coupan, "coupan created successfully!!"));
});

export const deleteCoupan = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new ApiError(400, "coupan id is not present");
  const coupan = await Coupan.findById(id);
  if (!coupan) throw new ApiError(400, "coupan is not present!");

  await coupan.deleteOne();
  return res
    .status(200)
    .json(new ApiResponse(200, "deleted", "coupan deleted successfully!"));
});

export const allCoupan = asyncHandler(async (_, res) => {
  const coupans = await Coupan.find();
  if (!coupans) throw new ApiError(400, "coupan is not present");
  return res
    .status(200)
    .json(new ApiResponse(200, coupans, "coupan coming successfully!"));
});

export const getSingleCoupan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) throw new ApiError(400, "coupan id is not present");

  const coupan = await Coupan.findById(id);
  if (!coupan) throw new ApiError(400, "coupan is not present!");

  return res
    .status(200)
    .json(new ApiResponse(200, coupan, "coupan come successfully!"));
});

export const updateCoupan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { code, amount } = req.body;
  if (!code && !amount)
    throw new ApiError(200, "add atleast one field to update coupan!");
  if (!id) throw new ApiError(400, "coupan id is not present");

  const coupan = await Coupan.findById(id);
  if (!coupan) throw new ApiError(400, "coupan is not present!");
  if (code) coupan.code = code;
  if (amount) coupan.amount = amount;
  coupan.save();

  return res
    .status(200)
    .json(new ApiResponse(200, coupan, "coupan come successfully!"));
});
