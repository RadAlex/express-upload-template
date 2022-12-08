const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

const fileUpload = require("express-fileupload");
app.use(fileUpload());

app.use(express.static(path.join(__dirname, "/public")));

app.get("/", function (req, res) {
  res.send("sdfsdf");
});

app.get("/upload", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/upload.html"));
});

app.post("/upload", async function (req, res) {
  if (req.files && Object.keys(req.files).length !== 0) {
    const uploadedFile = req.files.uploadFile;

    console.log("image has been found in body, file name is: ", uploadedFile.name);

    let filename = uploadedFile.name;
    const uploadPath = __dirname + "/public/" + filename;
    const iconPath = __dirname + "/public/" + filename;

    uploadedFile.mv(uploadPath, function (err) {
      if (err) {
        // in case of error
        console.log(err);
        console.log("error!!");
      } else {
        console.log("success!!");

        // Success message
        res.json({
          message: "OK",
        });
      }
    });
  } else {
    // Error handling, file not found in the request body
    res.status(404).json({
      message: "No file uploaded",
    });
  }
});

app.listen(PORT, () => {
  console.log(`app is running on PORT ${PORT}`);
});

module.exports = app;
