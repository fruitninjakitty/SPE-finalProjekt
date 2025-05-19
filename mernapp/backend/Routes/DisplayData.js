const express = require('express')
const router = express.Router()
const logger = require("../utils/logger");

router.post('/food-data', (req, res) => {
  try {
    //global variable ko kahi bhi access kr sakte hai
    res.send([global.food_items, global.item_category])
    logger.log({
      level: "info",
      message: "displayed data successfully",
  });

  } catch (error) {
    console.error(error.message);
    res.send("server error");
  }
})

module.exports = router;