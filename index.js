import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import roomsRoutes from "./routes/rooms.js";
import hotelsRoutes from "./routes/hotels.js";
import reserveRoutes from "./routes/reservation.js";
import cancelRoutes from "./routes/Cancellation.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

const connect = () => {
  mongoose.connect(process.env.URL);
  console.log("DataBase has been connected");
};

//middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/hotels", hotelsRoutes);
app.use("/api/reserve", reserveRoutes);
app.use("/api/cancel", cancelRoutes);

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong..";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
  connect();
});
