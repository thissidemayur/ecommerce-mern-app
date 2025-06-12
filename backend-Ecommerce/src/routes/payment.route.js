import { Router } from "express";
import {
  allCoupan,
  createCoupan,
  createRazorpayOrder,
  deleteCoupan,
  getSingleCoupan,
  updateCoupan,
  verifyRazorpayOrder,
} from "../controllers/payment.controller.js";
import { adminControl } from "../middlewares/adminControl.middlewares.js";
const paymentRouter = Router();

// -------------------- RAZORPAY- payment gateway integreation --------------------
paymentRouter.route("/create-order").post(createRazorpayOrder);
paymentRouter.route("/verify-payment").post(verifyRazorpayOrder);

export default paymentRouter;
// paymentRouter.route("/createCoupan").post(adminControl, createCoupan);
// paymentRouter.route("/allCoupan").get(adminControl, allCoupan);

// paymentRouter
//   .route("/:id")
//   .delete(adminControl, deleteCoupan)
//   .get(getSingleCoupan)
//   .put(adminControl, updateCoupan);
