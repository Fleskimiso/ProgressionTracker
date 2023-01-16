const express = require("express")
const app = express();

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