const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const app = express();
app.use(cors());
app.use(express.json());

const d = new Date();

const storage = multer.diskStorage({
    destination: function(req, file, cd) {
        return cd(null, "./images")
    },
    filename: function(req, file, cd) {
        return cd(null, `${d.getMilliseconds()}_${(file.originalname).split(".")[0]}.${(file.originalname).split(".")[1]}`)
    }
})

const upload = multer({storage})

app.post("/upload", jsonParser, upload.single("file"), (req, res) => {
    //console.log(req.body)
    res.json({filename: req.file.filename})
    //console.log(req.file.filename)
})

app.get("/", (req, res) => {
    res.send("API")
})

//app.use(express.static("public"));
app.use("/images", express.static("images"))

app.listen(3001, () => {
    console.log("node started on port 3001")
})