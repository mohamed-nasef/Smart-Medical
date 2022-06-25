const Nurse = require("../Modules/nurseModules");
const express = require("express");
const nurseRouter = express.Router();

nurseRouter.get("/", async (req,res)=>{
    
    try{
        const nurse = await Nurse.find();
        res.json(nurse);
    } catch(error)
    {
        console.log(error);
    }
    
});
nurseRouter.get("/:id", async (req,res)=>{
    
    try{
        const nurse = await Nurse.findById(req.params.id);
        res.json(nurse);
    } catch(error)
    {
        console.log(error);
    }
    
});
nurseRouter.delete("/:id", async (req,res)=>{
    
    try{
        const nurse = await Nurse.deleteOne({"_id":req.params.id});
        res.json(nurse);
    } catch(error)
    {
        console.log(error);
    }
});
nurseRouter.patch("/:id", async (req,res)=>{
    
    try{
        const nurse = await Nurse.updateOne({"_id":req.params.id},{
            "_id":req.body._id,
            "password":req.body.password,
            "fullName":req.body.fullName,
            "phone":req.body.phone,
            "birthDate":req.body.birthDate,
            "age":req.body.age,
            "gender":req.body.gender,
            "address":req.body.address,
            "department":req.body.department,
            "hospitalID":req.body.hospitalID,
            
        });
        res.json(nurse);
    } catch(error)
    {
        console.log(error);
    }
});
nurseRouter.post("/",async (req,res)=>{
    const birthdate = new Date(req.body.birthDate);
    const now = new Date();
    var diff = now.getTime()- birthdate.getTime();   
    var age = Math.floor(diff / 31536000000);
    console.log(age);
    const nurse = new Nurse({
        "_id":req.body._id,
        "password":req.body.password,
        "fullName":req.body.fullName,
        "phone":req.body.phone,
        "birthDate":req.body.birthDate,
        "age":age,
        "gender":req.body.gender,
        "address":req.body.address,
        "department":req.body.department,
        "hospitalID":req.body.hospitalID,
        })
       try{
        const nurseData = await nurse.save()
        res.json({
            "message":"nurse created successfully",
            "data":nurseData
        })
    } 
    catch (error) {
        console.log(error);
    }
});

module.exports = nurseRouter;