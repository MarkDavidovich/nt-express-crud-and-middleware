const wordCounter = {};

const incrementWordCount = (word) => {
  const cleanWord = word.toLowerCase();
  wordCounter[cleanWord] = (wordCounter[cleanWord] || 0) + 1;
  return wordCounter[cleanWord];
};

const getSanity = (req, res) => {
  res.send("Server is up and running");
};

const getPopular = (req, res) => {
  const words = Object.keys(wordCounter);

  if (words.length === 0) {
    return res.status(404).json({ error: "No words in database." });
  }

  let popularWord = null;
  let count = 0;

  for (const word in wordCounter) {
    if (wordCounter[word] > count) {
      popularWord = word;
      count = wordCounter[word];
    }
  }

  res.json({ text: popularWord, count });
};

const getTopFive = (req, res) => {
  const wordsArray = Object.entries(wordCounter);

  if (wordsArray.length === 0) {
    return res.status(404).json({ error: "No words in database." });
  }

  const sortedWords = wordsArray.sort((a, b) => {
    return b[1] - a[1];
  });

  const topFiveWords = sortedWords.slice(0, 5).map((pair) => {
    const word = pair[0];
    const count = pair[1];

    return { [word]: count };
  });

  res.json({ ranking: topFiveWords });
};

const getWord = (req, res) => {
  const word = req.params.word;

  if (wordCounter[word]) {
    res.json({ count: wordCounter[word] });
  } else {
    res.json({ count: 0 });
  }
};

const addWord = (req, res) => {
  const word = req.body.word;

  if (!word) {
    return res.status(400).json({ error: "Bad request: no word provided in JSON body" });
  }

  const newWordCount = incrementWordCount(word);

  res.status(201).json({ text: `Added '${word}'`, currentCount: newWordCount });
};

const addSentence = (req, res) => {
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
};

const deleteWord = (req, res) => {
  const word = req.params.word;
  const cleanWord = word.toLowerCase();

  if (!wordCounter[cleanWord]) {
    return res.status(404).json({ error: `Deletion failed: '${cleanWord}' was not found in the database.` });
  }

  delete wordCounter[cleanWord];

  res.json({ text: `${cleanWord} was successfuly removed` });
};

module.exports = {
  getSanity,
  getPopular,
  getTopFive,
  getWord,
  addWord,
  addSentence,
  deleteWord,
};
