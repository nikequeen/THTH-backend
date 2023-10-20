const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = path.extname(file.originalname);
    const newFilename = name + extension;
    callback(null, newFilename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
