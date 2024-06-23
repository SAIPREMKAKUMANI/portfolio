const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const { connectToDb, getDb } = require("./db");

//dotenv config
dotenv.config();

//rest object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//static files access
app.use(express.static(path.join(__dirname, "./client/build")));

//routes

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//connect to database
let db;

connectToDb((err) => {
  if (!err) {
    db = getDb();
    app.use("/api/v1/portfolio", require("./routes/portfolioRoute")(db));

    app.listen(PORT, () => {
      console.log(`Server is running ${PORT}`);
    });
  }
});

//In case unable to get port from process.env use 8080
const PORT = process.env.PORT || 8080;

//listen
