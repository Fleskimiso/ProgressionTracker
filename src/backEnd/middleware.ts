import { NextFunction, Response, Request } from "express";

export const isLoggedIn = async (req: any,res: Response ,next: NextFunction) =>{
    if(!req.isAuthenticated()){
      res.status(401).json({
        message: "You are not Logged in"
      }) //unauthorized code
    } else {
      next();
    }
  } 