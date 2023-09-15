const express = require("express");
const app = express();

//load config from env file
require("dotenv").config();
const PORT = process.env.PORT || 4000;

//midleware for parse json request body
app.use(express.json());

//import route for API
const New = require("./routes/NewApi");

//Mount the New Api routes
app.use("/api/v1", New);

//Start server
app.listen(PORT, () => {
  console.log(`Server is starte in this PORT ${PORT}`);
});

//Connect to database
const dbConnect = require("./Config/database");
dbConnect();

// Default route
app.get("/", (req, res) => {
  res.send(`<h1>This is default route</h1>`);
});
