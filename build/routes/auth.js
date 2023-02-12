"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authrouter = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("../controllers/auth");
const middleware_1 = require("../middleware");
exports.Authrouter = express_1.default.Router({ mergeParams: true });
exports.Authrouter.post("/login", auth_1.validateLogin, passport_1.default.authenticate("local", {
    keepSessionInfo: true,
}), auth_1.login);
exports.Authrouter.get("/login", middleware_1.isLoggedIn, auth_1.getLoggedUser);
exports.Authrouter.post("/signup", auth_1.validateSignUp, auth_1.signup);
exports.Authrouter.post("/logout", auth_1.logout);
//# sourceMappingURL=auth.js.map