import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/checkAuthentication", verifyToken, (req, res, next) => {
  res.send("Hello user You are logged in");
});

//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

//GET
router.get("/:id", getSingleUser);

//GET ALL
router.get("/", getAllUsers);

export default router;
