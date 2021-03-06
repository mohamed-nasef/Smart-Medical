const express = require("express");
const multer = require("multer");
const fs = require("fs");

// constant
const app = express();
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const dir = "uploads/";
    !fs.existsSync(dir) && fs.mkdirSync(dir);
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let ext = file.originalname.lastIndexOf(".");
    ext = file.originalname.substring(ext + 1);
    callback(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});
const upload = multer({ storage });

module.exports = upload