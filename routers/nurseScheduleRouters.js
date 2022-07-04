const Nurse = require("../Modules/nurseModules");
const nurseSchedule = require("../Modules/nurseScheduleModules");
const express = require("express");
const nurseScheduleRouter = express.Router();

 nurseScheduleRouter.get("/", async (req,res)=>{
    const nurse_Schedule = await Nurse.aggregate([
        {
          $lookup:
            {
              from: "nurseschedules",
              localField: "_id",
              foreignField: "nurseID",
              as: "nurse_Schedule"
            }
       }
     ])
    try{
        res.json(nurse_Schedule);
    } catch(error)
    {
        console.log(error);
    }
    
});

nurseScheduleRouter.get("/:nurseID", async (req,res)=>{
    const nurse_Schedule = await nurseSchedule.find({"nurseID":req.params.nurseID})
    try{
        res.json(nurse_Schedule);
    } catch(error)
    {
        console.log(error);
    }
    
});

nurseScheduleRouter.post("/",async (req,res)=>{
    const nurse = new nurseSchedule({
        "day" : req.body.day,
        "from" : req.body.from,
        "to" : req.body.to,
        "nurseID" : req.body.nurseID
        })
       try{
        const nurseData = await nurse.save()
        res.json({
            "message":"nurse Schedule created successfully",
            "data":nurseData
        })
    } 
    catch (error) {
        console.log(error);
    }
});
module.exports = nurseScheduleRouter;