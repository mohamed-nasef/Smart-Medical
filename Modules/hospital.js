const myMongoose=require("mongoose");
const hospitalModule = myMongoose.Schema(
    {
        "_id": {
            type : String,
           // pattern : "^([p]|[P])[0-9]{14}$",
            required :true ,
            match: [/^([d]|[D])[0-9]{14}$/,'It must be like ( D or d + National Id)']

        },
          "password": {
            type: String,
            required : [true, "it must be string"] 
          },
          "Name": {
            type: String,
            required : [true, "it must be string"]
          },
          "phone": {
            type: String,
            required : true,
            match: [/^01[0125][0-9]{8}$/, 'phone must start with 01 and be 11 number']

          },
          "address": {
            type:String,
                required : true
          },
          "department":[{type:String}]
    }
)
module.exports=myMongoose.model("hospital",hospitalModule);
