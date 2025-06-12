import { Router } from "express";
import { AdminDashboard, PieChart } from "../controllers/static.controller.js";
import { adminControl } from "../middlewares/adminControl.middlewares.js";
const staticRouter = Router()

staticRouter.route("/dashboard").get(adminControl ,AdminDashboard)

staticRouter.route("/pieChart").get(adminControl ,PieChart)






export default staticRouter