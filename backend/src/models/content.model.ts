import mongoose, { Model } from "mongoose";
const { Schema } = mongoose;

const contentSchema = new Schema({
  link: {
    type: String,
  },
  type: {
    type: ["document", "tweet", "youtube", "link"],
  },
  title: {
    type: String,
  },

  tags: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Tag",
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const ContentModel = mongoose.model("Content", contentSchema);
