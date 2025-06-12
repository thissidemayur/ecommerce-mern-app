import { Router } from "express";
import { upload } from "../middlewares/multer.middlewares.js";
import { adminControl } from "../middlewares/adminControl.middlewares.js";
import {allOrder, coustmerOrder, deleteOrder, getOrderById, newOrderCreated, procesOrder} from '../controllers/order.controller.js'

import  { authUser } from "../middlewares/auth.middlewares.js";
const orderRouter = Router()

orderRouter.route("/newOrder").post(upload.array("productImg", 6) ,newOrderCreated)
orderRouter.route("/getOrder/:orderId").get(authUser,getOrderById)


orderRouter.route("/allOrder").get(adminControl ,allOrder)
orderRouter.route("/myOrder").get(coustmerOrder)
orderRouter.route("/:id")
    .delete(adminControl, deleteOrder)
    .put(adminControl, procesOrder)


export default orderRouter