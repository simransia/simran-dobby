const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectToMongo = require("./db");
const path = require('path');

const PORT = process.env.PORT || 7000;
dotenv.config();

let cors = require('cors');

connectToMongo();
app.use(express.json());
app.use(cors());

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/images', require('./routes/images'))

// deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join("client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}


app.listen(PORT, ()=>{
    console.log("connected")
})