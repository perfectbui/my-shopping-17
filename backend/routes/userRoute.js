const express = require("express");
const User = require("../models/userModel");
const Order = require("../models/orderModel");
const { getToken } = require("../util");

const router = express.Router();

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "HaoPro",
      email: "haopro@gmail.com",
      password: "haopro123",
      isAdmin: true,
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ msg: "Invalid Email or Password." });
  }
});

router.post("/register", async (req, res) => {
  const oldUser = await User.findOne({
    email: req.body.email,
  });
  if (oldUser) {
    res.status(401).send({ msg: "Email has already registered" });
  } else {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const newUser = await user.save();
    res.send({
      _id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  }
});

router.post("/order", async (req, res) => {
  try {
    const order = new Order({
      shipping: req.body.shippingInfo,
      payment: req.body.paymentInfor,
      user: req.body.userInfor,
      item: req.body.cartItemsInfo,
      time: new Date(),
    });
    const newOrder = await order.save();
    if (newOrder) {
      res.send({ message: "Order save" });
    }
  } catch (error) {
    res.status(401).send({ message: "Order failed" });
  }
});

module.exports = router;
