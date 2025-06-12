import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { Order } from "../model/order.model.js";

// ------------------------- create order -------------------------
export const newOrderCreated = asyncHandler(async (req, res) => {
  const {
    deliveryAddress,
    deliveryCharge,
    packageCharge,
    tax,
    totalAmount,
    totalPayableAmount,
    orderedUser,
    orderedItemList,
    orderType,
    paymentMethod,
  } = req.body;
  console.log("totalAmount ::order = ", totalAmount);

  let packageChargePresent;

  if (packageCharge) packageChargePresent = true;
  const userOrderedInput = [
    deliveryAddress,
    deliveryCharge,
    tax,
    totalAmount,
    totalPayableAmount,
    orderedUser,
    orderedItemList,
    orderType,
    paymentMethod,
  ];

  const fieldNames = [
    "deliveryAddress",
    "deliveryCharge",
    "tax",
    "totalAmount",
    "totalPayableAmount",
    "orderedUser",
    "orderedItemList",
    "orderType",
    "paymentMethod",
  ];

  // if any of field is absent then it throw error
  userOrderedInput.forEach((input, index) => {
    if (input === undefined) {
      throw new ApiError(400, `${fieldNames[index]} field is empty!`);
    }
  });

  const orderCreated = await Order.create({
    deliveryAddress,
    deliveryCharge,
    packageCharge: packageChargePresent ? packageCharge : 0,
    tax,
    totalAmount,
    totalPayableAmount,
    orderedUser,
    orderedItemList,
    orderType,
    paymentMethod,
  });

  console.log("orderCreated: ", orderCreated);

  return res
    .status(200)
    .json(new ApiResponse(201, orderCreated, "order created successfully!"));
});

// ------------------------- get order by id -------------------------
export const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  if (!orderId) throw new ApiError(400, "order id should be present!");

  const singleOrder = await Order.findById(orderId).populate(
    "orderedItemList.productId"
  );
  if (!singleOrder) throw new ApiError(400, "order not found!");

  // for authorization:
  if (singleOrder.orderedUser.toString() !== req.authUser._id.toString())
    throw ApiError(400, "Unauthorized user!");

  return res
    .status(200)
    .json(new ApiResponse(201, singleOrder, "order get succeffsull!"));
});

// ------------------------- all order -------------------------
export const allOrder = asyncHandler(async (req, res) => {
  const allOrder = await Order.find().populate("orderedUser", "name");
  if (!allOrder) throw new ApiError(400, "there is currently no order! ");

  return res
    .status(200)
    .json(new ApiResponse(200, allOrder, "all order successfully sent!"));
});

//  ------------------------- coustmer order(myOrder) -------------------------
export const coustmerOrder = asyncHandler(async (req, res) => {
  const id = req.authUser?._id;

  if (!id) throw new ApiError(400, "coustmer id not found");

  const myorder = await Order.find({ orderedUser: id });
  if (!myorder)
    throw new ApiError(
      400,
      "No order yet placed, plz add product to proceed order!"
    );

  return res
    .status(400)
    .json(
      new ApiResponse(
        400,
        myorder,
        ` order placed by userId:${id} is sucessfull!`
      )
    );
});

// ------------------------- deleteOrder  -------------------------
export const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) throw new ApiError(400, "order id should be present!");

  const order = await Order.findById(id);

  if (!order) throw new ApiError(400, "order is not found!");

  await order.deleteOne();

  return res
    .status(200)
    .json(
      new ApiResponse("200", { deleted: "successfull" }, "successful deleted")
    );
});

// ------------------------- getProcessOrder -------------------------
export const procesOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.id;
  if (!orderId) throw new ApiError(400, "order id should be present!");

  const order = await Order.findById(orderId);
  if (order.status === "Delivered")
    throw new ApiError(400, "Order is already deliverd");
  switch (order.status) {
    case "Pending": {
      order.status = "Shipped";
      break;
    }
    case "Shipped": {
      order.status = "Delivered";
      break;
    }
    default: {
      throw new ApiError(401, "Order not found! ");
    }
  }

  order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order.status, "Order Processed Successfully"));
});
