const myMongoose = require("mongoose");

const nurseModule = myMongoose.Schema(
    {
        "_id": {
            type : String,
           // pattern : "^([p]|[P])[0-9]{14}$",
            required :true ,
            match: [/^([n]|[N])[0-9]{14}$/,'It must be like ( N or n + National Id)']

        },
          "password": {
            type: String,
            required : [true, "it must be string"] 
          },
          "fullName": {
            type: String,
            required : [true, "it must be string"]
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

          "department": {
            type:String,
                required : true

          },

         "hospitalID": {
            type:String,
                required : true

          }
              
    }
)

module.exports=myMongoose.model("nurse",nurseModule);