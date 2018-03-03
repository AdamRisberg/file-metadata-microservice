var express = require("express");
var multer = require("multer");
var upload = multer();
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static("public"));

app.post("/get-file-info", upload.single("file"), function(req, res) {
  if(!req.file) {
    res.json({ error: "Upload was unsuccessful" });
  }

  var name = req.file.originalname;
  var ext = name.slice(name.lastIndexOf(".") + 1);
  name = name.slice(0, -(ext.length + 1));

  res.json({
    name: name,
    extension: ext,
    mimetype: req.file.mimetype,
    encoding: req.file.encoding,
    size: req.file.size
  });
});

app.use(function(err, req, res, next) {
  res.status(500).send("Something went wrong.");
});

app.listen(port, function() {
  console.log("App listening at port: " + port);
});