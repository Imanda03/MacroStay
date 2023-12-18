import mongoose from "mongoose";

const CancellationSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    days: {
      type: String,
    },
    hotelName: {
      type: String,
    },
  },
  { timestamps: true }
);

const Cancellation = mongoose.model("Cancellation", CancellationSchema);
export default Cancellation;
