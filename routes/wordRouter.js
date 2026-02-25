const express = require("express");
const router = express.Router();
const wordController = require("./../controllers/wordController");

router.get("/sanity", wordController.getSanity);
router.get("/popular", wordController.getPopular);
router.get("/topFive", wordController.getTopFive);
router.get("/checkWord/:word", wordController.getWord);
router.post("/addWord", wordController.addWord);
router.post("/addSentence/:sentence", wordController.addSentence);
router.delete("/deleteWord/:word", wordController.deleteWord);

module.exports = router;
