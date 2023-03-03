const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        city: {
            type: String
        },
        gender: {
            type: String
        },
        country: {
            type: String
        },
        number: {
            type: String
        },
        project:{
            type:Array
        },
        projectDeliverDate:{
            type: String
        },
        agency:{
            type:String
        },
        dob:{
            type:String
        },
        timezone:{
            type:String
        },
        language:{
            type:String
        }

    },
    { timestamps: true }
)

module.exports = mongoose.model("Client", ClientSchema);