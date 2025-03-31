// import express
// express js is the backend part of MEAN and manages routing, sessions, HTTP requests, error handling
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv, { config } from "dotenv";
dotenv.config();
// import fetchuser from "../middleware/fetchUser.js";
import User from "../model/model.user.js";
const router = express.Router();
// const { body, validationResult } = require("express-validator");
const JWT_SECRET = process.env.JWT_TOKEN;
console.log("jwt secret: ", JWT_SECRET);

//create a User using: POST "/api/auth/createuser". No login required
router.post(
  "/createuser",

  async (req, res) => {
    // console.log(req.body);
    let success = false;

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry a user with this email already exist.",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = bcrypt.hashSync(req.body.password, salt);

      // create a user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
        role: req.body.role,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      // const authtoken = jwt.sign({ data }, JWT_SECRET, { expiresIn: "1h" });
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;

      console.log("trying to create user");

      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal error occurred");
    }
  }
);

//Login : POST "/api/auth/login".
router.post(
  "/login",

  async (req, res) => {
    let success = false;
    const { email, password } = req.body;
    console.log("email: ", email, "password: ", password);

    try {
      let user = await User.find({ email });
      console.log("user: ", user);
      // console.log({ user });
      if (!user || user.length === 0) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please login with correct credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user[0].password);

      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ error: "Please login with correct credentials" });
      }
      const data = {
        user: {
          id: user[0]._id,
        },
      };
      console.log("data: ", data);

      console.log("login");

      // const authtoken = jwt.sign({ data }, JWT_SECRET, { expiresIn: "1h" });
      const authtoken = jwt.sign(data, JWT_SECRET);

      success = true;
      // console.log("req.headers: ", req.headers);
      console.log(success, authtoken);

      res.json({ success, authtoken, user });
      // }
    } catch (error) {
      res.status(500).send("Internal error occurred");
    }
  }
);

export default router;
