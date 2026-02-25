const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const wordCounter = {};

const incrementWordCount = (word) => {
  const cleanWord = word.toLowerCase();

  if (wordCounter[cleanWord]) {
    wordCounter[cleanWord]++;
  } else {
    wordCounter[cleanWord] = 1;
  }

  return wordCounter[cleanWord];
};

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
    return res.status(400).json({ error: "Bad request: no word provided in JSON body" });
  }

  const newWordCount = incrementWordCount(word);

  res.status(201).json({ text: `Added '${word}'`, currentCount: newWordCount });
});

//EX4:
app.post("/addSentence/:sentence", (req, res) => {
  const sentence = req.params.sentence;
  let numNewWords = 0;
  let numOldWords = 0;

  const cleanSentence = sentence.replace(/[^a-zA-Z\s]/g, "");

  const words = cleanSentence.split(" ");

  words.forEach((word) => {
    const cleanWord = word.toLowerCase();

    if (wordCounter[cleanWord] > 0) {
      numOldWords++;
    } else {
      numNewWords++;
    }
    incrementWordCount(cleanWord);
  });

  res.status(201).json({ text: `Added ${numNewWords} words, ${numOldWords} already existed`, currentCount: -1 });
});

app.listen(PORT, () => {
  console.log(`Server is up on http://localhost:${PORT}`);
});

//EX5:
app.delete("/deleteWord/:word", (req, res) => {
  const word = req.params.word;
  const cleanWord = word.toLowerCase();

  if (!wordCounter[cleanWord]) {
    return res.status(404).json({ error: `Deletion failed: '${cleanWord}' was not found in the database.` });
  }

  delete wordCounter[cleanWord];

  res.json({ text: `${cleanWord} was successfuly removed` });
});
