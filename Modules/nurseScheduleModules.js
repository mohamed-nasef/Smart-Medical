const myMongoose = require("mongoose");

const nurseScheduleModule = myMongoose.Schema(
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
      "nurseID":{
        type: String,
        required : true,
        match: [/^([n]|[N])[0-9]{14}$/,'It must be like ( N or n + National Id)']
      }
    }
)

module.exports=myMongoose.model("nurseschedules",nurseScheduleModule);