import Hotel from "../models/Hotels.js";

//To add hotels
export const addHotels = async (req, res, next) => {
  const newHotel = new Hotel(req.body);

  console.log(newHotel);
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

//Update Hotels
export const updateHotels = async (req, res, next) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (error) {
    next(error);
  }
};

//Delete Hotels
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted");
  } catch (error) {
    next(error);
  }
};

//Get Single Hotel
export const getSingleHotels = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (error) {
    next(error);
  }
};

//Get All Hotels
export const getAllHotels = async (req, res, next) => {
  //   const failed = true;

  //   return next(createError("401", "You are not authenticated"));

  try {
    const hotels = await Hotel.find(req.params.id);
    res.status(200).json(hotels);
  } catch (error) {
    next(error);
  }
};
