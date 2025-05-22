import mongoose from "mongoose";

const MONGO_URL = process.env.MONGODB_URL!;

if(!MONGO_URL){
  throw new Error("please add mongodb url in .env file");
}

let cached = global.mongoose;

if(!cached){
  cached = global.mongoose = {conn: null, promise: null}
}

export async function connectDB(){

  if(cached.conn) return cached.conn;

  if(!cached.promise){
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10
    }

    cached.promise = mongoose.connect(MONGO_URL, opts)
                      .then(() => mongoose.connection)
  }

  try {
    cached.conn = await cached.promise
  } catch (error) {
    cached.promise = null
    throw error
  }

  console.log("Connection successfull")
  return cached.conn

}