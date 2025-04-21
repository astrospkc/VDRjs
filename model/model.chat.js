import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
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
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: {
      type: mongoose.Schema.Types.String,
      ref: "message",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("chat", ChatSchema);
export default Chat;
