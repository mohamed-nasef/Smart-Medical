const Hospital = require("../Modules/hospitalModules");
const Doctor = require("../Modules/doctorModules");
const Nurse = require("../Modules/nurseModules");
const express = require("express");
const hospitalRouter = express.Router();

hospitalRouter.get("/:id", async (req,res)=>{
    
    try{
        const hospital = await Hospital.findById(req.params.id);
        res.json(hospital);
    } catch(error)
    {
        console.log(error);
    }
    
});

hospitalRouter.get("/", async (req,res)=>{
    
    try{
        const hospital = await Hospital.find();
        res.json(hospital);
    } catch(error)
    {
        console.log(error);
    }
    
});

 /*hospitalRouter.get("/doctor", async (req,res)=>{
    const doctorHospital = await Hospital.aggregate([
        {
          $lookup:
            {
              from: "doctors",
              localField: "_id",
              foreignField: "hospitalID",
              as: "hospital_doctor"
            }
       }
     ])
    try{
        res.json(doctorHospital);
    } catch(error)
    {
        console.log(error);
    }
    
});

hospitalRouter.get("/nurse", async (req,res)=>{
    console.log("safgjhdsa");
    const nurseHospital = await Nurse.aggregate([
        {
          $lookup:
            {
              from: "hospitals",
              localField: "hospitalID",
              foreignField: "_id",
              as: "hospital_nurse"
            }
       }
     ])
    try{
        res.json(nurseHospital);
    } catch(error)
    {
        console.log(error);
    }
    
});*/

hospitalRouter.post("/",async (req,res)=>{
    const hospital = new Hospital({
            "_id":req.body._id,
            "password":req.body.password,
            "name":req.body.name,
            "address":req.body.address,
            "phone":req.body.phone,
            "departments":req.body.departments
        })
       try{
        const hospitalData = await hospital.save()
        res.json({
            "message":"hospital created successfully",
            "data":hospitalData
        })
    } 
    catch (error) {
        console.log(error);
    }
});
module.exports = hospitalRouter;