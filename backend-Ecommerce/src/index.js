import connectDB from "./database/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({ path: "./.env" }); //use to load env variable into process.env

const port = process.env.PORT || 2000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`⚙️ server is connected with PORT:${port}`);
    });
  })
  .catch((error) => {
    console.log("❌ Mongodb DB connection fail");
    throw new Error(error);
  });
