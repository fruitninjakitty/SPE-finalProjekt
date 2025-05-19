const express = require('express')
const router = express.Router()
const user = require('../models/User')
const { body, validationResult } = require('express-validator');
const logger = require("../utils/logger");


const jwtSecret = "hello my name is ram";
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

router.post("/createUser", [
  body('email').isEmail(),
  body('name').isLength({ min: 5 }),
  // password must be at least 5 chars long
  body('password', 'incorrect password').isLength({ min: 5 })
], async (req, res) => {
  logger.log({
    level: "info",
    message: "create User Called",
});
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //gensalt function is used to generate the salt value for our password encryption
  //any random value like 10 can be given inside the function
  const salt = await bcrypt.genSalt(10);
  // we use await because bcrypt has async functions
  let securePassword = await bcrypt.hash(req.body.password, salt)
  try {

    await user.create({
      name: req.body.name,
      password: securePassword,
      email: req.body.email,
      location: req.body.location
    })
    res.json({ success: true });
    logger.log({
      level: "info",
      message: "user registered successfully",
  });

  } catch (error) {
    console.log("there is an error");
    res.json({ success: false });
    logger.log({
      level: "info",
      message: "user failed to register",
  });

  }

})


router.post("/loginuser", [
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('password', 'incorrect password').isLength({ min: 5 })
], async (req, res) => {
  logger.log({
    level: "info",
    message: "login User Called",
});
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let email = req.body.email;

  try {

    let userData = await user.findOne({ email });
    if (!userData) {
      return res.status(400).json({ errors: "email not registered" });
    }

    //here we are comparing the password entered by the user to the hashed password stored in mongodb
    const pwdCompare = await bcrypt.compare(req.body.password, userData.password);
    if (!pwdCompare) {
      return res.status(400).json({ errors: "incorrect password" });
    }

    const data = {
      user: {
        id: userData.id
      }
    }

    const authToken = jwt.sign(data, jwtSecret);
    res.json({ success: true, authToken: authToken });
    logger.log({
      level: "info",
      message: "user logged in successfully",
  });


  } catch (error) {
    console.log("there is an error");
    res.json({ success: false });
    logger.log({
      level: "info",
      message: "Incorrect user details",
  });
  }

})

module.exports = router;