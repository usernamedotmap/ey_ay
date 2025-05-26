
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  chats: [
    {
      _id: {
        type: String,
      
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now()
      }
    },
  ],
}, {timestamps: true});


export default mongoose.models.chat || mongoose.model("UserChats", userSchema)
  