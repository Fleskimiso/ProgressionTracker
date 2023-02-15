"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const passport_1 = __importDefault(require("passport"));
const passportLocal = __importStar(require("passport-local"));
const auth_1 = require("./routes/auth");
const UserModel_1 = require("./models/UserModel");
const workouts_1 = require("./routes/workouts");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const exercise_1 = require("./routes/exercise");
const plan_1 = require("./routes/plan");
const path_1 = __importDefault(require("path"));
//import config values in deployment
const isDevelopment = process.env.NODE_ENV !== "production";
if (isDevelopment) {
    dotenv_1.default.config();
}
const app = (0, express_1.default)();
app.use('/static', express_1.default.static(path_1.default.join(__dirname, '/frontDist')));
//set secret
const secret = process.env.SECRET;
const dbUrl = isDevelopment ? "mongodb://127.0.0.1:27017/progressiontracker" : process.env.MONGODB_URI;
//connect to db
mongoose_1.default.connect(dbUrl, function (error) {
    if (error) {
        console.log(error);
        console.log("There has been an error");
    }
    else {
        console.log("succesfully connected to the database");
    }
});
//parse forms
app.use(express_1.default.urlencoded({ extended: true }));
//parse json data
app.use(express_1.default.json());
//parse cookie
app.use((0, cookie_parser_1.default)());
//configure session store
const sessionStore = connect_mongo_1.default.create({
    mongoUrl: dbUrl,
    touchAfter: 5 * 3600,
    crypto: {
        secret: secret
    }
});
//log the error
sessionStore.on("error", (error) => {
    console.log(error);
    console.log("Session store error");
});
//configure the session 
const sessionConfig = {
    secret: secret,
    saveUninitialized: true,
    store: sessionStore,
    resave: true,
    cookie: {
        maxAge: 1000 * 3600 * 24 * 7 * 2,
        httpOnly: true,
        secure: isDevelopment === false ? false : true,
        sameSite: isDevelopment === false ? "lax" : "none",
    },
};
app.use((0, express_session_1.default)(sessionConfig));
//initialize passport session
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
//login via email that is set username field to email
passport_1.default.use(new passportLocal.Strategy({
    usernameField: "email",
}, UserModel_1.UserModel.authenticate()));
passport_1.default.serializeUser(UserModel_1.UserModel.serializeUser());
passport_1.default.deserializeUser(UserModel_1.UserModel.deserializeUser());
if (!isDevelopment) {
    //set the headers for security
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: [],
                connectSrc: ["'self'"],
                scriptSrc: ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
                styleSrc: ["'self'", "'unsafe-inline'"],
                workerSrc: ["'self'", "blob:"],
                childSrc: ["blob:"],
                objectSrc: [],
                manifestSrc: ["'self'"]
            }
        },
        crossOriginEmbedderPolicy: false,
    }));
}
app.use((req, res, next) => {
    if (isDevelopment) {
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, Content-Type");
    }
    next();
});
app.use("/api", auth_1.Authrouter);
app.use("/api", workouts_1.WorkoutRouter);
app.use("/api", exercise_1.exerciseRouter);
app.use("/api", plan_1.planRouter);
app.get("/sw.js", (req, res) => {
    res.sendFile(__dirname + "/frontDist/sw.js");
});
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/frontDist/index.html");
});
//just redirect no 404 page
app.get("*", (req, res) => {
    // res.status(404).send("Page not found")
    res.redirect("/");
});
const port = process.env.PORT ? process.env.PORT : 3000;
app.listen(port, () => {
    console.log("listening on port: ", port);
});
//# sourceMappingURL=index.js.map