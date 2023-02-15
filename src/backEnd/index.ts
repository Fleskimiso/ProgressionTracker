import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import dotenv from "dotenv";
import helmet from "helmet";
import MongoDBConnect from "connect-mongo";
import passport from "passport";
import * as passportLocal from "passport-local";
import { Authrouter } from "./routes/auth"
import { UserModel } from "./models/UserModel";
import { WorkoutRouter } from "./routes/workouts";
import cookieParser from "cookie-parser";
import * as passportType from "./types/passport"; //do not optimize this import 
import { exerciseRouter } from "./routes/exercise";
import { planRouter } from "./routes/plan";
import path from "path";

//import config values in deployment
const isDevelopment = process.env.NODE_ENV !== "production";
if (isDevelopment) {
  dotenv.config();
}


const app = express();
app.use('/static', express.static(path.join(__dirname, '/frontDist')))

//set secret
const secret = process.env.SECRET as string;
const dbUrl = isDevelopment ? "mongodb://127.0.0.1:27017/progressiontracker" : process.env.MONGODB_URI as string;

//connect to db
mongoose.connect(dbUrl, function (error) {
  if (error) {
    console.log(error);
    console.log("There has been an error");
  } else {
    console.log("succesfully connected to the database")
  }
})
//parse forms
app.use(express.urlencoded({ extended: true }));
//parse json data
app.use(express.json());
//parse cookie
app.use(cookieParser())
//configure session store
const sessionStore = MongoDBConnect.create({
  mongoUrl: dbUrl,
  touchAfter: 5 * 3600, //5 days
  crypto: {
    secret: secret
  }
})
//log the error
sessionStore.on("error", (error) => {
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
    maxAge: 1000 * 3600 * 24 * 7 * 2, // two weeks for cookie to expire
    httpOnly: true,
    secure: isDevelopment===false ? false : true,
    sameSite: isDevelopment===false ? "lax" : "none",
  },

}


app.use(session(sessionConfig))
//initialize passport session
app.use(passport.initialize());
app.use(passport.session());
//login via email that is set username field to email
passport.use(new passportLocal.Strategy({
  usernameField: "email",
}, UserModel.authenticate()));
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());


if (!isDevelopment) {
  //set the headers for security
  app.use(helmet(
    {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [],
          connectSrc: ["'self'"],
          scriptSrc: ["'unsafe-inline'", "'self'", "'unsafe-eval'"], //unsafe inline for onClick scripts and so on
          styleSrc: ["'self'", "'unsafe-inline'"],
          workerSrc: ["'self'", "blob:"],
          childSrc: ["blob:"],
          objectSrc: [],
          manifestSrc: ["'self'"]
        }
      },
      crossOriginEmbedderPolicy: false,
    }
  ));
}
app.use((req, res, next) => {
  if (isDevelopment) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.header("Access-Control-Allow-Headers",
      "Origin, Content-Type");
  }
  next();
});



app.use("/api", Authrouter);
app.use("/api", WorkoutRouter);
app.use("/api", exerciseRouter);
app.use("/api", planRouter);

app.get("/sw.js", (req, res) => {
  res.sendFile(__dirname + "/frontDist/sw.js");
});

app.get("/", (req: express.Request, res) => {
  res.sendFile(__dirname + "/frontDist/index.html");
});

//just redirect no 404 page
app.get("*", (req, res) => {
  // res.status(404).send("Page not found")
  res.redirect("/");
})

const port = process.env.PORT ? process.env.PORT : 3000;
app.listen(port, () => {
  console.log("listening on port: ", port);
})