import Room from "../models/Rooms.js";
import Hotel from "../models/Hotels.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }

    res.status(200).json(savedRoom);
  } catch (error) {
    next(error);
  }
};

//Update Rooms
export const updateRooms = async (req, res, next) => {
  try {
    const updatedRoom = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne({ "roomNumbers._id": req.params.id }, {
      $push: {
        "roomNumbers.$.unavailableDates" :req.body.dates
      }
    })
    res.status(200).json("Room status updated");
  } catch (error) {
    next(error);
  }
};

//Delete Room
export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Room has been deleted");
  } catch (error) {
    next(error);
  }
};

//Get Single Room
export const getSingleRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (error) {
    next(error);
  }
};

//Get All rooms
export const getAllRooms = async (req, res, next) => {
  //   const failed = true;

  //   return next(createError("401", "You are not authenticated"));

  try {
    const rooms = await Room.find(req.params.id);
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
