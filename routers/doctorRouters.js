const Doctor = require("../Modules/doctorModules");
const express = require("express");
const doctorRouter = express.Router();

doctorRouter.get("/", async (req,res)=>{
    
    try{
        const doctor = await Doctor.find();
        res.json(doctor);
    } catch(error)
    {
        console.log(error);
    }
    
});
doctorRouter.get("/:id", async (req,res)=>{
    
    try{
        const doctor = await Doctor.findById(req.params.id);
        res.json(doctor);
    } catch(error)
    {
        console.log(error);
    }
    
});
doctorRouter.delete("/:id", async (req,res)=>{
    
    try{
        const doctor = await Doctor.deleteOne({"_id":req.params.id});
        res.json(doctor);
    } catch(error)
    {
        console.log(error);
    }
});
doctorRouter.patch("/:id", async (req,res)=>{
    
    try{
        const doctor = await Doctor.updateOne({"_id":req.params.id},{
            "_id":req.body._id,
            "password":req.body.password,
            "fullName":req.body.fullName,
            "phone":req.body.phone,
            "birthDate":req.body.birthDate,
            "age":req.body.age,
            "gender":req.body.gender,
            "address":req.body.address,
            "speciality":req.body.speciality,
            "hospitalID":req.body.hospitalID,
            
        });
        res.json(doctor);
    } catch(error)
    {
        console.log(error);
    }
});
doctorRouter.post("/",async (req,res)=>{
    const birthdate = new Date(req.body.birthDate);
    const now = new Date();
    var diff = now.getTime()- birthdate.getTime();   
    var age = Math.floor(diff / 31536000000);
    console.log(age);
    const doctor = new Doctor({
        "_id":req.body._id,
        "password":req.body.password,
        "fullName":req.body.fullName,
        "phone":req.body.phone,
        "birthDate":req.body.birthDate,
        "age":age,
        "gender":req.body.gender,
        "address":req.body.address,
        "speciality":req.body.speciality,
        "hospitalID":req.body.hospitalID,
        })
       try{
        const doctorData = await doctor.save()
        res.json({
            "message":"doctor created successfully",
            "data":doctorData
        })
    } 
    catch (error) {
        console.log(error);
    }
});

module.exports = doctorRouter;