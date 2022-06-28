const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
    //    let ext = path.extname(file.originalname);
        cb(null,Date.now()+file.originalname);
    }
  })
  
  const upload = multer({ 
    storage: storage,
    fileFilter:(req,file,callback)=>{
        if(file.mimetype == "image/png" || file.mimetype == "image/jpg")
        {
            callback(null,true)
        }
        else
        {
            console.log("only jpg or png")
            callback(null,false)
        }
    },
    limits: {
        fileSize : 1024*1024*5
    }
})

module.exports = upload