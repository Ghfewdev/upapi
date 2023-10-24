const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: function(req, file, cd) {
        return cd(null, "./public/images")
    },
    filename: function(req, file, cd) {
        return cd(null, `${Date.now()}_.${(file.originalname).split(".")[1]}`)
    }
})

const upload = multer({storage})

app.post("/upload", upload.single("file"), (req, res) => {
    //console.log(req.body)
    console.log(req.file)
})

app.get("/", (req, res) => {
    res.send("API")
})

app.use(express.static("public"));
//app.use("/images", express.static("images"))

app.listen(3001, () => {
    console.log("node started on port 3001")
})