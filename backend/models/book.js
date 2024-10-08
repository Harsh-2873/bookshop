const mongoose = require("mongoose");

const book = new mongoose.Schema({

    url :{
        type:String,
        required:true,
    },
    CategoryId:{
        type:mongoose.Schema.Types.ObjectId,ref:'category',
        require:true
    },
    title :{
        type:String,
        required:true,
    },
    author :{
        type:String,
        required:true,
    },
    price :{
        type:Number,
        required:true,
    },
    desc :{
        type:String,
        required:true,
    },
    language :{
        type:String,
        required:true,
    },
},
    {timestamps:true}
);

module.exports = mongoose.model("books",book);