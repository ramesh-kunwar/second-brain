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
    type: [Schema.Types.ObjectId],
    ref: "Tag",
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const ContentModel = mongoose.model("Content", contentSchema);
