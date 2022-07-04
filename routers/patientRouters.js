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
patientRouter.get("/:id", async (req,res)=>{
    try{
        const patient = await Patient.findById(req.params.id);
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
            "age":req.body.age,
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
patientRouter.delete("/:id", async (req,res)=>{
    
    try{
        const patient = await Patient.deleteOne({"_id":req.params.id});
        res.json(patient);
    } catch(error)
    {
        console.log(error);
    }
});
patientRouter.post("/",async (req,res)=>{
    const birthdate = new Date(req.body.birthDate);
    const now = new Date();
    var diff = now.getTime()- birthdate.getTime();   
    var age = Math.floor(diff / 31536000000);
    console.log(age);
    const patient = new Patient({
      "_id":req.body._id,
      "password":req.body.password,
      "fullName":req.body.fullName,
      "bloodType":req.body.bloodType,
      "height":req.body.height,
      "weight":req.body.weight,
      "phone":req.body.phone,
      "birthDate":req.body.birthDate,
      "age":age,
      "gender":req.body.gender,
      "address":req.body.address,
      "donate":req.body.donate
        })
       try{
        const patientData = await patient.save()
        res.json({
            "message":"patient created successfully",
            "data":patientData
        })
    } 
    catch (error) {
        console.log(error);
    }
});

module.exports = patientRouter;