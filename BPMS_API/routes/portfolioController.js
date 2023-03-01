const router = require("express").Router();
const portfolioSchema = require('../models/portfolioSchema');

// A list of all portfolio
router.get("/", async (req, res) => {
    try {
        const portfolio = await portfolioSchema.find()
        res.status(200).json(portfolio);
    } catch {
        res.status(500).json(err);
    }
})


module.exports = router