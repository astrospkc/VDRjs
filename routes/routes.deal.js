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
    const deal = await deal.create({
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

const getAllDeals = async (req, res) => {
  try {
    const deal = await Deal.find();
    const deals = await Deal.aggregate([
      {
        $sort: { createdAt: -1 },
      },
    ]);
    res.status(200).send(deals);
  } catch (error) {
    res.status(500).send("internal error occurred");
  }
};

const sellerDeals = async (req, res) => {
  const user_id = req.user.id;
  try {
    const deals = await Deal.find({ seller: user_id });
    const dec_order_deal = await Deal.aggregate([
      {
        $sort: { createdAt: -1 },
      },
    ]);
    res.status(200).send(dec_order_deal);
  } catch (error) {
    res.status(500).send("internal error occurred");
  }
};

const boughtDeals = async (req, res) => {
  const user_id = req.user.id;
  try {
    const deals = await Deal.find({ buyer: user_id });
    if (deals.length === 0) {
      return res.status(200).send({ message: "No deals found" });
    }
    const dec_order_deal = await Deal.aggregate([
      {
        $sort: { createdAt: -1 },
      },
    ]);
    res.status(200).send(dec_order_deal);
  } catch (error) {
    return res.status(500).send("internal error occurred");
  }
};

router.post("/createDeal", fetchuser, createDeal);
router.get("/getAllDeals", getAllDeals);
router.get("/sellerDeals", fetchuser, sellerDeals);
router.get("/buyerDeals", fetchuser, boughtDeals);
export default router;
