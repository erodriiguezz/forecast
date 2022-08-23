const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

app.listen(PORT, console.log("=> app listening on port %s", PORT));
