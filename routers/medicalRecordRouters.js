const Patient = require("../Modules/patientModules");
const medicalRecord = require("../Modules/medicalRecordModules");
const upload = require("../middleware/upload");
const express = require("express");
const { single } = require("../middleware/upload");
const medicalRecordRouter = express.Router();

medicalRecordRouter.get("/", async (req,res)=>{
    const medical_record = await Patient.aggregate([
        {
          $lookup:
            {
              from: "medicalrecords",
              localField: "_id",
              foreignField: "patientID",
              as: "medical_record"
            }
       }
     ])
    try{
        res.json(medical_record);
    } catch(error)
    {
        console.log(error);
    }
    
});

medicalRecordRouter.get("/:patientID", async (req,res)=>{
    try{
        const medical_record = await medicalRecord.find({"patientID":req.params.patientID});
        res.json(medical_record);
    } catch(error)
    {
        console.log(error);
    }
    
});


medicalRecordRouter.post("/",upload.single('medicalPic'),async (req,res)=>{
    const medicalrecord = new medicalRecord({
        "day": req.body.day,
        "examination": req.body.examination,
        "prescription":req.body.prescription,
        "dose": req.body.dose,
        "period": req.body.period,
        "nextAppointment": req.body.nextAppointment,
        "note": req.body.note,
        "patientID": req.body.patientID,
        "doctorID": req.body.doctorID,
        "expired" : req.body.expired,
        "medicalPic":req.file
        })
       try{
        const medicalrecordData = await medicalrecord.save()
        res.json({
            "message":"Medical Record created successfully",
            "data":medicalrecordData
        })
    } 
    catch (error) {
        console.log(error);
    }
});
module.exports = medicalRecordRouter;