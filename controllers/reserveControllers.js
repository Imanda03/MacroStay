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
    // const customer = await stripe.customers.create({
    //   email: req.body.email,
    //   customer: req.body.userName,
    // });
    // create card token

    const cardToken = await stripe.paymentIntents.create({
      amount: req.body.price,
      currency: "usd",
      payment_method_types: ["card"],
    });

    // const payment = await stripe.tokens.create(
    //   {
    //     amount: req.body.price * 100,
    //     currency: "npr",

    //     customer: customer.id,
    //     receipt_email: req.body.email,
    //   },
    //   {
    //     idempotencyKey: uuidv4(),
    //   }
    // );

    // const paymentIntent = await stripe.paymentMethods.create({
    //   amount: req.body.price,
    //   type: "card",
    //   currency: "npr",
    //   confirmation_method: "manual",
    //   confirm: true,
    //   return_url: "http://localhost:3000",
    // });
    if (cardToken) {
      console.log(cardToken);
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
