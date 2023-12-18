import {
  addCancellation,
  deletedCancellation,
  getAllCancellations,
} from "../controllers/Cancellation.js";
import express from "express";

const router = express.Router();

router.post("/", addCancellation);
router.get("/", getAllCancellations);
router.delete("/:id", deletedCancellation);

export default router;
