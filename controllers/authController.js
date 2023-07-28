import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";
//Checking the crypto module
import crypto from "crypto";
const algorithm = "aes-256-cbc"; //Using AES encryption
const initVector = crypto.randomBytes(16);
const securityKey = crypto.pbkdf2Sync(
  "prancypoodle",
  "sherylcrowe",
  10000,
  32,
  "sha512"
);

//encrypt function
const encypt = (text) => {
  const cipher = crypto.createCipheriv(algorithm, securityKey, initVector);
  let encryptedData = cipher.update(text, "utf-8", "hex");
  encryptedData += cipher.final("hex");
  return encryptedData;
};

//Decryption function
const decrypt = (text) => {
  const decipher = crypto.createDecipheriv(algorithm, securityKey, initVector);
  let decryptedData = decipher.update(text, "hex", "utf-8");
  decryptedData += decipher.final("utf8");
  return decryptedData;
};

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    // const hashPassword = encypt(req.body.password);

    const newUser = new User({
      ...req.body,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).send({ newUser, status: 200 });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not Found"));

    // const reqPassword = decrypt(user.password);
    // console.log(reqPassword);
    // if (reqPassword !== req.body.password)
    //   return next(createError(404, "Wrong Password"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) return next(createError(404, "Wrong Password"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    const { password, isAdmin, ...otherDetails } = user._doc;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .send({ details: { ...otherDetails }, isAdmin });
  } catch (error) {
    next(error);
  }
};
