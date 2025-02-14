import mongoose, { Model } from "mongoose";
const { Schema } = mongoose;

const tagsSchema = new Schema({
  title: String,
});

export const TagsModel = mongoose.model("Tag", tagsSchema);
