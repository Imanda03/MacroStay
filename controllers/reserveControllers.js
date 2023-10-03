import Reserve from "../models/Reserve.js";
import User from "../models/Users.js";
import Stripe from "stripe";
import { v4 as uuidv4 } from "uuid";

const stripe = new Stripe(
  "sk_test_51Ntuu9F8i2EULDmhJyXf5ojdni05vJXZWkBgbUCchAvsk8H4RYhQWbV5295RMsBrrxKspNIuOjopMCJYTGfa2KcY00PY0cMg05"
);

// import uuidv4 from "uuidv4";

export const addReserve = async (req, res, next) => {
  const userId = req.params.userid;
  const user = await User.findByIdAndUpdate(userId);
  console.log(req.body);
  try {
    const customer = await stripe.customers.create({
      email: req.body.email,
      customer: req.body.userName,
    });
    const payment = await stripe.charges.create(
      {
        amount: req.body.price * 100,
        currency: "npr",
        customer: customer.id,
        receipt_email: req.body.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );
    if (payment) {
      console.log(error2);
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
      next(error);
    }
  } catch (error) {
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
  try {
    await Reserve.findByIdAndDelete(req.params.reserveid);
    try {
      await User.findByIdAndUpdate(userID, {
        $pull: { reserve: req.params.reserveid },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Reserve has been canceled");
  } catch (error) {
    next(error);
  }
};
