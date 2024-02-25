const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueFilename =
      Date.now() +
      "-" +
      Math.round(Math.random() + 1e9) +
      "-" +
      file.originalname.replace(/\s/g,"")
    cb(null, uniqueFilename);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
