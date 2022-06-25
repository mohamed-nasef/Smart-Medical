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
        required : true
      },
      "patientID":{
        type: String,
        required : true
      }
    }
)

module.exports=myMongoose.model("doctorpatientschedules",docPatScheduleModule);