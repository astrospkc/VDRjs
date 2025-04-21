import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    // chatName
    deal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "deal",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", MessageSchema);
export default Message;
