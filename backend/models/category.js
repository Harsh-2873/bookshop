const mongoose = require('mongoose');

const Category = new mongoose.Schema({
    name:{type:String,require:true},
    description:{type:String}
});

module.exports = mongoose.model("category",Category);