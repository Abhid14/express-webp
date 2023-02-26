const express = require("express");
const path = require("path");
const sharp = require("sharp");
const multer = require("multer");

const app = express();
const port = 3000;

const upload = multer();

app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/optimise", upload.single("imageFile"), async (req, res) => {
  try {
    const inputBuffer = req.file.buffer;

    const outputBuffer = await sharp(inputBuffer)
      .webp({ quality: 75 })
      .toBuffer();

    res.type("webp").send(outputBuffer);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error converting image");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
