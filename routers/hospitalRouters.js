const Hospital = require("../Modules/hospitalModules");
const Doctor = require("../Modules/doctorModules");
const Nurse = require("../Modules/nurseModules");
const express = require("express");
const hospitalRouter = express.Router();

 hospitalRouter.get("/", async (req,res)=>{
    const doctorHospital = await Hospital.aggregate([
        {
          $lookup:
            {
              from: "doctor",
              localField: "_id",
              foreignField: "doctorID",
              as: "doctor_Schedule"
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

hospitalRouter.post("/",async (req,res)=>{
    const doctor = new doctorSchedule({
        "day" : req.body.day,
        "from" : req.body.from,
        "to" : req.body.to,
        "doctorID" : req.body.doctorID
        })
       try{
        const doctorData = await doctor.save()
        res.json({
            "message":"doctor Schedule created successfully",
            "data":doctorData
        })
    } 
    catch (error) {
        console.log(error);
    }
});
module.exports = hospitalRouter;