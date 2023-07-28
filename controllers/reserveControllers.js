import Reserve from "../models/Reserve.js";
import User from "../models/Users.js";

export const addReserve = async (req, res) => {
  const userId = req.params.userid;
  const newReserve = new Reserve(req.body);
  try {
    const savedReserve = await newReserve.save();
    try {
      await User.findByIdAndUpdate(userId, {
        $push: { reserve: savedReserve._id },
      });
    } catch (error) {
      next(error);
    }

    res.status(200).json(savedReserve);
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
    await Reserve.findByIdAndDelete(req.params.id);
    try {
      await User.findByIdAndUpdate(userID, {
        $pull: { reserve: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Reserve has been canceled");
  } catch (error) {
    next(error);
  }
};
