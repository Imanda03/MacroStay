import express from "express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  getUserRerve,
  updateUser,
} from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkAuthentication", verifyToken, (req, res, next) => {
//   res.send("Hello user You are logged in");
// });
// router.get("/checkUser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello user You are logged in and you can delete your account");
// });
// router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello Admin You are logged in and you can delete all accounts");
// });

//UPDATE
router.put("/:id", updateUser);

//DELETE
router.delete("/:id", deleteUser);

//GET
router.get("/:id", getSingleUser);

//GET ALL
router.get("/", getAllUsers);

router.get("/reserve/:id", getUserRerve);

export default router;
