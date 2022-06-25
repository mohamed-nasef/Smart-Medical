const myMongoose = require("mongoose");

const docPatScheduleModule = myMongoose.Schema(
    {
      "day" :{
        type: Date,
        required : [true, "it must be Date"],
        default:new Date()
      },
      "examination":{
        type:Boolean,
        required : true,
        default:false
      },
      "note":{
        type:String
      },
      "doctorID":{
        type: String,
        required : true,
        match: [/^([d]|[D])[0-9]{14}$/,'It must be like ( D or d + National Id)']
      },
      "patientID":{
        type: String,
        required : true,
        match: [/^([p]|[P])[0-9]{14}$/,'It must be like ( P or p + National Id)']
      }
    }
)

module.exports=myMongoose.model("doctorpatientschedules",docPatScheduleModule);