const Hospital = require("../Modules/hospitalModules");
const Doctor = require("../Modules/doctorModules");
const Nurse = require("../Modules/nurseModules");
const express = require("express");
const hospitalNurseRouter = express.Router();


hospitalNurseRouter.get("/", async (req,res)=>{
    const nurseHospital = await Hospital.aggregate([
        {
          $lookup:
            {
              from: "nurses",
              localField: "_id",
              foreignField: "hospitalID",
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
    
});

module.exports = hospitalNurseRouter;