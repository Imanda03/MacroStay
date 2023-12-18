import Cancellation from "../models/Cancellation.js";

export const addCancellation = async (req, res, next) => {
  const newCancel = new Cancellation(req.body);
  try {
    const savedCancellation = await newCancel.save();
    res.status(200).json(savedCancellation);
  } catch (err) {
    next(err);
  }
};

export const getAllCancellations = async (req, res, next) => {
  try {
    const cancel = await Cancellation.find();
    res.status(200).json(cancel);
  } catch (error) {
    next(error);
  }
};

export const deletedCancellation = async (req, res, next) => {
  try {
    await Cancellation.findByIdAndDelete(req.params.id);
    res.status(200).json("Cacellation has been deleted");
  } catch (error) {
    next(error);
  }
};
