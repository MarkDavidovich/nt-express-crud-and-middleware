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
  } else {
    res.json({ count: 0 });
  }
});

//EX3:
app.post("/addWord", (req, res) => {
  const word = req.body.word;

  if (!word) {
    res.status(400).json({ error: "Bad request: no word provided in JSON body" });
  }

  const cleanWord = word.toLowerCase();

  if (wordCounter[cleanWord]) {
    wordCounter[cleanWord]++;
  } else {
    wordCounter[cleanWord] = 1;
  }

  res.status(201).json({ text: `Added '${word}', currentCount: ${wordCounter[word]}` });
});

app.listen(PORT, () => {
  console.log(`Server is up on http://localhost:${PORT}`);
});
