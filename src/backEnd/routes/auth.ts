import Express from "express";
import passport from "passport"
import { login, logout, signup } from "../controllers/auth";

export const Authrouter = Express.Router({mergeParams: true});

Authrouter.post("/login",passport.authenticate("local", {
  keepSessionInfo: true,
}),login);
Authrouter.post("/signup",signup);
Authrouter.post("/logout",logout);