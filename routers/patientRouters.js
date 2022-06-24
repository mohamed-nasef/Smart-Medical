const Patient = require("../Modules/patientModules");
const express = require("express");
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
        console.log(error);
    }
});
patientRouter.post("/",async (req,res)=>{
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
    try{
        patient.save().then((data)=>{
            res.json({
                "message":"patient created successfully",
                "data":data
            })
        })
    } catch (error) {
        console.log(error);
    }
});

module.exports = patientRouter;