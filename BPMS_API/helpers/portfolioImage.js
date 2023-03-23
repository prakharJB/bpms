const multer = require("multer");
const fs = require("fs");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dir = "./public/portfolioImg";
    
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir,{recursive: true});
        }
        cb(null, dir);
      },
    filename : function(req, file, cb){
        cb(null,  Date.now() + "_"+file.originalname);
    }
});


var upload = multer({storage:storage}).fields([
  {
    name: "image",
  },
  {
    name: "logo",
  },
]);


module.exports =  upload;
