const Nurse = require("../Modules/nurseModules");
const nPatSchedule = require("../Modules/nurPatScheduleModules");
const Patient = require("../Modules/patientModules");
const express = require("express");
const nPatientScheduleRouter = express.Router();

 nPatientScheduleRouter.get("/", async (req,res)=>{
    const nurse_patient_Schedule = await Nurse.aggregate([
        {
          $lookup:
            {
              from: "nursepatientschedules",
              localField: "_id",
              foreignField: "nurseID",
              as: "nurse_patient_Schedule"
            }
       }
     ])
    try{
        res.json(nurse_patient_Schedule);
    } catch(error)
    {
        console.log(error);
    }
    
});


nPatientScheduleRouter.get("/schedule", async (req,res)=>{
    
    try{
        const nursepatientSch = await nPatSchedule.find();
        res.json(nursepatientSch);
    } catch(error)
    {
        console.log(error);
    }
    
});

nPatientScheduleRouter.get("/patient", async (req,res)=>{
    const nurse_patient_Schedule = await Patient.aggregate([
        {
          $lookup:
            {
              from: "nursepatientschedules",
              localField: "_id",
              foreignField: "patientID",
              as: "nurse_patient_Schedule"
            }
       }
     ])
    try{
        res.json(nurse_patient_Schedule);
    } catch(error)
    {
        console.log(error);
    }
    
});


nPatientScheduleRouter.get("/schedule/:nurseID", async (req,res)=>{
    
    try{
        const nursepatientSch = await nPatSchedule.find({"nurseID":req.params.nurseID});
        res.json(nursepatientSch);
    } catch(error)
    {
        console.log(error);
    }
    
});

nPatientScheduleRouter.post("/",async (req,res)=>{
    const nurse_patient = new nPatSchedule({
        "examination" : req.body.examination,
        "note" : req.body.note,
        "nurseID" : req.body.nurseID,
        "patientID" : req.body.patientID
        })
       try{
        const nursePatientData = await nurse_patient.save()
        res.json({
            "message":"nurse patient Schedule created successfully",
            "data":nursePatientData
        })
    } 
    catch (error) {
        console.log(error);
    }
});
module.exports = nPatientScheduleRouter;