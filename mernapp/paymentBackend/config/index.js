const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");
const Razorpay = require("razorpay");

const app = express();
const port = 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Razorpay Config
const razorpay = new Razorpay({
  key_id: 'rzp_test_1aKj4xtkcJGgo8',
  key_secret: 'veTZqPDap4nUt5H5dSjxmGxi'
});

// Routes
app.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // amount in smallest currency unit (i.e. paise)
    currency: "INR",
    receipt: uuidv4(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

app.post("/capture-payment", async (req, res) => {
  const { orderId, paymentId, signature } = req.body;

  try {
    const response = await razorpay.payments.capture(paymentId, orderId, {
      amount: req.body.amount * 100, // amount in smallest currency unit (i.e. paise)
      currency: "INR",
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
