const Patient = require("../Modules/patientModules");
const express = require("express");
//const { errorMonitor } = require("events");
const patientRouter = express.Router();

patientRouter.get("/", async (req,res)=>{
    
    try{
        const patient = await Patient.find();
        res.json(patient);
    } catch(error)
    {
        console.log(error);
    }
    
});
patientRouter.delete("/:id", async (req,res)=>{
    
    try{
        const patient = await Patient.deleteOne({"_id":req.params.id});
        res.json(patient);
    } catch(error)
    {
        console.log(error);
    }
});
patientRouter.patch("/:id", async (req,res)=>{
    
    try{
        const patient = await Patient.updateOne({"_id":req.params.id},{
            "_id":req.body._id,
            "password":req.body.password,
            "fullName":req.body.fullName,
            "bloodType":req.body.bloodType,
            "height":req.body.height,
            "weight":req.body.weight,
            "phone":req.body.phone,
            "birthDate":req.body.birthDate,
            "gender":req.body.gender,
            "address":req.body.address,
            "donate":req.body.donate
        });
        res.json(patient);
    } catch(error)
    {
        console.log(error);id
    }
});
patientRouter.post("/",(req,res)=>{
    const patient = new Patient({
            "_id":req.body._id,
            "password":req.body.password,
            "fullName":req.body.fullName,
            "bloodType":req.body.bloodType,
            "height":req.body.height,
            "weight":req.body.weight,
            "phone":req.body.phone,
            "birthDate":req.body.birthDate,
            "gender":req.body.gender,
            "address":req.body.address,
            "donate":req.body.donate
    })
    patient.save().then((data)=>{
        res.json({
            "message":"patient created successfully",
            "data":data
    })
    })
});

module.exports = patientRouter;