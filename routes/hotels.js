import express from "express";
import {
  addHotels,
  countByCity,
  countByType,
  deleteHotel,
  getAllHotels,
  getHotelRooms,
  getSingleHotels,
  updateHotels,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", addHotels);

//UPDATE
router.put("/:id", updateHotels);

//DELETE
router.delete("/:id", deleteHotel);

//GET
router.get("/find/:id", getSingleHotels);

//GET ALL
router.get("/", getAllHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;
