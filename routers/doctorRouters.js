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
    const doctor = new Doctor({
        "_id":req.body._id,
        "password":req.body.password,
        "fullName":req.body.fullName,
        "phone":req.body.phone,
        "birthDate":req.body.birthDate,
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