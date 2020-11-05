const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: { type: String, required: true },
  rating: { type: String, required: true },
  comment: { type: String },
  time: { type: String },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
  rating: { type: String, required: true },
  count: { type: String, required: true },
  initialTime:{type:String,required:true},
  reviews: [reviewSchema],
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
