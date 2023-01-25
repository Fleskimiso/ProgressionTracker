import Express from "express";
import passport from "passport"
import { getLoggedUser, login, logout, signup } from "../controllers/auth";
import { isLoggedIn } from "../middleware";

export const Authrouter = Express.Router({mergeParams: true});

Authrouter.post("/login",passport.authenticate("local", {
  keepSessionInfo: true,
}),login);
Authrouter.get("/login",isLoggedIn,getLoggedUser);
Authrouter.post("/signup",signup);
Authrouter.post("/logout",logout);