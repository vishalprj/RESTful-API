import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connection.js";
import product from "./models/products.js";

dotenv.config();

const port = process.env.PORT;
const app = express();
app.use(express.json());

// Connect to the database
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// api handle for adding products
app.post("/addproduct", async (req, res) => {
  try {
    const addProduct = new product(req.body);
    const products = await addProduct.save();
    res.status(201).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

// api handling for display all products
app.get("/product", async (req, res) => {
  try {
    const products = await product.find({});
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

// api handling for indivdual product
app.get("/product/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const products = await product.findById({ _id });
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

// api handling for udpate product
app.patch("/product/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const products = await product.findByIdAndUpdate(_id, req.body, {
      new: true,
    });
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

// api handling for delete product
app.delete("/product/:id", async (req, res) => {
  try {
    const products = await product.findOneAndDelete(req.params.id);
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
