const {Schema, default : mongoose} = require("mongoose")

module.exports  = mongoose.model("User",new Schema({

    googleId : {
        type : String,
        required : true
    },
    displayName : {
        type : String,
        required : true
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
    },
    profileImage : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }


}))