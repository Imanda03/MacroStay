import express from "express";
import {
  addHotels,
  deleteHotel,
  getAllHotels,
  getSingleHotels,
  updateHotels,
} from "../controllers/hotelController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE
router.post("/", verifyAdmin, addHotels);

//UPDATE
router.put("/:id", verifyAdmin, updateHotels);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/:id", getSingleHotels);

//GET ALL
router.get("/", getAllHotels);

export default router;
