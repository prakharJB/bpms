const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema(
    {
        title: {
            type: String
        },
        summary: {
            type: String
        },
        feature: {
            type: String
        },
        technology: {
            type: String
        },
        image: {
            type: String
        },
        plugin:{
            type:Array
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Portfolio", PortfolioSchema);