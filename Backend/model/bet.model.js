import mongoose from "mongoose";

const betSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gmid: {
      type: Number,
      required: true,
    },
    mname: {
      type: String,
      required: true,
      trim: true,
    },
    betType: {
      type: String,
      required: true,
      trim: true,
    },
    betAmount: {
      type: Number,
      required: true,
      min: 1,
    },
    sid: {
      type: Number,
      required: true,
      min: 1,
    },
    etid: {
      type: Number,
      required: true,
      min: 1,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    profit: {
      type: Number,
      required: true,
      min: 1,
    },
    status: {
      type: String,
      enum: ["pending", "won", "lost"],
      default: "pending",
      required: true,
    },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Bet = mongoose.model("Bet", betSchema);
export default Bet;