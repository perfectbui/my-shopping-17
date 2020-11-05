const express = require("express");
const config = require("./config");
const userRoute = require("./routes/userRoute");
const mongoose = require("mongoose");
const Product=require("./models/productModel")
const bodyParser = require("body-parser");
const productRoute = require("./routes/productRoute");
const path = require("path");
const morgan = require("morgan");
const profileRoute = require("./routes/profileRoute");
const puppeteer=require('puppeteer');




const app = express();
const PORT = config.PORT;
const mongodbUrl = config.MONGODB_URL;

mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/order", profileRoute);


app.use(express.static(path.join(__dirname, "/../my-app/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(`${__dirname}/../my-app/build/index.html`));
});


app.listen(PORT, () => {
  console.log("Server started at http://localhost:5000");
});





// (async()=>{
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
//   await page.goto('https://tiki.vn/search?q=t%C3%ACnh+d%E1%BB%A5c&page=2')
 
//   const results = await page.evaluate(() => {
//     let image=[];
//     let name=[];
//     let price=[];
//     let imageItems = document.querySelectorAll('.content .image img')
//     imageItems.forEach((item) => {
//       image.push(item.getAttribute('src'));
//     })
//     let nameItems = document.querySelectorAll('.content .title')
//     nameItems.forEach((item) => {
//       name.push(item.innerText);
//     })
//     let priceItems = document.querySelectorAll('.content .price-regular')
//     priceItems.forEach((item) => {
//       price.push(item.innerText);
//     })
//     return {name,image,price};
//   });

 

//   for(let i=0;i<results.image.length;i++){
//     let split=results.price[i].split('');
//     console.log(split);
//     for(let i=0;i<split.length;i++){
//       if(split[i]==='.'||split[i]==='đ') split.splice(i,1)}
//     split=split.join('');
//     console.log(split);
//     const product = new Product({
//       name: results.name[i],
//       image: results.image[i],
//       brand: "Apple",
//       price: split,
//       rating: "3",
//       count: "5",
//       initialTime:new Date()
//     });
//     const newProduct = await product.save();
//     if(newProduct) console.log("product "+(i+1));
//   }
//   await browser.close()
// })()
  



