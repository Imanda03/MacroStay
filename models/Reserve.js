import mongoose from "mongoose";

const ReserveSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    price: {
      type: Number,
    },
    roomNumber: {
      type: Number,
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

const Reserve = mongoose.model("Reserve", ReserveSchema);
export default Reserve;
