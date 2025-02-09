import mongoose from "mongoose";

export async function connectDb() {
  try {
    mongoose.connect(process.env.DATABASE_URL as string);
    console.log(`DB CONNECTED SUCCESFULLY`);
  } catch (error: any) {
    console.log(`DB CONNECTION FAILED`);
    throw new Error(error);
  }
}
