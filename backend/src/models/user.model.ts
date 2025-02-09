import mongoose, { Model } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

export const UserModel = mongoose.model("User", userSchema);
