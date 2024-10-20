const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid"); // Importing v4 from uuid

const app = express();
let DUMMY_PRODUCTS = []; // Changed to `let` to reflect possible mutation

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );
  next();
});

app.get("/products", (req, res, next) => {
  res.status(200).json({ products: DUMMY_PRODUCTS });
});

app.post("/product", (req, res, next) => {
  const { title, price } = req.body;

  if (!title || title.trim().length === 0 || !price || price <= 0) {
    return res.status(422).json({
      message: "Invalid input, please enter a valid title and price.",
    });
  }

  const createProduct = {
    id: uuidv4(), // Using v4 to generate UUID
    title,
    price,
  };

  DUMMY_PRODUCTS.push(createProduct); // Updating `DUMMY_PRODUCTS`

  res
    .status(201)
    .json({ message: "Created new product", product: createProduct });
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});