const path = require('path');
const fs = require('fs');
const user = require('../model/users');
const AWS = require('aws-sdk');

exports.getDataById = async(req,res) => {
    try{
        const _id = req.params.id;
        const getUser = await user.findById({_id});
        res.send(getUser);
    }
    catch(e)
    {
        req.status(400).send(e)
    }
}
exports.addData = async (req,res) => {
    try{

        const TravelData = new user({
            source : req.body.source,
            destination : req.body.destination,
            duration: req.body.duration,
            dtype :req.body.dtype,
            tmode: req.body.tmode,
            fdestination: req.body.fdestination,
            hotel :req.body.hotel,
        })

       
    const register = await TravelData.save();
    res.status(201);
    }
     catch(e){
        res.send(e);
     }
}


exports.getData = async (req, res) => {
    try {
        const data = await user.find();
        res.send(data);
    } catch (e) {
        res.status(500).send(e);
    }
};

exports.updateData = async (req,res) => {
    try{
        const _id = req.params.id;
        const getUser = await user.findByIdAndUpdate(_id,req.body,{
        });
        res.send(getUser);
    }
    catch(e)
    {
        req.status(500).send(e)
    }
}

exports.deleteData = async (req, res) => {
    try {
        const _id = req.params.id;
        const getUser = await user.findByIdAndDelete(_id);
        res.send(getUser);
    } catch (e) {
        res.status(500).send(e);
    }
};
