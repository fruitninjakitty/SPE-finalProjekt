const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')
const { compareSync } = require('bcryptjs')
const logger = require("../utils/logger");
const Grocery = require('../models/Grocery');

router.post('/orderData', async (req, res) => {

    logger.log({
        level: "info",
        message: "Order place request",
    });

    let data = req.body.order_data
    // await data.splice(0, 0, {Order_date: req.body.order_data})
    data.unshift({ order_date: req.body.order_date })

    //if email not existing in db the create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })
    console.log(eId)

    if (eId === null) {
        try {

            // Update Grocery collection for each item in the order_data array
            for (let i = 0; i < data.length; i++) {
                const item = data[i];
                const itemName = item.productName;
                const itemQuantity = item.quantity;
                const total=item.total;
                await Grocery.updateOne(
                    { productName: itemName },
                    { $inc: { total: total, quantity: -itemQuantity } }
                  );
                }

                await Order.create({
                    email: req.body.email,
                    order_data: [data],
                    total: req.body.total
                }).then(() => {
                    res.json({ success: true })
                })

            } catch (error) {
                console.log(error.message)
                res.send("Server Error", error.message)
            }
        }

    else {
            try {

                await Order.findOneAndUpdate({ email: req.body.email },
                    { $push: { order_data: data }, $set: { total: req.body.total } }).then(() => {
                        res.json({ success: true })
                    })

            } catch (error) {
                console.log(error);
            }
        }




    })

router.post('/checkout', async (req, res) => {
    // retrieve the order data from the request body
    const { email, order_data } = req.body;

    try {
        // iterate over each item in the order
        for (const item of order_data) {
            // retrieve the corresponding grocery item from the database
            const groceryItem = await Grocery.findOne({ productName: item.productName });

            // calculate the new total for the grocery item
            const newTotal = Number(groceryItem.total) - Number(item.quantity);

            // update the grocery item's total field in the database
            await Grocery.findOneAndUpdate(
                { productName: item.productName },
                { total: newTotal }
            );
        }

        // update the order data and total in the Order collection for the given email
        await Order.findOneAndUpdate(
            { email },
            { order_data, total: req.body.total }
        );

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;