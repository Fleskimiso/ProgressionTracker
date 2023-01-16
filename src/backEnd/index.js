const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/progressiontracker", function(error) {
  if(error){
    console.log(error);
    console.log("There has been an errro");
  }else {
    console.log("succesfully connected to the database")
  }
})

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

app.get("/", (req,res) =>{
    res.json({ flag: "Success"});
})

app.listen(3000,() =>{
    console.log("listening on port 3000");
})