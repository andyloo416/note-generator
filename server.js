const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const PORT = 3000;

// middleware
const publicFolder = path.join(__dirname, "public");
app.use(express.static(publicFolder));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// get the notes
app.get("/api/notes", (req, res) => {
  const getNotes = path.join(__dirname, "/db/db.json");
  res.sendFile(getNotes);
});

//post notes to db.json
app.post("/api/notes", (req, res) => {
  const postNotes = JSON.parse(fs.readFileSync("./db/db.json"));
  const newNotes = req.body;
  fs.writeFileSync("./db/db.json", JSON.stringify(postNotes));
});

// return to homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

// go to note page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// listen to the port
app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});
