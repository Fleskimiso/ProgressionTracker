"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignUp = exports.validateLogin = exports.getLoggedUser = exports.logout = exports.login = exports.signup = void 0;
const PlanModel_1 = require("../models/PlanModel");
const UserModel_1 = require("../models/UserModel");
const auth_1 = require("../validators/auth");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email && req.body.nick && req.body.password) { //check if they exist
        // Todo check if it's properly formatted using JOI
        try {
            const users = yield UserModel_1.UserModel.find({ email: req.body.email });
            if (users.length === 0) {
                const newUser = new UserModel_1.UserModel({
                    email: req.body.email,
                    nick: req.body.nick,
                });
                //create a new user
                //create a new plan
                const userPlan = new PlanModel_1.PlanModel({
                    currentDay: 1,
                    workouts: []
                });
                //save the plan to the database
                yield userPlan.save();
                //associate the plan with the user
                newUser.plan = userPlan._id;
                // await newUser.save();
                //save the user after registration
                const registeredUser = yield UserModel_1.UserModel.register(newUser, req.body.password);
                yield registeredUser.save();
                req.login(registeredUser, (error) => {
                    if (!error) {
                        req.session.currentUser = newUser;
                        res.status(200).json({
                            _id: newUser._id.toString(),
                            email: newUser.email,
                            nick: newUser.nick
                        });
                    }
                    else {
                        res.status(500).json({ message: "Internal Server Error" });
                    }
                });
            }
            else {
                res.status(409).json({
                    message: "User with this email already exists."
                });
            }
        }
        catch (error) {
            //should be catched when for example when
            //the db connections breaks during finding/saving user
            if (error === null || error === void 0 ? void 0 : error.message) {
                res.status(500).json({ message: error === null || error === void 0 ? void 0 : error.message });
            }
            else {
                res.status(500).json({ message: "Internal Server Error" });
            }
        }
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.email && req.body.password) { //check if they exist 
        try {
            const user = yield UserModel_1.UserModel.findOne({ email: req.body.email });
            if (user) {
                req.login(user, (err) => {
                    if (!err) {
                        req.session.currentUser = user;
                        res.status(200).json({
                            _id: user._id.toString(),
                            email: user.email,
                            nick: user.nick,
                            wLength: user.workouts.length
                        });
                    }
                    else {
                        res.status(500).json({ message: "Internal Server Error" });
                    }
                });
            }
            else {
                res.status(404).json({ message: "User not found" });
            }
        }
        catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.logout({ keepSessionInfo: false }, (err) => {
        if (err) {
            //clear the cookie on the logout
            res.status(500).json({ message: "Internal Server Error" });
        }
        else {
            req.session.destroy((Serr) => {
                if (Serr) {
                    res.clearCookie("connect.sid");
                    res.status(500).json({ message: "Internal Server Error" });
                }
                else {
                    res.status(200).send();
                }
            });
        }
    });
});
exports.logout = logout;
const getLoggedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield UserModel_1.UserModel.findById((_a = req.session.currentUser) === null || _a === void 0 ? void 0 : _a._id);
    if (user) {
        req.session.currentUser = user;
        res.status(200).json({
            _id: user._id.toString(),
            email: user.email,
            nick: user.nick,
            wLength: user.workouts.length
        });
    }
    else {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getLoggedUser = getLoggedUser;
const validateLogin = (req, res, next) => {
    const { error } = auth_1.loginFormSchema.validate(req.body);
    if (!error) {
        return next();
    }
    res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
};
exports.validateLogin = validateLogin;
const validateSignUp = (req, res, next) => {
    const { error } = auth_1.signUpFormSchema.validate(req.body);
    if (!error) {
        return next();
    }
    res.status(400).json({ message: error === null || error === void 0 ? void 0 : error.message });
};
exports.validateSignUp = validateSignUp;
//# sourceMappingURL=auth.js.map