const express = require("express");
const cors = require("cors");
require("dotenv").config();
const wordRouter = require("./routes/wordRouter");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/wordCounter", wordRouter);

app.listen(PORT, () => {
  console.log(`Server is up on http://localhost:${PORT}`);
});
