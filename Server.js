import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

import router from "./index.js";
const app = express();

import cookieParser from "cookie-parser";
app.use(cookieParser());

app.use(express.json());
app.use(router);



mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("The mangoDB Connect Succefully!"))
    .catch((err) => console.log(err));


const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Serever is running on the ${port}`);

})