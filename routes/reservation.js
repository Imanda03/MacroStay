import express from "express";
import {
  addReserve,
  deleteReserve,
  getReserver,
} from "../controllers/reserveControllers.js";

const router = express.Router();

router.post("/:userid", addReserve);
router.get("/", getReserver);
router.delete("/:reserveid/:userid", deleteReserve);

export default router;
