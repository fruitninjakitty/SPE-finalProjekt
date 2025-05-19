const express = require('express')
const router = express.Router()
const Groceries = require('../models/Grocery')
const logger = require("../utils/logger");

router.get("/getallitems", async (req, res) => {
    logger.log({
        level: "info",
        message: "Get all items called",
    });
    try {
        const items = await Groceries.find({})
        logger.log({
            level: "info",
            message: "Get all items successful",
        });
        res.send(items)
    } catch (error) {
        logger.log({
            level: "error",
            message: "Get all pizzas failed",
        });
        return res.status(400).json({ message: error });
    }

});

router.post("/additem", async (req, res) => {

    logger.log({
        level: "info",
        message: "A new item is being added",
    });

    const grocery = req.body.grocery

    try {
        const newgrocery = new Groceries({
            CategoryName: req.body.CategoryName,
            productName: req.body.productName,
            image: req.body.image,
            quantity: req.body.quantity,
            price: req.body.price,
            description: req.body.description,
            total: req.body.total,
        })
        await newgrocery.save()
        logger.log({
            level: "info",
            message: "Item added successfully",
        });
        // res.send('New Item Added Successfully')
    } catch (error) {
        logger.log({
            level: "error",
            message: "Add item failed",
        });
        console.log(error);
        return res.status(400).json({ message: error });
    }

});

// router.post("/deleteitem", async (req, res) => {
//     logger.log({
//         level: "info",
//         message: "Delete item called",
//     });

//     const pizzaid = req.body.pizzaid;

//     try {
//         await Groceries.findOneAndDelete({ _id: pizzaid })
//         logger.log({
//             level: "info",
//             message: "Pizza deleted successfully",
//         });
//         res.send('Pizza Deleted successfully')
//     } catch (error) {
//         return res.status(400).
//         logger.log({
//             level: "error",
//             message: "Delete pizza failed",
//         });json({ message: error });
//     }

// });


module.exports = router;