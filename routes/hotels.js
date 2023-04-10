import express from "express";
import {
  addHotels,
  deleteHotel,
  getAllHotels,
  getSingleHotels,
  updateHotels,
} from "../controllers/hotelController.js";

const router = express.Router();

//CREATE
router.post("/", addHotels);

//UPDATE
router.put("/:id", updateHotels);

//DELETE
router.delete("/:id", deleteHotel);

//GET
router.get("/:id", getSingleHotels);

//GET ALL
router.get("/", getAllHotels);

export default router;
