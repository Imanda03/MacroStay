import Reserve from "../models/Reserve.js";
import User from "../models/Users.js";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";
import Cancellation from "../models/Cancellation.js";
import Room from "../models/Rooms.js";

const stripe = new Stripe(
  "sk_test_51Ntuu9F8i2EULDmhJyXf5ojdni05vJXZWkBgbUCchAvsk8H4RYhQWbV5295RMsBrrxKspNIuOjopMCJYTGfa2KcY00PY0cMg05"
);

export const addReserve = async (req, res, next) => {
  const userId = req.params.userid;
  const user = await User.findByIdAndUpdate(userId);
  try {
    const cardToken = await stripe.paymentIntents.create({
      amount: req.body.price,
      currency: "usd",
      payment_method_types: ["card"],
    });

    if (cardToken) {
      // req.body.transactionId = payment.source.id;
      const newReserve = new Reserve(req.body);

      const savedReserve = await newReserve.save();
      try {
        await User.findByIdAndUpdate(userId, {
          $push: { reserve: savedReserve._id },
        });
      } catch (error) {
        next(error);
      }

      res.status(200).json(savedReserve);
    } else {
      console.error("Stripe API Error:", error);
      res.status(500).send({ error: "Server error" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getReserver = async (req, res, next) => {
  try {
    const reserve = await Reserve.find();
    return res.status(200).json(reserve);
  } catch (error) {
    next(error);
  }
};

export const deleteReserve = async (req, res, next) => {
  const userID = req.params.userid;
  const roomid = req.params.roomId;
  try {
    await Reserve.findByIdAndDelete(req.params.reserveid);

    try {
      await User.findByIdAndUpdate(userID, {
        $pull: { reserve: req.params.reserveid },
      });

      Room.findOne({ "roomNumbers._id": roomid })
        .then((room) => {
          //Make the room available
          if (room) {
            const roomNumberIndex = room.roomNumbers.findIndex(
              (number) => number._id.toString() === roomid
            );

            if (roomNumberIndex !== -1) {
              room.roomNumbers[roomNumberIndex].unavailableDates = [];
              return room.save();
            } else {
              console.log(
                "RoomNumber not found in the room's roomNumbers array"
              );
            }
          } else {
            console.log("Room not found with the specified roomNumber ID");
          }
        })
        .then(() => {
          console.log("Unavailable dates cleared successfully");
          // Send the response after all operations are completed
          res.status(200).json("Reserve has been canceled");
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json("Internal Server Error");
        });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
