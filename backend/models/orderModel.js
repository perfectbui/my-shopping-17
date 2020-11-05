const mongoose = require("mongoose");

const shippingSchema =new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
});

const paymentSchema = new mongoose.Schema({
  paymentMethod: { type: String, required: true },
});

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  qty: { type: String, required: true },
  image: { type: String, required: true },
  brand: { type: String, required: true },
});

const orderUserSchema =new mongoose.Schema( {
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const orderSchema =new mongoose.Schema( {
  shipping: shippingSchema,
  payment: paymentSchema,
  user: orderUserSchema,
  item: [orderItemSchema],
  time: { type: String },
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
