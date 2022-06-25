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
        required : true,
        match: [/^([n]|[N])[0-9]{14}$/,'It must be like ( N or n + National Id)']
      },
      "patientID":{
        type: String,
        required : true,
        match: [/^([p]|[P])[0-9]{14}$/,'It must be like ( P or p + National Id)']
      }
    }
)

module.exports=myMongoose.model("nursepatientschedules",nurPatScheduleModule);