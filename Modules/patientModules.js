const myMongoose = require("mongoose");

const patientModule = myMongoose.Schema(
    {
        "_id": {
            type : String,
           // pattern : "^([p]|[P])[0-9]{14}$",
            required :true ,
            match: [/^([p]|[P])[0-9]{14}$/,'It must be like ( P or p +National Id)']

        },
          "password": {
            type: String,
            required : [true, "it must be string"] 
          },
          "fullName": {
            type: String,
            required : [true, "it must be string"]
          },
          "bloodType":{
            type: String,
            enum: {
                    values: ["A+","B+","A-","B-","AB+","AB-","O+","O-"],
                    message: '{VALUE} is not supported'
                 },
                 required : true
          },
          "height":{
            type : Number,
            required : true
          },
          "weight":{
            type: Number,
            required : true
          },
          "phone": {
            type: String,
            required : true,
            match: [/^01[0125][0-9]{8}$/, 'phone must start with 01 and be 11 number']

          },
          "birthDate": {
            type: Date,
            required : [true, "it must be Date"]
          },
          "age": {
            type:Number
          },
          "gender": {
            type:String,
            enum : {
                values: ["Male","Female"],
                message: '{VALUE} is not supported'
            },
            required : true
          },
          "address": {
            type:String,
                required : true
              },
          "donate" : {
            type:Boolean,
            default:false
              }
    }
)

module.exports=myMongoose.model("patient",patientModule);