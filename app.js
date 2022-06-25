const cors =require('cors');
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
var port = process.env.PORT || 8080;
const patient = require("./routers/patientRouters");
const doctor = require("./routers/doctorRouters");
const nurse = require("./routers/nurseRouters");
const myMongoose=require('mongoose');
const connectionString="mongodb+srv://smartmedic:smartmedic2022@smartmedic.r5ddgad.mongodb.net/smartmedical?retryWrites=true&w=majority"
app.use(cors());
app.use(bodyParser.json());
app.use("/patient",patient);
app.use("/doctor",doctor);
app.use("/nurse",nurse);


myMongoose.connect(connectionString,()=>{
    console.log('connect with data successfully')
    app.listen(port,()=>{
        console.log(`Runinng on port ${port}`);
    })
});


