import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"], //  allow sending cookies
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";
import orderRouter from "./routes/order.route.js";
import paymentRouter from "./routes/payment.route.js";
import staticRouter from "./routes/static.route.js";
import verificationRouter from "./routes/verification.route.js";

import { errorHandler } from "./middlewares/errorHandler.middlewares.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/payment", paymentRouter);
app.use("/api/v1/static", staticRouter);
app.use("/api/v1/verification", verificationRouter);

app.use(errorHandler);
app.use((req, res, next) => {
  console.log("Incoming Cookies in app.js:", req.cookies);
  console.log("userAuth in app.js: ", req.authUser); // Will log all cookies
  next();
});

app.get("/", (req, res) => {
  res.send(`अपने मस्तिक्ष के अनन्त ब्रह्माण्ड में खोया सा ह, जगदम्बा के सहारे khara हु<br/>  नजाने कब गिर जाऊँगा pata nhi इसलिए उनका हाथ पक्ड़ा हुआ हु
        <br/> <p className="text-3xl">chal bete ab bahar aaja</p>`);
});
// Will tell you how many listeners are attached

export { app };
