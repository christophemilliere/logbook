import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const token = <string>req.headers.authorization.replace("Bearer ", "");
  let jwtPayload;

  //Try to validate the token and get data
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    // "error": {
    //   "name": "JsonWebTokenError",
    //     "message": "invalid signature"
    // }

    const errorMessage = {
      TokenExpiredError: {
        messsage: "Votre sesssion à expirée",
        status: 401
      },
      JsonWebTokenError: {
        messsage: "Votre token est invalide",
        status: 401
      }
    }
    res.status(401).send(errorMessage[error.name]);
    return;
  }

  //The token is valid for 1 day
  //We want to send a new token on every request
  const { password, email } = jwtPayload;
  const newToken = jwt.sign({ password, email }, config.jwtSecret, {
    expiresIn: "24h"
  });
  res.setHeader("token", newToken);
  next();
};
