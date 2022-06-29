const Hospital = require("../Modules/hospitalModules");
const Doctor = require("../Modules/doctorModules");
const Nurse = require("../Modules/nurseModules");
const express = require("express");
const hospitalDoctorRouter = express.Router();

 hospitalDoctorRouter.get("/", async (req,res)=>{
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

module.exports = hospitalDoctorRouter;