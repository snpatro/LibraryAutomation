
const db = require("../models"),
  express = require("express"),
  router = express.Router(),
  app = express(),
  bodyParser = require("body-parser"),
  multer = require("multer"),
  path = require("path"),
  gridfs = require("multer-gridfs-storage"),
  grid = require("gridfs-stream"),
  mongoose = require("mongoose"),
  crypto = require("crypto"),
  mongoURL = "mongodb://localhost:27017/LabAuto";

const conn = mongoose.createConnection(mongoURL);
let gfs;
conn.once('open', () => {
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
})

const storage = new gridfs({
  url: mongoURL,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });
//Post route For Image
router.post("/:userId/upload", upload.single('myimage'), function (req, res) {
  console.log(req.file);
  let path = "http://localhost:5000/api/image/" + req.file.filename;
  db.User.findOneAndUpdate({ _id: req.params.userId }, { $set: { proPic: path } }, { new: true }, (err, user) => {
    if (err) {
      return res.send({
        success: false,
        message: 'IMAGE UPLOAD FAILED'
      })
    }
    return res.send({
      success: true,
      message: 'IMAGE UPLOADED'
    })
  })
});
// Getting back uploaded image
router.get('/image/:filename', (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'IMAGE DO NOT EXIST'
      });
    }

    // Check if image
    if (file.contentType === 'image/JPEG' || file.contentType === 'image/jpeg' || file.contentType === 'image/PNG' || file.contentType === 'image/JPG' || file.contentType === 'image/png' || file.contentType === 'image/jpg') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'NOT AN IMAGE'
      });
    }
  });
});

module.exports = router;