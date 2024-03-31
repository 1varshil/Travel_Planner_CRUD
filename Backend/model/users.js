const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Travel_SQS");

const userSchema = mongoose.Schema({
    source:String,
    destination:String,
    duration: Number,
    dtype:Array,
    tmode:String,
    fdestination:String,
    hotel:String,
})

module.exports =mongoose.model("data",userSchema);