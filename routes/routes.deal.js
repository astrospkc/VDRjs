import Deal from "../model/model.deal.js";
import express from "express";
import fetchuser from "../middleware/fetchUser.js";

const router = express.Router();

const createDeal = async (req, res) => {
  const { title, description, price, status } = req.body;
  //   const { user } = req.user;
  const user = req.user;
  console.log("user in createdeal: ", req.user);

  try {
    if (!title || !description || !price) {
      return res.status(400).send("please fill up all the inboxes");
    }
    const deal = await Deal.create({
      title,
      description,
      price,
      seller: user.id,
    });
    res.status(200).send(deal);
  } catch (error) {
    res.status(500).send("internal error occurred");
  }
};

router.post("/createDeal", fetchuser, createDeal);
export default router;
