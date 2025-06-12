import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    deliveryAddress: {
      fullName: {
        type: String,
      },

      address: {
        type: String,
        required: [true, "address must be provided!"],
      },
      pincode: {
        type: String,
        required: [true, "pincode must be present"],
      },
      city: {
        type: String,
        required: [true, "city must be present"],
      },
      state: {
        type: String,
        required: [true, "state must be present"],
      },
      landmark: {
        type: String,
      },
      deliveredMobileNum: {
        type: Number,
        required: [true, "phone number must be present"],
      },
      deliveredEmail: {
        type: String,
      },
      country: {
        type: String,
        default: "India",
      },
    },
    deliveryCharge: {
      type: Number,
      required: [true, " delivery charge should be present"],
    },
    packageCharge: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      required: [true, " tax charge should be present"],
    },
    totalAmount: {
      type: Number,
      required: [true, " total amount should be present"],
    },
    totalPayableAmount: {
      type: Number,
      required: [true, " total payable amount should be present"],
    },
    orderedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user is required"],
    },
    orderedItemList: [
      {
        name: String,
        price: Number,
        qunatity: Number,
        size: String,
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],

    status: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancell"],
      default: "Pending",
    },
    paymentStaus: {
      type: String,
      enum: ["Pending", "Fullfilled", "Cancelled"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["stripe", "cod"],
      required: [true, "Payment method is required"],
    },
    orderType: {
      type: String,
      enum: ["cart", "buyNow"],
      required: [true, "order Type is required"],
    },

    // razorpay payment gateway
    razorpayOrderId: {
      type: String,
    },
    razorpayPaymentId: {
      type: String,
    },
    razorpaySignature: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
