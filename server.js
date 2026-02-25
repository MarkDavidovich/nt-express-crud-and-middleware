const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const wordCounter = {};

//EX1:
app.get("/sanity", (req, res) => {
  res.send("Server is up and running");
});

//EX2:
app.get("/:word", (req, res) => {
  const word = req.params.word;

  if (wordCounter[word]) {
    res.json({ count: wordCounter[word] });
  }

  res.json({ count: 0 });
});

app.listen(PORT, () => {
  console.log(`Server is up on http://localhost:${PORT}`);
});
