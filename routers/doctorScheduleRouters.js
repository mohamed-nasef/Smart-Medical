const Doctor = require("../Modules/doctorModules");
const doctorSchedule = require("../Modules/doctorScheduleModules");
const express = require("express");
const doctorScheduleRouter = express.Router();

 doctorScheduleRouter.get("/", async (req,res)=>{
    const doctor_Schedule = await Doctor.aggregate([
        {
          $lookup:
            {
              from: "doctorschedules",
              localField: "_id",
              foreignField: "doctorID",
              as: "doctor_Schedule"
            }
       }
     ])
    try{
        res.json(doctor_Schedule);
    } catch(error)
    {
        console.log(error);
    }
    
});

doctorScheduleRouter.get("/:doctorID", async (req,res)=>{
    const doctor_Schedule = await doctorSchedule.find({"doctorID":req.params.doctorID})
    try{
        res.json(doctor_Schedule);
    } catch(error)
    {
        console.log(error);
    }
    
});

doctorScheduleRouter.post("/",async (req,res)=>{
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
module.exports = doctorScheduleRouter;