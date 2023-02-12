import Express from "express";
import passport from "passport"
import { getLoggedUser, login, logout, signup, validateLogin, validateSignUp } from "../controllers/auth";
import { isLoggedIn } from "../middleware";

export const Authrouter = Express.Router({mergeParams: true});

Authrouter.post("/login",validateLogin,passport.authenticate("local", {
  keepSessionInfo: true,
}),login);
Authrouter.get("/login",isLoggedIn,getLoggedUser);
Authrouter.post("/signup",validateSignUp,signup);
Authrouter.post("/logout",logout);