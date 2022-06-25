const myMongoose = require("mongoose");

const doctorScheduleModule = myMongoose.Schema(
    {
      "day" :{
        type: Date,
        required : [true, "it must be Date"],
        default:new Date()
      },
      "from" : {
        type : Number,
        min: [0.0, 'must be between 0.0 : 23.59'],
        max: [23.59, 'must be between 0.0 : 23.59'],
        required:true
      },
      "to" : {
        type : Number,
        min: [0.0, 'must be between 0.0 : 23.59'],
        max: [23.59, 'must be between 0.0 : 23.59'],
        required:true
      },
      "doctorID":{
        type: String,
        required : true,
        match: [/^([d]|[D])[0-9]{14}$/,'It must be like ( D or d + National Id)']
      }
    }
)

module.exports=myMongoose.model("doctorschedules",doctorScheduleModule);