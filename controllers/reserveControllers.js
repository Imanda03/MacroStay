import Reserve from "../models/Reserve.js";

export const addReserve = async (req, res) => {
  try {
    const newReserver = new Reserve(req.body);
    const saveReserve = await newReserver.save();
    return res.status(200).json(saveReserve);
  } catch (error) {
    next(error);
  }
};

export const getReserver = async (req, res) => {
  try {
    const reserve = await Reserve.find();
    return res.status(200).json(reserve);
  } catch (error) {
    next(error);
  }
};
