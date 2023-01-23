import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import dotenv from "dotenv"
import MongoDBConnect from "connect-mongo";
import passport from "passport";
import * as passportLocal from "passport-local";
import {Authrouter} from "./routes/auth"
import { UserModel } from "./models/UserModel";
import { isLoggedIn } from "./middleware";
import { WorkoutRouter } from "./routes/workouts";
import cookieParser from "cookie-parser";
import * as passportType from "./types/passport"; //do not optimize this import 
//import config values in deployment
const isDevelopment = process.env.NODE_ENV !== "production";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}


const app = express();
//set secret
const secret = process.env.SECRET as string;
const dbUrl = "mongodb://127.0.0.1:27017/progressiontracker"
//connect to db
mongoose.connect(dbUrl, function(error) {
  if(error){
    console.log(error);
    console.log("There has been an error");
  }else {
    console.log("succesfully connected to the database")
  }
})
//parse forms
app.use(express.urlencoded({extended: true}));
//parse json data
app.use(express.json());
//parse cookie
app.use(cookieParser())
//configure session store
const sessionStore = MongoDBConnect.create({
  mongoUrl: dbUrl,
  touchAfter: 5*3600, //5 days
  crypto: {
    secret: secret
  }
})
//log the error
sessionStore.on("error", (error) =>{
  console.log(error);
  console.log("Session store error");
})

//configure the session 
const sessionConfig: session.SessionOptions = {
  secret: secret,
  saveUninitialized: true, //true for now change later to false
  store: sessionStore,
  resave: true, // save the session even if there are no changes
  cookie: {
    maxAge: 1000*3600*24*7*2, // two weeks for cookie to expire
    httpOnly: true,
    secure: isDevelopment ? false: true,
    sameSite: isDevelopment? "lax" : "strict",
  },
 
}


app.use(session(sessionConfig))
//initialize passport session
app.use(passport.initialize());
app.use(passport.session());
//login via email that is set username field to email
passport.use(new passportLocal.Strategy({
  usernameField: "email",
},UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials","true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.header("Access-Control-Allow-Headers",
   "Origin, Content-Type");
    next();
  });



app.use("/api", Authrouter);
app.use("/api", WorkoutRouter);

app.get("/", (req: any,res) =>{
    console.log(req.session.passport);
    res.json({ flag: "Success"});
});

app.listen(3000,() =>{
    console.log("listening on port 3000");
})