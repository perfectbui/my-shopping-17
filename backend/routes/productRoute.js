const express = require("express");
const User = require("../models/userModel");
const { getToken } = require("../util");
const Product = require("../models/productModel");
const { isAuth, isAdmin } = require("../util");

const router = express.Router();

// router.post("/search", async (req, res) => {
//   if(req.body.a) console.log(req.body.a);
//   console.log("Cái lồn")
//   const products = await Product.find({}).skip(1).limit(12);
//   res.send(products);
// });

router.post("/", isAuth, isAdmin, async (req, res) => {
  if (req.body.id) {
    const oldProduct = await Product.findById(req.body.id);
    if (oldProduct) {
      oldProduct.name = req.body.name;
      oldProduct.image = req.body.image;
      oldProduct.brand = req.body.brand;
      oldProduct.price = req.body.price;
      oldProduct.rating = req.body.rating;
      oldProduct.count = req.body.count;
      const update = await oldProduct.save();
      if (oldProduct) {
        return res.send({ message: "Update product successful!" });
      } else {
        return res.status(500).send({ message: "Error in updating product!" });
      }
    }
  } else {
    const product = new Product({
      name: req.body.name,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      rating: req.body.rating,
      count: req.body.count,
      initialTime:new Date()
    });
    const newProduct = await product.save();
    if (newProduct) {
      return res
        .status(201)
        .send({ message: "New Product Created", data: newProduct });
    }

    return res.status(500).send({ message: "Fail to create product" });
  }
});

router.get("/:id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  if (product) {
    await product.remove();
    res.send({ message: "Product deleted" });
  } else {
    res.send("Error in Deletion.");
  }
});

router.post("/:id/reviews", isAuth, async (req, res) => {
  const _id = req.params.id;
  const product = await Product.findById(_id);
  if (product) {
    const review = {
      user: req.body.name,
      rating: req.body.rating,
      comment: req.body.comment,
      time: new Date(),
    };
    product.reviews.unshift(review);
    product.rating =
      Math.round(
        (product.reviews.reduce((a, c) => a + parseInt(c.rating, 10), 0) /
          product.reviews.length) *
          10
      ) / 10;
    const updatedProduct = await product.save();
    res.send({ message: "Save review successful!" });
  } else {
    res.status(404).send({ msg: "Product not found to add review" });
  }
});

router.post("/search/:character", async (req, res) => {
  const _character = req.params.character;
  console.log(_character);
  const product = await Product.find({ name: new RegExp(_character, "i") }).sort({_id:-1}).skip(req.body.index).limit(req.body.num);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "NOT FOUND CHARACTER" });
  }
});

router.post("/search", async (req, res) => {
  const product = await Product.find({}).sort({_id:-1}).skip(req.body.index).limit(req.body.num);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "NOT FOUND CHARACTER" });
  }
});

module.exports = router;
