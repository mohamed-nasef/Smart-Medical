const myMongoose = require("mongoose");

const medicalRecordModule = myMongoose.Schema(
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
      "prescription" : {
        type:String,
        required:true
      },
      "dose":  {type: Number , required:true},
      "period":{type:String  , required:true},
      "nextAppointment":{
        type:Date
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
      },
      "expired":{
        type:Boolean,
        default:false
      }
    }
)

module.exports=myMongoose.model("medicalrecords",medicalRecordModule);