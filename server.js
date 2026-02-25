const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

//EX1:
app.get("/sanity", (req, res) => {
  res.send("Server is up and running");
});

app.listen(PORT, () => {
  console.log(`Server is up on http://localhost:${PORT}`);
});
