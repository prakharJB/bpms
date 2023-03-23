const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema(
    {
        title:{
            type:  String,
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
        },
        client:{
            type: String
        },
        domainName:{
            type:String
        },
        natureOfbusiness:{
            type:String
        },
        languageOfwebsite:{
            type:String
        },
        theme:{
            type:String
        },
        link:{
            type:String
        },
        logo:{
            type:String
        }

    },
    { timestamps: true }
)

module.exports = mongoose.model("Portfolio", PortfolioSchema);