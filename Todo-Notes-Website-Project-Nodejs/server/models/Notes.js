const {Schema, default: mongoose} = require("mongoose")

module.exports = mongoose.model("Notes",new Schema({

    user : {
        type : Schema.ObjectId,
        ref : "User"
    },
    title : {
        type : String,
        required : true
    },
    body : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date ,
        default : Date.now
    },
    updatedAt : {
        type : Date,
        default : Date.now
    }

},{
    timestamps: true
  }))