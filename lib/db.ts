import mongoose from "mongoose";

const MONGO_URL = process.env.MONGODB_URL;

let cached = global.mongoose;