const express = require("express");
const Order = require("../models/orderModel");
const { isAuth } = require("../util");

const router = express.Router();

router.get("/:email", async (req, res) => {
  console.log("In profile route");
  const _email = req.params.email;
  const order = await Order.find({ "user.email": _email }).sort({ time: -1 });
  console.log(order);
  if (order) {
    res.send(order);
  } else {
    res.status(401).send({ message: "Order not found" });
  }
});

module.exports = router;
