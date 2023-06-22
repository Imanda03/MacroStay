import express from "express";
import { addReserve, getReserver } from "../controllers/reserveControllers.js";

const router = express.Router();

router.post("/reserve", addReserve);
router.get("/reserve", getReserver);

export default router;
