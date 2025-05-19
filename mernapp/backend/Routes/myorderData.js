const express = require('express')
const router = express.Router()
const Order = require('../models/Orders')
const logger = require("../utils/logger");

router.post('/myorderData', async(req, res) =>{
    try{

        let myData= await Order.findOne({'email': req.body.email})
        res.json({orderData: myData})
        logger.log({
            level: "info",
            message: "view my order data",
        });
    }catch(error){
        res.send("this is Server Error", error.message)
        logger.log({
            level: "info",
            message: "cannot view their ordered data",
        });
    }
    })


    module.exports = router;