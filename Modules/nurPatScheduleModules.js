const myMongoose = require("mongoose");

const nurPatScheduleModule = myMongoose.Schema(
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
      "nurseID":{
        type: String,
        required : true
      },
      "patientID":{
        type: String,
        required : true
      }
    }
)

module.exports=myMongoose.model("nursepatientschedules",nurPatScheduleModule);