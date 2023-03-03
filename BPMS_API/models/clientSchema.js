const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
    {
        salutation:{
            type:String
        },
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
        phoneNumber: {
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
        },
        email:{
            type:String
        }

    },
    { timestamps: true }
)

module.exports = mongoose.model("Client", ClientSchema);