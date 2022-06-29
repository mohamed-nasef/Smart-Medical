const cors =require('cors');
const bodyParser = require('body-parser');
const express = require("express");
const myMongoose=require('mongoose');
const multer=require("multer");
const connectionString="mongodb+srv://smartmedic:smartmedic2022@smartmedic.r5ddgad.mongodb.net/smartmedical?retryWrites=true&w=majority"
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const messages = []
var port = process.env.PORT || 8080;
const patient = require("./routers/patientRouters");
const doctor = require("./routers/doctorRouters");
const nurse = require("./routers/nurseRouters");
const dPatientSchedule = require("./routers/docPatScheduleRouters");
const nPatientSchedule = require("./routers/nurPatScheduleRouters");
const nurseSchedule = require("./routers/nurseScheduleRouters");
const doctorSchedule = require("./routers/doctorScheduleRouters");
const medicalRecord = require("./routers/medicalRecordRouters");
const upload = require("./middleware/upload");
var fs = require('fs');


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

/*app.post("/upload/single", upload.single("file"), (req, res) => {
  res.json({ file: req.file });
});
app.post("/upload/multiple", upload.array("file", 4), (req, res) => {
  res.json({ files: req.files });
});*/


app.use("/photo/:filename",function(req,res){
  fs.readFile(`./uploads/${req.params.filename}`, (err, data)=>{
    if (err) throw err; // Fail if the file can't be read.
      res.writeHead(200, {'Content-Type': 'image/png'});
      res.end(data); // Send the file data to the browser.
  });
})

app.use("/patient",patient);
app.use("/doctor",doctor);
app.use("/nurse",nurse);
app.use("/dpatient",dPatientSchedule);
app.use("/npatient",nPatientSchedule);
app.use("/nurseschedule",nurseSchedule);
app.use("/doctorschedule",doctorSchedule);
app.use("/medicalrecord",medicalRecord);



io.on('connection', (socket) => {
  try {
    console.log("a user connected");
    const username = socket.handshake.query.username
    socket.on('message', (data) => {
      const message = {
        message: data.message,
        senderUsername: username,
        sentAt: Date.now()
      }
      messages.push(message)
      io.emit('message', message)
  
    })
  } catch (error) {
    console.log(error);
  }
  });

myMongoose.connect(connectionString,()=>{
    console.log('connect with data successfully')
    app.listen(port,()=>{
        console.log(`Runinng on port ${port}`);
    })
});

