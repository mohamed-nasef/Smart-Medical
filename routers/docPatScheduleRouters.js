const Doctor = require("../Modules/doctorModules");
const dPatSchedule = require("../Modules/docPatScheduleModules");
const express = require("express");
const dPatientScheduleRouter = express.Router();

 dPatientScheduleRouter.get("/", async (req,res)=>{
    const doctor_patient_Schedule = await Doctor.aggregate([
        {
          $lookup:
            {
              from: "doctorpatientschedules",
              localField: "_id",
              foreignField: "doctorID",
              as: "doctor_patient_Schedule"
            }
       }
     ])
    try{
        res.json(doctor_patient_Schedule);
    } catch(error)
    {
        console.log(error);
    }
    
});

dPatientScheduleRouter.get("/schedule", async (req,res)=>{
    
    try{
        const doctorpatientSch = await dPatSchedule.find();
        res.json(doctorpatientSch);
    } catch(error)
    {
        console.log(error);
    }
    
});

dPatientScheduleRouter.get("/schedule/:doctorID", async (req,res)=>{
    
    try{
        const doctorpatientSch = await dPatSchedule.find({"doctorID":req.params.doctorID});
        res.json(doctorpatientSch);
    } catch(error)
    {
        console.log(error);
    }
    
});

dPatientScheduleRouter.post("/",async (req,res)=>{
    const doctor_patient = new dPatSchedule({
        "examination" : req.body.examination,
        "note" : req.body.note,
        "doctorID" : req.body.doctorID,
        "patientID" : req.body.patientID
        })
       try{
        const doctorPatientData = await doctor_patient.save()
        res.json({
            "message":"doctor patient Schedule created successfully",
            "data":doctorPatientData
        })
    } 
    catch (error) {
        console.log(error);
    }
});
module.exports = dPatientScheduleRouter;