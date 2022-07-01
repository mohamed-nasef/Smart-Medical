const myMongoose=require("mongoose");
const hospitalModule = myMongoose.Schema(
    {
        "_id": {
            type : String,
            required :true ,
            match: [/^([h]|[H]).+$/,'It must start with h or H']

        },
          "password": {
            type: String,
            required : [true, "it must be string"] 
          },
          "name": {
            type: String,
            required : [true, "it must be string"]
          },
          "phone": {
            type: String,
            match: [/^01[0125][0-9]{8}$/, 'phone must start with 01 and be 11 number']

          },
          "address": {
            type:String,
            required : true
          },
          "departments":{type:String}
    }
)
module.exports=myMongoose.model("hospital",hospitalModule);
