const Orgnization = require("../models/orgnizationSchema");
const router = require("express").Router();
const { isEmpty, getRandomInt } = require('../helpers/utils');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const moment = require('moment');

//Register Organization
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (isEmpty(name) || isEmpty(email) || isEmpty(password))
      return res.status(400).send("Invalid Input");

    // Generate a new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newOrgnization = new Orgnization({
      ...req.body,
      password: hashedPassword,
    });

    //Save User
    await newOrgnization.save();
    res.status(200).json(newOrgnization);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
});

// Login orgnization
router.post("/login", async (req, res) => {
  try {
    //Find user
    const org = await Orgnization.findOne({ name: req.body.name });
    !org && res.status(404).send("Orgnization not found.");

    // Check if password is valid
    const validPassword = await bcrypt.compare(
      req.body.password,
      org.password
    );
    !validPassword && res.status(400).json("Wrong password.");

    const orgniztiontoken = jwt.sign(
      { name: org.name },
      process.env.JWT_SECRET,
      { expiresIn: "48h" }
    );

    res.status(200).json({ org, orgniztiontoken });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const org = await Orgnization.find();
    res.status(200).json(org);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const org = await Orgnization.findById(req.params.id);
    res.status(200).json(org);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const org = await Orgnization.findById(req.params.id);
    await org.updateOne({ $set: req.body });
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const org = await Orgnization.findById(req.params.id);
    await org.deleteOne();
    
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

